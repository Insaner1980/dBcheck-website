import { isOverDailyDurationLimit, MAX_PERIODS } from './daily-noise-exposure.mjs';
import { calculateExposureHours } from './exposure-time.ts';

export interface NoiseDosePeriod {
  level: number;
  hours: number;
}

export const calculateNoiseDose = (periods: NoiseDosePeriod[]) => {
  if (!Array.isArray(periods) || periods.length < 1 || periods.length > MAX_PERIODS) throw new RangeError('period-count');
  if (periods.some(({ level, hours }) => !Number.isFinite(level) || !Number.isFinite(hours) || hours <= 0)) throw new RangeError('invalid-period');
  if (isOverDailyDurationLimit(periods.reduce((total, { hours }) => total + hours, 0))) throw new RangeError('duration-over-24h');

  const dose = periods.reduce((total, { level, hours }) =>
    total + (hours / calculateExposureHours(level, 'niosh')) * 100, 0);
  if (!Number.isFinite(dose) || dose <= 0) throw new RangeError('unrepresentable-dose');
  return dose;
};
