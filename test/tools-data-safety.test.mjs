import assert from 'node:assert/strict';
import test from 'node:test';
import { getTools, validateToolHref } from '../src/data/tools.ts';

test('tool hrefs are root-relative same-origin paths', () => {
  assert.equal(validateToolHref('/tools/add-decibels/?source=index#calculator'), '/tools/add-decibels/?source=index#calculator');
  assert.equal(validateToolHref('/de/werkzeuge/'), '/de/werkzeuge/');
  for (const locale of ['en', 'de']) {
    for (const tool of getTools(locale)) assert.equal(validateToolHref(tool.href), tool.href);
  }
});

test('tool href validation rejects executable and cross-origin destinations', () => {
  for (const href of [
    'javascript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    '//example.com/tools/',
    '/\\example.com/tools/',
    'https://dbcheck.app/tools/',
    ' /tools/',
  ]) {
    assert.throws(() => validateToolHref(href), /Invalid internal tool href/, href);
  }
});
