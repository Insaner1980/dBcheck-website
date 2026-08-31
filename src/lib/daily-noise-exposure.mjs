// @ts-check

export const MAX_PERIODS = 12;
const MAX_DAILY_HOURS = 24;
const DAILY_DURATION_ROUNDING_TOLERANCE_HOURS = Number.EPSILON * MAX_DAILY_HOURS * MAX_PERIODS;

/** @param {number} totalHours */
export const isOverDailyDurationLimit = (totalHours) =>
  totalHours - MAX_DAILY_HOURS > DAILY_DURATION_ROUNDING_TOLERANCE_HOURS;

/**
 * @typedef {{ level: number, hours: number }} DailyNoisePeriod
 */

/**
 * @typedef {'below-lower' | 'lower' | 'upper'} DailyNoiseExposureCategory
 */

/**
 * @param {DailyNoisePeriod[]} periods
 * @returns {{ lex8h: number, totalHours: number, category: DailyNoiseExposureCategory }}
 */
export function calculateDailyNoiseExposure(periods) {
  if (!Array.isArray(periods) || periods.length < 1 || periods.length > MAX_PERIODS) throw new RangeError('period-count');
  if (periods.some(({ level, hours }) =>
    !Number.isFinite(level) || level < 0 || level > 200 || !Number.isFinite(hours) || hours <= 0
  )) throw new RangeError('invalid-period');
  const totalHours = periods.reduce((sum, period) => sum + period.hours, 0);
  if (isOverDailyDurationLimit(totalHours)) throw new RangeError('duration-over-24h');
  const exposure = periods.reduce((sum, period) => sum + (period.hours / 8) * 10 ** (period.level / 10), 0);
  const lex8h = 10 * Math.log10(exposure);
  if (!Number.isFinite(lex8h)) throw new RangeError('unrepresentable-exposure');
  const displayedLex8h = Math.round(lex8h * 10) / 10;
  return { lex8h, totalHours, category: displayedLex8h < 80 ? 'below-lower' : displayedLex8h < 85 ? 'lower' : 'upper' };
}
