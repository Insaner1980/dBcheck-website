import assert from 'node:assert/strict';
import test from 'node:test';

globalThis.document = {
  documentElement: { classList: { add: () => {} } },
  querySelectorAll: () => [],
};
const { formatDecimal, formatPercentage, formatSigned } = await import('../src/scripts/tool-calculators.ts');

test('omits redundant percentage decimals in every locale', () => {
  assert.equal(formatPercentage(100, 1, 'en'), '100%');
  assert.equal(formatPercentage(100, 1, 'de'), '100%');
  assert.equal(formatPercentage(12.5, 1, 'en'), '12.5%');
  assert.equal(formatPercentage(12.5, 1, 'de'), '12,5%');
});

test('suppresses signs for values that display as zero', () => {
  for (const value of [-0.0008685, -0, 0, 0.0008685]) {
    assert.equal(formatSigned(value, 'en'), '0.0');
    assert.equal(formatSigned(value, 'de'), '0,0');
  }
  assert.equal(formatDecimal(-0.0008685, 1, 'en'), '0.0');
  assert.equal(formatDecimal(-0.0008685, 1, 'de'), '0,0');
});

test('preserves signs once the displayed magnitude rounds away from zero', () => {
  assert.equal(formatSigned(-0.05, 'en'), '−0.1');
  assert.equal(formatSigned(0.05, 'en'), '+0.1');
  assert.equal(formatSigned(-0.05, 'de'), '−0,1');
  assert.equal(formatSigned(0.05, 'de'), '+0,1');
});
