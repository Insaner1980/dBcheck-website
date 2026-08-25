import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const readPage = (...parts) => readFileSync(join(root, 'dist', ...parts), 'utf8');

const elementText = (html, tag, prefix) => {
  const blocks = [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, 'g'))];
  const block = blocks.find(([, content]) => content.includes(prefix));
  assert.ok(block, `${tag} starting with ${prefix}`);
  return block[1].replace(/<[^>]+>/g, '');
};

const currentNavHrefs = (html) => {
  const nav = html.match(/<nav class="nav"[^>]*>([\s\S]*?)<\/nav>/)?.[1] ?? '';
  return [...nav.matchAll(/<a\b([^>]*)>/g)]
    .filter(([, attributes]) => /\saria-current="page"/.test(attributes))
    .map(([, attributes]) => attributes.match(/\shref="([^"]+)"/)?.[1]);
};

test('homepage line breaks preserve spaces in rendered text', () => {
  const homepage = readPage('index.html');

  assert.equal(elementText(homepage, 'h1', 'Understand the sound'), 'Understand the sound around you.');
  assert.equal(elementText(homepage, 'h2', 'Four questions your ears'), 'Four questions your ears can’t answer. Your phone can.');
  assert.equal(elementText(homepage, 'h2', 'Hear what your ears'), 'Hear what your ears already know.');
  assert.equal(
    elementText(homepage, 'p', 'dBcheck for Android is in final tuning'),
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
