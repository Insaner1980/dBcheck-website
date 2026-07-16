export const MAX_PERIODS = 12;

export function calculateDailyNoiseExposure(periods) {
  if (!Array.isArray(periods) || periods.length < 1 || periods.length > MAX_PERIODS) throw new RangeError('period-count');
  if (periods.some(({ level, hours }) => !Number.isFinite(level) || !Number.isFinite(hours) || hours <= 0)) throw new RangeError('invalid-period');
  const totalHours = periods.reduce((sum, period) => sum + period.hours, 0);
  if (totalHours > 24) throw new RangeError('duration-over-24h');
  const exposure = periods.reduce((sum, period) => sum + (period.hours / 8) * 10 ** (period.level / 10), 0);
  const lex8h = 10 * Math.log10(exposure);
  const displayedLex8h = Math.round(lex8h * 10) / 10;
  return { lex8h, totalHours, category: displayedLex8h < 80 ? 'below-lower' : displayedLex8h < 85 ? 'lower' : 'upper' };
}
