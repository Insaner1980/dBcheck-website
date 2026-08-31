export type ExposureTimeModel = 'niosh' | 'eu-upper-action';

type ExposureTimeUnit = 'day' | 'hour' | 'minute' | 'second';

const unitLabels: Record<'en' | 'de', Record<ExposureTimeUnit, readonly [string, string]>> = {
  en: {
    day: ['day', 'days'],
    hour: ['hour', 'hours'],
    minute: ['minute', 'minutes'],
    second: ['second', 'seconds'],
  },
  de: {
    day: ['Tag', 'Tage'],
    hour: ['Stunde', 'Stunden'],
    minute: ['Minute', 'Minuten'],
    second: ['Sekunde', 'Sekunden'],
  },
};

const localeFormats = {
  en: { numberLocale: 'en-GB', subsecond: '< 1 second' },
  de: { numberLocale: 'de-DE', subsecond: '< 1 Sekunde' },
} as const;

const unitLabel = (locale: 'en' | 'de', unit: ExposureTimeUnit, singular: boolean) =>
  unitLabels[locale][unit][singular ? 0 : 1];

export const calculateExposureHours = (levelDb: number, model: ExposureTimeModel) => {
  if (!Number.isFinite(levelDb)) throw new RangeError('invalid-level');
  const hours = model === 'niosh'
    ? 8 * Math.pow(2, (85 - levelDb) / 3)
    : 8 * Math.pow(10, (85 - levelDb) / 10);
  if (!Number.isFinite(hours) || hours <= 0) throw new RangeError('unrepresentable-duration');
  return hours;
};

export const formatExposureTime = (hours: number, locale: 'en' | 'de') => {
  if (!Number.isFinite(hours) || hours <= 0) throw new RangeError('invalid-duration');
  const totalSeconds = hours * 3600;
  if (!Number.isFinite(totalSeconds)) throw new RangeError('unrepresentable-duration');
  const { numberLocale, subsecond } = localeFormats[locale];
  const number = (value: number, digits = 0) => value.toLocaleString(numberLocale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

  if (totalSeconds >= 86400) {
    const days = totalSeconds / 86400;
    const digits = Number.isInteger(days) ? 0 : 1;
    return `${number(days, digits)} ${unitLabel(locale, 'day', Math.abs(days - 1) < 0.05)}`;
  }
  if (totalSeconds >= 7200) return `${number(Math.round(hours))} ${unitLabel(locale, 'hour', false)}`;
  if (totalSeconds >= 3600) {
    const roundedHours = Math.abs(hours - 1) < 0.05 ? 1 : hours;
    return `${number(roundedHours, roundedHours === 1 ? 0 : 1)} ${unitLabel(locale, 'hour', roundedHours === 1)}`;
  }
  if (totalSeconds >= 120) return `${number(Math.round(totalSeconds / 60))} ${unitLabel(locale, 'minute', false)}`;
  if (totalSeconds >= 60) return `1 ${unitLabel(locale, 'minute', true)}`;
  if (totalSeconds < 1) return subsecond;
  const seconds = Math.round(totalSeconds);
  return `${number(seconds)} ${unitLabel(locale, 'second', seconds === 1)}`;
};
