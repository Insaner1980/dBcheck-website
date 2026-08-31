import { rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  hashBuildInputs,
  hashBuildOutput,
  removeFreshnessMarker,
  writeFreshnessMarker,
} from './build-freshness.mjs';

const scriptPath = fileURLToPath(import.meta.url);
const projectRoot = resolve(dirname(scriptPath), '..');
const astroCli = resolve(projectRoot, 'node_modules', 'astro', 'bin', 'astro.mjs');

const runAstro = (command, cwd, flags = []) => new Promise((resolveStep, rejectStep) => {
  const child = spawn(process.execPath, ['--experimental-strip-types', astroCli, command, ...flags], { cwd, stdio: 'inherit' });
  child.once('error', rejectStep);
  child.once('exit', (code, signal) => {
    if (code === 0) resolveStep();
    else rejectStep(new Error(`astro ${command} failed${signal ? ` with signal ${signal}` : ` with exit code ${code}`}`));
  });
});

export const runBuild = async ({ root = projectRoot, runStep = runAstro } = {}) => {
  const outputDirectory = resolve(root, 'dist');
  const cleanBuildArtifacts = async () => {
    await removeFreshnessMarker(root);
    await rm(outputDirectory, { recursive: true, force: true });
  };
  try {
    await cleanBuildArtifacts();
    const inputHashBefore = await hashBuildInputs(root);
    await runStep('sync', root, ['--force']);
    await runStep('check', root);
    await runStep('build', root);
    const inputHashAfter = await hashBuildInputs(root);
    if (inputHashAfter !== inputHashBefore) {
      throw new Error('Build inputs changed while Astro was building. Run "npm run build" again.');
    }
    const outputHash = await hashBuildOutput(root);
    await writeFreshnessMarker({ root, inputHash: inputHashAfter, outputHash });
  } catch (error) {
    await cleanBuildArtifacts().catch(() => {});
    throw error;
  }
};

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  runBuild().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
