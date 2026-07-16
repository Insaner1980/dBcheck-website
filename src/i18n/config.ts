export const defaultLocale = 'en' as const;
export const locales = ['en', 'de'] as const;

export type Locale = (typeof locales)[number];

export const isLocale = (value: string | undefined): value is Locale =>
  locales.includes(value as Locale);

export const nonDefaultLocales = locales.filter((locale) => locale !== defaultLocale);

export const localeTags: Record<Locale, string> = {
  en: 'en-GB',
  de: 'de-DE',
};

export const openGraphLocales: Record<Locale, string> = {
  en: 'en_GB',
  de: 'de_DE',
};

/*
 * Uuden kielen lisääminen:
 * 1. Lisää kielitunnus locales-taulukkoon.
 * 2. Lisää locale-paketti käyttöliittymä-, työkalu- ja sound-teksteineen.
 * 3. Luo src/content/articles/{locale}/ ja src/content/sounds/{locale}/.
 * 4. Lisää sisältöön locale, translationKey, clusterKey ja lokalisoitu slug.
 * 5. Lisää slug-parit src/i18n/routes.ts:n reittirekisteriin.
 * 6. Aja build ja i18n-varmennus.
 */
