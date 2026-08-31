import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateDailyNoiseExposure, MAX_PERIODS } from '../src/lib/daily-noise-exposure.mjs';
const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 0.05, `${actual} != ${expected}`);
test('normalizes representative periods to L_EX,8h', () => {
  close(calculateDailyNoiseExposure([{ level: 85, hours: 8 }]).lex8h, 85);
  close(calculateDailyNoiseExposure([{ level: 88, hours: 4 }]).lex8h, 85);
  close(calculateDailyNoiseExposure([{ level: 85, hours: 4 }, { level: 88, hours: 2 }]).lex8h, 85);
  close(calculateDailyNoiseExposure([{ level: 80, hours: 8 }]).lex8h, 80);
});
test('classifies by the displayed one-decimal result at action-value boundaries', () => {
  for (const [level, category] of [
    [79.94, 'below-lower'],
    [79.95, 'lower'],
    [79.96, 'lower'],
    [84.94, 'lower'],
    [84.95, 'upper'],
    [84.96, 'upper'],
  ]) {
    assert.equal(calculateDailyNoiseExposure([{ level, hours: 8 }]).category, category, `${level} dB(A)`);
  }
});
test('rejects invalid period counts before calculation', () => {
  for (const periods of [
    null,
    [],
    Array.from({ length: MAX_PERIODS + 1 }, () => ({ level: 85, hours: 1 })),
  ]) {
    assert.throws(() => calculateDailyNoiseExposure(periods), /period-count/);
  }
});
test('period order does not affect the result', () => {
  const a = calculateDailyNoiseExposure([{ level: 81, hours: 3 }, { level: 87, hours: 2 }]).lex8h;
  const b = calculateDailyNoiseExposure([{ level: 87, hours: 2 }, { level: 81, hours: 3 }]).lex8h;
  assert.equal(a, b);
});
test('rejects missing, zero, negative, and over-24-hour durations', () => {
  assert.throws(() => calculateDailyNoiseExposure([{ level: 85, hours: 0 }]), /invalid-period/);
  assert.throws(() => calculateDailyNoiseExposure([{ level: 85, hours: -1 }]), /invalid-period/);
  assert.throws(() => calculateDailyNoiseExposure([{ level: Number.NaN, hours: 1 }]), /invalid-period/);
  assert.throws(() => calculateDailyNoiseExposure([{ level: 85, hours: 13 }, { level: 80, hours: 12 }]), /duration-over-24h/);
});

test('enforces the same 0 to 200 dB(A) range as the form', () => {
  assert.doesNotThrow(() => calculateDailyNoiseExposure([{ level: 0, hours: 8 }]));
  assert.doesNotThrow(() => calculateDailyNoiseExposure([{ level: 200, hours: 8 }]));
  assert.throws(() => calculateDailyNoiseExposure([{ level: -0.1, hours: 8 }]), /invalid-period/);
  assert.throws(() => calculateDailyNoiseExposure([{ level: 200.1, hours: 8 }]), /invalid-period/);
});

test('rejects positive durations too small to produce a finite result', () => {
  assert.throws(() => calculateDailyNoiseExposure([{ level: 0, hours: Number.MIN_VALUE }]), /unrepresentable-exposure/);
});

test('accepts an exact 1440-minute total despite conversion rounding', () => {
  const minutes = [353.73, 1071.48, 14.79];
  const periods = minutes.map((duration) => ({ level: 85, hours: duration / 60 }));
  assert.ok(periods.reduce((sum, period) => sum + period.hours, 0) > 24);
  assert.doesNotThrow(() => calculateDailyNoiseExposure(periods));
  assert.throws(
    () => calculateDailyNoiseExposure([...periods.slice(0, -1), { level: 85, hours: 14.8 / 60 }]),
    /duration-over-24h/,
  );
});
