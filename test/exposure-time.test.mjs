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

test('formats exact day, hour, and minute branches in both locales', () => {
  for (const [hours, locale, expected] of [
    [24, 'en', '1 day'],
    [24, 'de', '1 Tag'],
    [2, 'en', '2 hours'],
    [2, 'de', '2 Stunden'],
    [2 / 60, 'en', '2 minutes'],
    [2 / 60, 'de', '2 Minuten'],
    [1 / 60, 'en', '1 minute'],
    [1 / 60, 'de', '1 Minute'],
  ]) {
    assert.equal(formatExposureTime(hours, locale), expected);
  }
});

test('rejects non-finite sound levels', () => {
  for (const level of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
    assert.throws(() => calculateExposureHours(level, 'niosh'), /invalid-level/);
  }
});

test('rejects unrenderable extremes and formats subsecond results honestly', () => {
  assert.throws(() => calculateExposureHours(-3000, 'niosh'), /unrepresentable-duration/);
  assert.throws(() => calculateExposureHours(3400, 'niosh'), /unrepresentable-duration/);
  assert.throws(() => formatExposureTime(Number.POSITIVE_INFINITY, 'en'), /invalid-duration/);
  assert.throws(() => formatExposureTime(Number.MAX_VALUE, 'en'), /unrepresentable-duration/);
  assert.throws(() => formatExposureTime(0, 'de'), /invalid-duration/);
  assert.equal(formatExposureTime(calculateExposureHours(200, 'niosh'), 'en'), '< 1 second');
  assert.equal(formatExposureTime(1 / 3600, 'en'), '1 second');
  assert.equal(formatExposureTime(1 / 3600, 'de'), '1 Sekunde');
});
