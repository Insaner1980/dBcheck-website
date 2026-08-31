import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { assertFreshBuild } from '../scripts/build-freshness.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
await assertFreshBuild({ root });
const fontUrl = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Instrument+Sans:wght@400..700&display=swap';

test('source markup and fresh dist retain the Google Fonts media/onload pattern and local fallbacks', () => {
  const source = readFileSync(join(root, 'src', 'layouts', 'Base.astro'), 'utf8');
  const html = readFileSync(join(root, 'dist', 'index.html'), 'utf8');

  assert.ok(source.includes(`<link href="${fontUrl}" rel="stylesheet" media="print" onload="this.setAttribute('media', 'all')" />`));
  assert.doesNotMatch(source, /<noscript>[\s\S]*fonts\.googleapis\.com/);
  assert.match(source, /--font-body: 'Instrument Sans', system-ui, sans-serif/);
  assert.match(source, /--font-data: 'IBM Plex Mono', ui-monospace, 'SFMono-Regular', Consolas, monospace/);
  assert.ok(html.includes(`<link href="${fontUrl}" rel="stylesheet" media="print" onload="this.setAttribute('media', 'all')">`));
  assert.doesNotMatch(html, /<noscript>[\s\S]*fonts\.googleapis\.com/);
});
