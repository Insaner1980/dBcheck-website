import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateDailyNoiseExposure } from '../src/lib/daily-noise-exposure.mjs';
const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 0.05, `${actual} != ${expected}`);
test('normalizes representative periods to L_EX,8h', () => {
  close(calculateDailyNoiseExposure([{ level: 85, hours: 8 }]).lex8h, 85);
  close(calculateDailyNoiseExposure([{ level: 88, hours: 4 }]).lex8h, 85);
  close(calculateDailyNoiseExposure([{ level: 85, hours: 4 }, { level: 88, hours: 2 }]).lex8h, 85);
  close(calculateDailyNoiseExposure([{ level: 80, hours: 8 }]).lex8h, 80);
});
test('classifies by the displayed one-decimal result at action-value boundaries', () => {
  assert.equal(calculateDailyNoiseExposure([{ level: 88, hours: 4 }]).category, 'upper');
  assert.equal(calculateDailyNoiseExposure([{ level: 80, hours: 8 }]).category, 'lower');
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
