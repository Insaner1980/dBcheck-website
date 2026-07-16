import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateExposureHours, formatExposureTime } from '../src/lib/exposure-time.ts';

test('calculates German exposure duration from the L_EX,8h energy equation', () => {
  for (const level of [80, 85, 88, 91, 94, 100, 115]) {
    const hours = calculateExposureHours(level, 'eu-upper-action');
    const normalizedLevel = level + 10 * Math.log10(hours / 8);
    assert.ok(Math.abs(normalizedLevel - 85) < 1e-10, `${level} dB(A)`);
  }
  assert.equal(calculateExposureHours(85, 'eu-upper-action'), 8);
  assert.ok(Math.abs(calculateExposureHours(94, 'eu-upper-action') - 1.00714) < 0.00001);
});

test('keeps the English NIOSH model and localizes displayed durations', () => {
  assert.equal(calculateExposureHours(94, 'niosh'), 1);
  assert.equal(formatExposureTime(1, 'en'), '1 hour');
  assert.equal(formatExposureTime(calculateExposureHours(94, 'eu-upper-action'), 'de'), '1 Stunde');
  assert.equal(formatExposureTime(calculateExposureHours(88, 'eu-upper-action'), 'de'), '4 Stunden');
});
