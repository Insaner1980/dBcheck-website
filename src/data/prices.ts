export const DEFAULT_PRO_PRICE = '12,99 €';

const EUROZONE_COUNTRIES = [
  'AT', 'BE', 'CY', 'DE', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'IE',
  'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PT', 'SI', 'SK',
] as const;

export const PRO_PRICE_BY_COUNTRY: Readonly<Record<string, string>> = {
  ...Object.fromEntries(EUROZONE_COUNTRIES.map((country) => [country, DEFAULT_PRO_PRICE])),
  US: '$14.99',
  GB: '£10.99',
  SE: '149 kr',
  NO: '149 kr',
  DK: '99 kr',
  CH: 'CHF 12.90',
  PL: '54,99 zł',
  CZ: '299 Kč',
  HU: '4 490 Ft',
  CA: 'CA$19.99',
  AU: 'A$21.99',
  NZ: 'NZ$24.99',
  JP: '¥2 400',
};

export function parseCloudflareTraceCountry(trace: string): string | undefined {
  let countryCode: string | undefined;

  for (const line of trace.split(/\r?\n/)) {
    if (line.length === 0) continue;

    const field = /^([a-z][a-z0-9_]*)=([^\r\n]*)$/i.exec(line);
    if (!field) return undefined;

    const [, key, value] = field;
    if (key.toLowerCase() !== 'loc') continue;
    if (countryCode || !/^[a-z]{2}$/i.test(value)) return undefined;

    countryCode = value.toUpperCase();
  }

  return countryCode;
}

export function getProPriceForCountry(countryCode: string | undefined): string {
  if (!countryCode) return DEFAULT_PRO_PRICE;
  return PRO_PRICE_BY_COUNTRY[countryCode.toUpperCase()] ?? DEFAULT_PRO_PRICE;
}

export function getFreePriceForCountry(countryCode: string | undefined): string {
  const { prefix, suffix } = splitPriceDisplay(getProPriceForCountry(countryCode));
  return `${prefix}0${suffix}`;
}

export function splitPriceDisplay(displayPrice: string) {
  let amountStart = -1;
  for (let index = 0; index < displayPrice.length; index += 1) {
    const character = displayPrice[index];
    if (character >= '0' && character <= '9') {
      amountStart = index;
      break;
    }
  }
  if (amountStart < 0) return { prefix: '', amount: displayPrice, suffix: '' };

  let amountEnd = amountStart + 1;
  for (let index = amountStart + 1; index < displayPrice.length; index += 1) {
    const character = displayPrice[index];
    const isDigit = character >= '0' && character <= '9';
    if (isDigit) {
      amountEnd = index + 1;
      continue;
    }
    if (character === '.' || character === ',' || character.trim() === '') continue;
    break;
  }

  return {
    prefix: displayPrice.slice(0, amountStart),
    amount: displayPrice.slice(amountStart, amountEnd),
    suffix: displayPrice.slice(amountEnd),
  };
}
