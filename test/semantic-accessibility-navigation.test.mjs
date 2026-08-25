import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const readPage = (...parts) => readFileSync(join(root, 'dist', ...parts), 'utf8');
const readLayout = (...parts) => readFileSync(join(root, 'src', 'layouts', ...parts), 'utf8');

const elementTextAroundBreak = (html, tag, prefix) => {
  const blocks = [...html.matchAll(new RegExp(`<${tag}(?=[\\s/>])[^>]*>([\\s\\S]*?)</${tag}>`, 'g'))];
  const block = blocks.find(([, content]) => content.includes(prefix));
  assert.ok(block, `${tag} starting with ${prefix}`);
  const text = block[1].match(
    /^([^<]+)<br(?=[\s/>])[^>]*>(\s+)(?:<span(?=[\s/>])[^>]*>)?([^<]+)(?:<\/span>)?$/,
  );
  assert.ok(text, `${tag} starting with ${prefix} has the expected line-break structure`);
  return `${text[1]}${text[2]}${text[3]}`;
};

const currentNavHrefs = (html) => {
  const nav = html.match(/<nav class="nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1] ?? '';
  return [...nav.matchAll(/<a\b([^>]*)>/g)]
    .filter(([, attributes]) => /\saria-current="page"/.test(attributes))
    .map(([, attributes]) => attributes.match(/\shref="([^"]+)"/)?.[1]);
};

test('homepage line breaks preserve spaces in rendered text', () => {
  const homepage = readPage('index.html');

  assert.equal(elementTextAroundBreak(homepage, 'h1', 'Understand the sound'), 'Understand the sound around you.');
  assert.equal(elementTextAroundBreak(homepage, 'h2', 'Four questions your ears'), 'Four questions your ears can’t answer. Your phone can.');
  assert.equal(elementTextAroundBreak(homepage, 'h2', 'Hear what your ears'), 'Hear what your ears already know.');
  assert.equal(
    elementTextAroundBreak(homepage, 'p', 'dBcheck for Android is in final tuning'),
    'dBcheck for Android is in final tuning before release. The observatory opens soon on Google Play.',
  );
});

test('Sound Explorer detail headings follow their page context', () => {
  const detailHeadingLevels = (html) => [...html.matchAll(/<h([1-6])\b[^>]*data-sound-name/g)].map((match) => Number(match[1]));

  assert.deepEqual(detailHeadingLevels(readPage('index.html')), [3]);
  assert.deepEqual(detailHeadingLevels(readPage('sounds', 'index.html')), [2]);
  assert.deepEqual(detailHeadingLevels(readPage('de', 'alltagsgeraeusche', 'index.html')), [2]);
});

test('primary navigation marks only the represented current route', () => {
  const cases = [
    { page: ['index.html'], current: ['/'] },
    { page: ['tools', 'index.html'], current: ['/tools/'] },
    { page: ['tools', 'noise-dose-calculator', 'index.html'], current: ['/tools/'] },
    { page: ['articles', 'index.html'], current: ['/articles/'] },
    { page: ['articles', 'what-is-a-decibel', 'index.html'], current: ['/articles/'] },
    { page: ['de', 'werkzeuge', 'index.html'], current: ['/de/werkzeuge/'] },
    { page: ['de', 'werkzeuge', 'dezibel-addieren', 'index.html'], current: ['/de/werkzeuge/'] },
    { page: ['de', 'artikel', 'index.html'], current: ['/de/artikel/'] },
    { page: ['de', 'artikel', 'was-ist-ein-dezibel', 'index.html'], current: ['/de/artikel/'] },
    { page: ['sounds', 'index.html'], current: [] },
    { page: ['de', 'alltagsgeraeusche', 'index.html'], current: [] },
    { page: ['404.html'], current: [] },
  ];

  for (const { page, current } of cases) {
    assert.deepEqual(currentNavHrefs(readPage(...page)), current, page.join('/'));
  }
});

test('forced colors keeps the current primary navigation link visually distinct', () => {
  const baseLayout = readLayout('Base.astro').replaceAll('\r\n', '\n');
  const currentNavRule = [
    '    @media (forced-colors: active) {',
    "      .nav a[aria-current='page'] {",
    '        text-decoration-line: underline;',
    '        text-decoration-style: solid;',
    '        text-decoration-thickness: 2px;',
    '        text-underline-offset: 0.3em;',
    '        text-decoration-color: currentColor;',
    '      }',
    '    }',
  ].join('\n');

  assert.ok(baseLayout.includes(currentNavRule), 'current links in the primary navigation have a forced-colors underline');
  assert.equal(baseLayout.includes('forced-color-adjust: none'), false, 'system color substitution remains enabled');
});
