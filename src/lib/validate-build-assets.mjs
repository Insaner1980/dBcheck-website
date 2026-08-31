import { existsSync } from 'node:fs';
import { dirname, normalize, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../..', import.meta.url));
const defaultSourceDir = resolve(projectRoot, 'src');
const defaultPublicDir = resolve(projectRoot, 'public');
const rootRelativeAssetPattern = /(['"])(\/(?!\/)[^'"\s<>]+)\1/g;
const mediaSourcePattern = /\.(?:avif|gif|jpe?g|png|svg|webp|mp4|webm|woff2?|ttf|otf)$/i;

const isWithin = (parent, candidate) => candidate === parent || candidate.startsWith(`${parent}${sep}`);
const assetPathname = (url) => {
  const pathWithoutQueryOrHash = url.split(/[?#]/, 1)[0];
  try {
    return decodeURIComponent(pathWithoutQueryOrHash);
  } catch {
    return pathWithoutQueryOrHash;
  }
};

const sourceLabel = (sourcePath, code, offset) => {
  const line = code.slice(0, offset).split('\n').length;
  return `${relative(projectRoot, sourcePath).replaceAll('\\', '/')}:${line}`;
};

const isLocalMarkdownImage = (node) =>
  node.type === 'image'
  && 'url' in node
  && typeof node.url === 'string'
  && !node.url.startsWith('//')
  && !/^[a-z][a-z0-9+.-]*:/i.test(node.url);

const resolveMarkdownAssetPath = (node, file, pathname) => {
  if (node.url.startsWith('/')) {
    const assetPath = resolve(defaultPublicDir, `.${pathname}`);
    if (!isWithin(defaultPublicDir, assetPath)) {
      file.fail(`Public Markdown image escapes the public directory: ${node.url}`, node);
      return undefined;
    }
    return assetPath;
  }
  if (!file.path) {
    file.fail(`Cannot validate local Markdown image without a source file path: ${node.url}`, node);
    return undefined;
  }
  return resolve(dirname(file.path), pathname);
};

const validateMarkdownImage = (node, file) => {
  if (!isLocalMarkdownImage(node)) return;
  const pathname = assetPathname(node.url);
  const assetPath = resolveMarkdownAssetPath(node, file, pathname);
  if (!assetPath || existsSync(assetPath)) return;

  const line = 'position' in node && node.position?.start.line;
  const sourcePath = file.path || '<unknown source>';
  const sourceLocation = line ? `${sourcePath}:${line}` : sourcePath;
  const location = node.url.startsWith('/') ? 'public Markdown image' : 'local Markdown image';
  file.fail(`Missing ${location} at ${sourceLocation}: ${node.url}`, node);
};

/** @type {import('@astrojs/markdown-remark').RemarkPlugin} */
export const remarkValidateLocalImages = () => (tree, file) => {
  /** @type {import('@astrojs/markdown-remark').Node[]} */
  const nodes = [tree];
  while (nodes.length > 0) {
    const node = nodes.pop();
    if (!node) continue;
    validateMarkdownImage(node, file);
    if ('children' in node && Array.isArray(node.children)) nodes.push(...node.children);
  }
};

/**
 * Reject literal root-relative public media paths while Vite transforms the
 * source modules that participate in a build.
 *
 * @param {{ sourceDir?: string, publicDir?: string }} [options]
 */
export const validatePublicAssets = ({ sourceDir = defaultSourceDir, publicDir = defaultPublicDir } = {}) => {
  const normalizedSourceDir = normalize(sourceDir);
  const normalizedPublicDir = normalize(publicDir);

  return {
    name: 'dbcheck:validate-public-assets',
    enforce: 'pre',
    transform(code, id) {
      const sourcePath = normalize(id.split('?', 1)[0]);
      if (isWithin(normalizedSourceDir, sourcePath) && !mediaSourcePattern.test(sourcePath)) {
        for (const match of code.matchAll(rootRelativeAssetPattern)) {
          const assetUrl = match[2];
          const pathname = assetPathname(assetUrl);
          if (!mediaSourcePattern.test(pathname)) continue;
          const assetPath = resolve(normalizedPublicDir, `.${pathname}`);
          if (!isWithin(normalizedPublicDir, assetPath) || !existsSync(assetPath)) {
            this.error(`[missing-public-asset] ${sourceLabel(sourcePath, code, match.index)} references missing public asset "${assetUrl}"`);
          }
        }
      }
      return null;
    },
  };
};
