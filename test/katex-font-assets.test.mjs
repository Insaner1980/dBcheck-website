import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { isAbsolute, join, relative, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { assertFreshBuild } from '../scripts/build-freshness.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
await assertFreshBuild({ root });
const dist = join(root, 'dist');
const assetDirectory = join(dist, '_astro');
const headersPath = join(root, 'public', '_headers');
const size3SourcePath = join(root, 'node_modules', 'katex', 'dist', 'fonts', 'KaTeX_Size3-Regular.woff2');
const germanMathRoutes = [
  'db-und-dba-unterschied',
  'laermexpositionsgrenzen-deutschland-eu',
  'sind-3-db-doppelt-so-laut',
  'warum-ist-die-dezibelskala-logarithmisch',
  'warum-sind-85-db-wichtig',
  'was-ist-ein-dezibel',
  'was-ist-eine-laermdosis',
  'was-ist-schalldruckpegel',
  'wie-lange-85-db-hoeren',
];

test('fresh dist emits same-origin KaTeX fonts allowed by the checked-in CSP', () => {
  const cssFiles = readdirSync(assetDirectory)
    .filter((name) => name.endsWith('.css'))
    .map((name) => join(assetDirectory, name));
  const css = cssFiles.map((path) => readFileSync(path, 'utf8')).join('\n');
  const katexFontFaces = [...css.matchAll(/@font-face\{[^}]*font-family:KaTeX_[^}]+\}/g)].map((match) => match[0]);

  assert.ok(katexFontFaces.length > 0, 'generated CSS has no KaTeX font-face declarations');
  assert.equal(
    /data:(?:font\/|application\/font)[^),]*/i.test(css),
    false,
    'generated CSS contains an inlined font data URI',
  );
  for (const fontFace of katexFontFaces) {
    assert.doesNotMatch(fontFace, /url\(data:[^)]+\)/i, fontFace);
    assert.match(fontFace, /format\("woff2"\)/, fontFace);
    assert.match(fontFace, /format\("woff"\)/, fontFace);
    assert.match(fontFace, /format\("truetype"\)/, fontFace);
  }

  const referencedFonts = [];
  for (const cssPath of cssFiles) {
    const source = readFileSync(cssPath, 'utf8');
    const cssUrl = new URL(relative(dist, cssPath).replaceAll('\\', '/'), 'https://dbcheck.app/');
    for (const fontFace of source.matchAll(/@font-face\{[^}]*font-family:KaTeX_[^}]+\}/g)) {
      for (const match of fontFace[0].matchAll(/url\((?:"|')?([^"')]+)(?:"|')?\)/g)) {
        const url = new URL(match[1], cssUrl);
        assert.equal(url.origin, 'https://dbcheck.app', match[1]);
        assert.equal(url.protocol, 'https:', match[1]);
        const outputPath = resolve(dist, `.${decodeURIComponent(url.pathname)}`);
        const relativePath = relative(dist, outputPath);
        assert.ok(relativePath && !relativePath.startsWith('..') && !isAbsolute(relativePath), match[1]);
        assert.ok(existsSync(outputPath), match[1]);
        assert.ok(statSync(outputPath).size > 0, match[1]);
        referencedFonts.push({ url: url.pathname, outputPath });
      }
    }
  }

  assert.ok(referencedFonts.length > 0, 'generated CSS has no KaTeX font asset references');
  const size3Assets = referencedFonts.filter(({ url }) => /\/KaTeX_Size3-Regular\.[^/]+\.woff2$/i.test(url));
  assert.equal(size3Assets.length, 1, 'expected one emitted KaTeX_Size3 WOFF2 asset');
  assert.ok(readFileSync(size3Assets[0].outputPath).equals(readFileSync(size3SourcePath)));

  const headers = readFileSync(headersPath, 'utf8');
  const fontSource = headers.match(/font-src\s+([^;]+)/)?.[1];
  assert.equal(fontSource, "'self' https://fonts.gstatic.com");
  assert.doesNotMatch(fontSource, /(?:^|\s)data:/i);

  let katex = 0;
  let mathml = 0;
  let annotations = 0;
  for (const slug of germanMathRoutes) {
    const html = readFileSync(join(dist, 'de', 'artikel', slug, 'index.html'), 'utf8');
    katex += (html.match(/class="katex"/g) ?? []).length;
    mathml += (html.match(/<math(?:\s|>)/g) ?? []).length;
    annotations += (html.match(/encoding="application\/x-tex"/g) ?? []).length;
    assert.doesNotMatch(html, /\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/, slug);
  }
  assert.deepEqual({ katex, mathml, annotations }, { katex: 38, mathml: 38, annotations: 38 });
});
