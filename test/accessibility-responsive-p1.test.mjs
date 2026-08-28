import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import rehypeRawUrls from '../src/lib/rehype-raw-urls.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const base = readFileSync(join(root, 'src', 'layouts', 'Base.astro'), 'utf8');
const calculatorPage = readFileSync(join(root, 'src', 'components', 'CalculatorPage.astro'), 'utf8');
const homepage = readFileSync(join(root, 'src', 'pages', 'index.astro'), 'utf8');
const property = (name) => base.match(new RegExp(`${name}:\\s*(#[0-9A-Fa-f]{6})`))?.[1];
const luminance = (hex) => {
  const channels = hex.slice(1).match(/../g).map((part) => Number.parseInt(part, 16) / 255);
  const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};
const contrast = (foreground, background) => {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
};

test('meaningful muted text meets normal-text contrast on its dark surfaces', () => {
  const muted = property('--muted-text');
  assert.ok(muted, 'missing --muted-text');
  for (const surface of ['--bg', '--surface', '--surface-c', '--surface-ch']) {
    const background = property(surface);
    assert.ok(background, `missing ${surface}`);
    assert.ok(contrast(muted, background) >= 4.5, `${muted} on ${background}`);
  }
  assert.match(homepage, /\.instrument-note\s*\{[^}]*color:\s*var\(--muted-text\);\s*background:\s*var\(--bg\)/);
});

test('search input retains a visible focus treatment', () => {
  const inputRule = base.match(/#search-input\s*\{([^}]*)\}/)?.[1] ?? '';
  assert.doesNotMatch(inputRule, /outline:\s*none/);
  assert.match(base, /:where\(a, button, input, summary\):focus-visible\s*\{[^}]*outline:\s*2px solid var\(--on-surface\)/);
});

test('shared narrow layouts allow grid and flex children to shrink', () => {
  assert.match(base, /\.page-head,[\s\S]*\.editorial-head,[\s\S]*\.tool-card,[\s\S]*min-width:\s*0/);
  assert.match(calculatorPage, /:global\(\.tool-calculator > \*\), :global\(\.entry-row\)\s*\{\s*min-width:\s*0/);
});

test('raw URL annotation preserves labels, destinations and existing link attributes', () => {
  const href = 'https://example.com/long-path?first=1&second=2#section';
  const link = (value) => ({ type: 'element', tagName: 'a', properties: { href, className: ['source'] }, children: [{ type: 'text', value }] });
  const raw = link(href);
  const ordinary = link('Read the measurement guidance');
  const tree = { type: 'root', children: [raw, ordinary] };
  const before = structuredClone(tree);
  rehypeRawUrls()(tree);
  assert.equal(raw.properties['data-raw-url'], true);
  delete raw.properties['data-raw-url'];
  assert.deepEqual(tree, before, 'annotation must not rewrite content or mark a human-readable label');
});

test('built article links distinguish raw URLs from ordinary anchor text', () => {
  const dist = join(root, 'dist');
  let rawCount = 0;
  let ordinaryCount = 0;
  const text = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');
  const visit = (node, inProse = false) => {
    const attrs = Object.fromEntries((node.attrs ?? []).map(({ name, value }) => [name, value]));
    inProse ||= (attrs.class ?? '').split(/\s+/).includes('prose');
    if (inProse && node.nodeName === 'a') {
      const isRaw = /^https?:\/\//i.test(attrs.href ?? '') && text(node) === attrs.href;
      assert.equal(Object.hasOwn(attrs, 'data-raw-url'), isRaw, text(node));
      if (isRaw) rawCount += 1;
      else ordinaryCount += 1;
    }
    for (const child of node.childNodes ?? []) visit(child, inProse);
  };
  for (const path of readdirSync(dist, { recursive: true }).filter((path) => path.endsWith('.html'))) {
    visit(parse(readFileSync(join(dist, path), 'utf8')));
  }
  assert.ok(rawCount > 0 && ordinaryCount > 0, 'exercise both kinds of published link');
});
