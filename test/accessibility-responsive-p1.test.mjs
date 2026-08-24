import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const base = readFileSync(join(root, 'src', 'layouts', 'Base.astro'), 'utf8');
const calculatorPage = readFileSync(join(root, 'src', 'components', 'CalculatorPage.astro'), 'utf8');
const editorialPage = readFileSync(join(root, 'src', 'components', 'EditorialPage.astro'), 'utf8');
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

test('shared narrow layouts allow intrinsic content to shrink and wrap', () => {
  assert.match(base, /\.page-head,[\s\S]*\.editorial-head,[\s\S]*\.tool-card,[\s\S]*min-width:\s*0/);
  assert.match(base, /:is\(\.page-head, \.editorial-head, \.tool-card\)[^{]*\{\s*overflow-wrap:\s*break-word/);
  assert.match(calculatorPage, /:global\(\.tool-calculator > \*\), :global\(\.entry-row\)\s*\{\s*min-width:\s*0/);
  assert.match(editorialPage, /\.prose :global\(h[23]\)[^{]*\{[^}]*overflow-wrap:\s*break-word/);
});
