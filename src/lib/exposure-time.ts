export type ExposureTimeModel = 'niosh' | 'eu-upper-action';

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
  const number = (value: number, digits = 0) => value.toLocaleString(locale === 'de' ? 'de-DE' : 'en-GB', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

  if (totalSeconds >= 86400) {
    const days = totalSeconds / 86400;
    const digits = Number.isInteger(days) ? 0 : 1;
    return `${number(days, digits)} ${locale === 'de' ? (Math.abs(days - 1) < 0.05 ? 'Tag' : 'Tage') : (Math.abs(days - 1) < 0.05 ? 'day' : 'days')}`;
  }
  if (totalSeconds >= 7200) return `${number(Math.round(hours))} ${locale === 'de' ? 'Stunden' : 'hours'}`;
  if (totalSeconds >= 3600) {
    const roundedHours = Math.abs(hours - 1) < 0.05 ? 1 : hours;
    return `${number(roundedHours, roundedHours === 1 ? 0 : 1)} ${locale === 'de' ? (roundedHours === 1 ? 'Stunde' : 'Stunden') : (roundedHours === 1 ? 'hour' : 'hours')}`;
  }
  if (totalSeconds >= 120) return `${number(Math.round(totalSeconds / 60))} ${locale === 'de' ? 'Minuten' : 'minutes'}`;
  if (totalSeconds >= 60) return `1 ${locale === 'de' ? 'Minute' : 'minute'}`;
  if (totalSeconds < 1) return locale === 'de' ? '< 1 Sekunde' : '< 1 second';
  const seconds = Math.round(totalSeconds);
  return `${number(seconds)} ${locale === 'de' ? (seconds === 1 ? 'Sekunde' : 'Sekunden') : (seconds === 1 ? 'second' : 'seconds')}`;
};
