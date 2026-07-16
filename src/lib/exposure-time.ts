export type ExposureTimeModel = 'niosh' | 'eu-upper-action';

export const calculateExposureHours = (levelDb: number, model: ExposureTimeModel) =>
  model === 'niosh'
    ? 8 * Math.pow(2, (85 - levelDb) / 3)
    : 8 * Math.pow(10, (85 - levelDb) / 10);

export const formatExposureTime = (hours: number, locale: 'en' | 'de') => {
  const totalSeconds = hours * 3600;
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
  return `${number(Math.max(1, Math.round(totalSeconds)))} ${locale === 'de' ? 'Sekunden' : 'seconds'}`;
};
