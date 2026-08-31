import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { sep } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import config from '../astro.config.mjs';
import { remarkValidateLocalImages, validatePublicAssets } from '../src/lib/validate-build-assets.mjs';

const sourceDir = fileURLToPath(new URL('../src', import.meta.url));
const publicDir = fileURLToPath(new URL('../public', import.meta.url));
const sourceFile = fileURLToPath(new URL('../src/components/AssetProbe.astro', import.meta.url));
const sourceImage = fileURLToPath(new URL('../src/assets/features/measurement-analysis.webp', import.meta.url));

const runPublicAssetValidation = (code, sourcePath = sourceFile, options = {}) => {
  const plugin = validatePublicAssets({ sourceDir, publicDir, ...options });
  return plugin.transform.call({ error(message) { throw new Error(message); } }, code, sourcePath);
};

test('missing local Markdown image reports its source file, line, and target', async () => {
  const renderer = await config.markdown.processor.createRenderer({});
  const fileURL = new URL('./fixtures/missing-local-image.md', import.meta.url);

  await assert.rejects(
    renderer.render('![Missing image](./missing-image.webp)', { fileURL }),
    (error) => {
      assert.match(error.message, /missing-local-image\.md:1: \.\/missing-image\.webp/);
      assert.match(error.message, /Missing local Markdown image at/);
      return true;
    },
  );
});

test('missing root-relative Markdown image reports its source file, line, and target', async () => {
  const renderer = await config.markdown.processor.createRenderer({});
  const fileURL = new URL('./fixtures/missing-public-image.md', import.meta.url);

  await assert.rejects(
    renderer.render('![Missing image](/missing-image.webp)', { fileURL }),
    (error) => {
      assert.match(error.message, /missing-public-image\.md:1: \/missing-image\.webp/);
      assert.match(error.message, /Missing public Markdown image at/);
      return true;
    },
  );
});

test('existing relative Markdown image keeps its parent-directory path', async () => {
  const renderer = await config.markdown.processor.createRenderer({});
  const fileURL = new URL('../src/content/articles/en/why-is-the-decibel-scale-logarithmic.md', import.meta.url);
  const source = await readFile(fileURL, 'utf8');

  await assert.doesNotReject(
    renderer.render(source, { fileURL }),
  );
});

test('missing root-relative public media reports its source file, line, and target', () => {
  assert.throws(
    () => runPublicAssetValidation('<img src="/__missing_asset_probe.svg" alt="">'),
    /src\/components\/AssetProbe\.astro:1 references missing public asset "\/__missing_asset_probe\.svg"/,
  );
});

test('existing root-relative public media and a cache query remain valid', () => {
  assert.doesNotThrow(() => runPublicAssetValidation('<img src="/dbcheck-logo.svg?v=2" alt="">'));
});

test('public asset containment accepts an equivalent non-normalized public directory', () => {
  assert.doesNotThrow(() => runPublicAssetValidation(
    '<img src="/dbcheck-logo.svg" alt="">',
    sourceFile,
    { publicDir: `${publicDir}${sep}.` },
  ));
});

test('relative Markdown image validation requires a source file path', () => {
  const validate = remarkValidateLocalImages();

  assert.throws(
    () => validate(
      { type: 'root', children: [{ type: 'image', url: './image.webp' }] },
      { fail(message) { throw new Error(message); } },
    ),
    /Cannot validate local Markdown image without a source file path: \.\/image\.webp/,
  );
});

test('root-relative Markdown image validation rejects paths outside public', () => {
  const validate = remarkValidateLocalImages();

  assert.throws(
    () => validate(
      { type: 'root', children: [{ type: 'image', url: '/../package.json' }] },
      { path: sourceFile, fail(message) { throw new Error(message); } },
    ),
    /Public Markdown image escapes the public directory: \/\.\.\/package\.json/,
  );
});

test('Vite-transformed source images are not treated as public asset references', () => {
  const posixSourceImage = sourceImage.replaceAll('\\', '/');
  const sourceImageUrl = `/@fs${posixSourceImage.startsWith('/') ? '' : '/'}${posixSourceImage}?origWidth=1448&origHeight=1086&origFormat=webp`;

  assert.doesNotThrow(() => runPublicAssetValidation(`export default "${sourceImageUrl}";`, sourceImage));
});
