import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateNoiseDose } from '../src/lib/noise-dose.ts';

const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-10, `${actual} != ${expected}`);

test('calculates representative NIOSH daily doses', () => {
  close(calculateNoiseDose([{ level: 85, hours: 8 }]), 100);
  close(calculateNoiseDose([{ level: 88, hours: 4 }]), 100);
  close(calculateNoiseDose([{ level: 85, hours: 4 }, { level: 88, hours: 2 }]), 100);
  close(calculateNoiseDose([{ level: 85, hours: 0.5 }]), calculateNoiseDose([{ level: 85, hours: 30 / 60 }]));
});

test('rejects invalid period counts, values and total duration', () => {
  assert.throws(() => calculateNoiseDose([]), /period-count/);
  assert.throws(() => calculateNoiseDose([{ level: 85, hours: 0 }]), /invalid-period/);
  assert.throws(() => calculateNoiseDose([{ level: Number.NaN, hours: 1 }]), /invalid-period/);
  assert.throws(() => calculateNoiseDose([{ level: 85, hours: 12 }, { level: 85, hours: 12.01 }]), /duration-over-24h/);
  assert.throws(() => calculateNoiseDose([{ level: 85, hours: Number.MIN_VALUE }]), /unrepresentable-dose/);
});
