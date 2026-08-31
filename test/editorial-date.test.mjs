import assert from 'node:assert/strict';
import test from 'node:test';
import { isEditorialDate, parseEditorialDate } from '../src/lib/editorial-date.mjs';

test('parses exact calendar dates at UTC midnight', () => {
  assert.equal(parseEditorialDate('2026-02-28').toISOString(), '2026-02-28T00:00:00.000Z');
  assert.equal(parseEditorialDate('2024-02-29').toISOString(), '2024-02-29T00:00:00.000Z');
});

test('rejects ambiguous, normalized, timestamp, and implicit date values', () => {
  for (const value of [
    '2026-02-30',
    '2025-02-29',
    '01/02/2026',
    '02.01.2026',
    '2026-02-28T09:00:00',
    new Date('2026-02-28T00:00:00.000Z'),
  ]) {
    assert.equal(isEditorialDate(value), false, String(value));
    assert.throws(() => parseEditorialDate(value), /editorial-date/);
  }
});
