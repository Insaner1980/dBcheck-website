const editorialDatePattern = /^\d{4}-\d{2}-\d{2}$/;

export const parseEditorialDate = (value) => {
  if (typeof value !== 'string' || !editorialDatePattern.test(value)) throw new RangeError('editorial-date-format');
  const date = new Date(`${value}T00:00:00.000Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new RangeError('editorial-date-calendar');
  }
  return date;
};

export const isEditorialDate = (value) => {
  try {
    parseEditorialDate(value);
    return true;
  } catch {
    return false;
  }
};
