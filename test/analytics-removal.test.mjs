import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = (...segments) => readFileSync(join(root, ...segments), 'utf8');

test('production source contains no Google Analytics loader or measurement ID', () => {
  const source = [
    read('src', 'layouts', 'Base.astro'),
    read('public', '_headers'),
  ].join('\n');

  assert.doesNotMatch(source, /G-9J90097M6J/);
  assert.doesNotMatch(source, /googletagmanager\.com|google-analytics\.com/);
  assert.doesNotMatch(source, /\bgtag\s*\(/);
});

test('the abandoned analytics consent interface is not rendered', () => {
  const base = read('src', 'layouts', 'Base.astro');

  assert.doesNotMatch(base, /PrivacyChoices|privacy-choices-open|getConsentCopy/);
});
