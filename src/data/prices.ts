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
  return trace.match(/^loc=([a-z]{2})\r?$/im)?.[1].toUpperCase();
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
  const parts = displayPrice.match(/^(.*?)(\d(?:[\d\s.,]*\d)?)(.*)$/);
  return parts
    ? { prefix: parts[1], amount: parts[2], suffix: parts[3] }
    : { prefix: '', amount: displayPrice, suffix: '' };
}
