import { createHash, randomUUID } from 'node:crypto';
import { lstat, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptPath = fileURLToPath(import.meta.url);
const projectRoot = resolve(dirname(scriptPath), '..');
const markerRelativePath = join('.astro', 'build-freshness.json');
const markerVersion = 1;
const buildInputPaths = [
  '.npmrc',
  'astro.config.mjs',
  'package-lock.json',
  'package.json',
  'public',
  'scripts/build-freshness.mjs',
  'scripts/build.mjs',
  'src',
  'tsconfig.json',
];

const normalizedPath = (path) => path.split(sep).join('/');
const compareEntries = (left, right) => {
  if (left.path < right.path) return -1;
  if (left.path > right.path) return 1;
  if (left.kind < right.kind) return -1;
  if (left.kind > right.kind) return 1;
  return 0;
};

const pathKind = async (path) => {
  try {
    const stats = await lstat(path);
    if (stats.isDirectory()) return 'directory';
    if (stats.isFile()) return 'file';
    throw new Error(`Unsupported build path type: ${path}`);
  } catch (error) {
    if (error?.code === 'ENOENT') return 'missing';
    throw error;
  }
};

const collectDirectoryEntries = async (root, directory, entries) => {
  const names = await readdir(directory, { withFileTypes: true });
  for (const entry of names) {
    const absolutePath = join(directory, entry.name);
    const path = normalizedPath(relative(root, absolutePath));
    if (entry.isDirectory()) {
      entries.push({ kind: 'directory', path });
      await collectDirectoryEntries(root, absolutePath, entries);
    } else if (entry.isFile()) {
      entries.push({ kind: 'file', path, absolutePath });
    } else {
      throw new Error(`Unsupported build path type: ${absolutePath}`);
    }
  }
};

const collectEntries = async (root, paths) => {
  const entries = [];
  for (const inputPath of paths) {
    const absolutePath = resolve(root, inputPath);
    const path = normalizedPath(relative(root, absolutePath));
    const kind = await pathKind(absolutePath);
    entries.push({ kind, path, ...(kind === 'file' ? { absolutePath } : {}) });
    if (kind === 'directory') await collectDirectoryEntries(root, absolutePath, entries);
  }
  return entries.sort(compareEntries);
};

const updateText = (hash, value) => {
  const bytes = Buffer.from(value);
  hash.update(`${bytes.length}:`);
  hash.update(bytes);
};

const hashEntries = async (entries, metadata) => {
  const hash = createHash('sha256');
  updateText(hash, `dbcheck-build-freshness-v${markerVersion}`);
  for (const [key, value] of metadata) {
    updateText(hash, key);
    updateText(hash, String(value));
  }
  for (const entry of entries) {
    updateText(hash, entry.kind);
    updateText(hash, entry.path);
    if (entry.kind === 'file') {
      const bytes = await readFile(entry.absolutePath);
      hash.update(`${bytes.length}:`);
      hash.update(bytes);
    }
  }
  return hash.digest('hex');
};

export const freshnessMarkerPath = (root = projectRoot) => resolve(root, markerRelativePath);

export const hashBuildInputs = async (root = projectRoot) => {
  const entries = await collectEntries(root, buildInputPaths);
  return hashEntries(entries, [
    ['node', process.version],
    ['year', new Date().getFullYear()],
  ]);
};

export const hashBuildOutput = async (root = projectRoot) => {
  const outputDirectory = resolve(root, 'dist');
  if (await pathKind(outputDirectory) !== 'directory') {
    throw new Error('dist is missing. Run "npm run build" before reading generated output.');
  }
  const entries = [{ kind: 'directory', path: 'dist' }];
  await collectDirectoryEntries(root, outputDirectory, entries);
  entries.sort(compareEntries);
  return hashEntries(entries, []);
};

export const removeFreshnessMarker = async (root = projectRoot) => {
  await rm(freshnessMarkerPath(root), { force: true });
};

export const writeFreshnessMarker = async ({ root = projectRoot, inputHash, outputHash }) => {
  const markerPath = freshnessMarkerPath(root);
  const temporaryPath = `${markerPath}.${process.pid}.${randomUUID()}.tmp`;
  await mkdir(dirname(markerPath), { recursive: true });
  const marker = {
    version: markerVersion,
    nodeVersion: process.version,
    year: new Date().getFullYear(),
    inputHash,
    outputHash,
  };
  try {
    await writeFile(temporaryPath, `${JSON.stringify(marker, null, 2)}\n`, { flag: 'wx' });
    await rename(temporaryPath, markerPath);
  } catch (error) {
    await rm(temporaryPath, { force: true });
    throw error;
  }
};

export const assertFreshBuild = async ({ root = projectRoot } = {}) => {
  const markerPath = freshnessMarkerPath(root);
  let marker;
  try {
    marker = JSON.parse(await readFile(markerPath, 'utf8'));
  } catch (error) {
    if (error?.code === 'ENOENT') {
      throw new Error('Build freshness marker is missing. Run "npm run build" before reading dist.');
    }
    throw new Error(`Build freshness marker is invalid. Run "npm run build" before reading dist. (${error.message})`);
  }

  if (
    marker?.version !== markerVersion
    || typeof marker.inputHash !== 'string'
    || typeof marker.outputHash !== 'string'
  ) {
    throw new Error('Build freshness marker is invalid. Run "npm run build" before reading dist.');
  }

  const inputHash = await hashBuildInputs(root);
  if (inputHash !== marker.inputHash) {
    throw new Error('Build inputs changed after dist was generated. Run "npm run build" before reading dist.');
  }

  const outputHash = await hashBuildOutput(root);
  if (outputHash !== marker.outputHash) {
    throw new Error('dist changed after its freshness marker was written. Run "npm run build" before reading dist.');
  }
};
