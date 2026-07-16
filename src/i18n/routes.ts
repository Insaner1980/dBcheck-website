import type { Locale } from './config.ts';

export interface AlternateLink {
  locale: Locale;
  href: string;
}

export interface ContentTranslation {
  translationKey: string;
  collection: 'articles' | 'sounds';
  en: string;
  de: string;
}

const contentSegments: Record<Locale, Record<ContentTranslation['collection'], string>> = {
  en: { articles: 'articles', sounds: 'sounds' },
  de: { articles: 'artikel', sounds: 'alltagsgeraeusche' },
};

export const contentTranslations: ContentTranslation[] = [
  ['are-decibel-meter-apps-accurate', 'articles', 'are-decibel-meter-apps-accurate', 'sind-dezibel-apps-genau'],
  ['db-vs-dba', 'articles', 'db-vs-dba', 'db-und-dba-unterschied'],
  ['how-long-can-you-listen-at-85-db', 'articles', 'how-long-can-you-listen-at-85-db', 'wie-lange-85-db-hoeren'],
  ['how-to-calibrate-a-decibel-meter-app', 'articles', 'how-to-calibrate-a-decibel-meter-app', 'dezibel-app-kalibrieren'],
  ['how-to-measure-decibels-with-android-phone', 'articles', 'how-to-measure-decibels-with-android-phone', 'dezibel-messen-mit-android-handy'],
  ['is-3-db-twice-as-loud', 'articles', 'is-3-db-twice-as-loud', 'sind-3-db-doppelt-so-laut'],
  ['niosh-vs-osha-noise-exposure-limits', 'articles', 'niosh-vs-osha-noise-exposure-limits', 'laermexpositionsgrenzen-deutschland-eu'],
  ['phone-sound-meter-vs-professional-meter', 'articles', 'phone-sound-meter-vs-professional-meter', 'schallpegelmesser-app-vs-messgeraet'],
  ['what-is-a-decibel', 'articles', 'what-is-a-decibel', 'was-ist-ein-dezibel'],
  ['what-is-a-safe-decibel-level', 'articles', 'what-is-a-safe-decibel-level', 'welcher-dezibelwert-ist-sicher'],
  ['what-is-noise-dose', 'articles', 'what-is-noise-dose', 'was-ist-eine-laermdosis'],
  ['what-is-sound-pressure-level', 'articles', 'what-is-sound-pressure-level', 'was-ist-schalldruckpegel'],
  ['why-decibel-meter-apps-show-different-results', 'articles', 'why-decibel-meter-apps-show-different-results', 'warum-dezibel-apps-unterschiedliche-werte-zeigen'],
  ['why-does-85-db-matter', 'articles', 'why-does-85-db-matter', 'warum-sind-85-db-wichtig'],
  ['why-is-the-decibel-scale-logarithmic', 'articles', 'why-is-the-decibel-scale-logarithmic', 'warum-ist-die-dezibelskala-logarithmisch'],
  ['baby-crying', 'sounds', 'baby-crying', 'babygeschrei'],
  ['concert', 'sounds', 'concert', 'konzert'],
  ['lawn-mower', 'sounds', 'lawn-mower', 'rasenmaeher'],
  ['normal-conversation', 'sounds', 'normal-conversation', 'normales-gespraech'],
  ['vacuum-cleaner', 'sounds', 'vacuum-cleaner', 'staubsauger'],
].map(([translationKey, collection, en, de]) => ({ translationKey, collection, en, de })) as ContentTranslation[];

const staticPairs = [
  { en: '/articles/', de: '/de/artikel/' },
  { en: '/sounds/', de: '/de/alltagsgeraeusche/' },
  { en: '/tools/', de: '/de/werkzeuge/' },
  { en: '/tools/safe-listening-time-calculator/', de: '/de/werkzeuge/expositionsdauer-rechner/' },
  { en: '/tools/add-decibels/', de: '/de/werkzeuge/dezibel-addieren/' },
  { en: '/tools/decibel-distance/', de: '/de/werkzeuge/schallpegel-entfernung/' },
  { en: '/tools/daily-noise-exposure-level-calculator/', de: '/de/werkzeuge/laermexpositionsrechner/' },
];

export const routeForContent = (locale: Locale, collection: 'articles' | 'sounds', slug: string) =>
  `${locale === 'en' ? '' : `/${locale}`}/${contentSegments[locale][collection]}/${slug}/`;

export const routePairs = [
  ...staticPairs,
  ...contentTranslations.map((item) => ({
    en: routeForContent('en', item.collection, item.en),
    de: routeForContent('de', item.collection, item.de),
  })),
];

const normalizePath = (path: string) => path === '/' ? path : `${path.replace(/\/+$/, '')}/`;

export const findRoutePair = (path: string) => {
  const normalized = normalizePath(path);
  return routePairs.find((pair) => pair.en === normalized || pair.de === normalized);
};

export const alternatesForPath = (path: string): AlternateLink[] => {
  const pair = findRoutePair(path);
  return pair ? [{ locale: 'en', href: pair.en }, { locale: 'de', href: pair.de }] : [];
};

export const translationFor = (translationKey: string) =>
  contentTranslations.find((item) => item.translationKey === translationKey);
