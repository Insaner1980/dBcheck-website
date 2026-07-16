import type { Locale } from './config';

const en = {
  skip: 'Skip to content', mainNav: 'Main', menu: 'Explore', tools: 'Tools', pricing: 'Pricing', articles: 'Articles', sounds: 'Sound Library', app: 'App', contact: 'Contact', search: 'Search', closeSearch: 'Close search',
  searchTitle: 'Search sounds, tools & pages', searchLabel: 'Search the dBcheck website', searchPlaceholder: 'Try “concert” or “calculator”…', searchEmpty: 'No matching sounds or pages yet. Try another term.',
  footerTagline: 'A quiet instrument for a loud world.\nSound level meter & hearing health companion for Android.', footerExplore: 'Explore', comingSoon: 'Coming soon to Google Play', listen: 'Listen to the page', disclaimer: 'dBcheck supports education, awareness and personal relative tracking. It is not a certified sound level meter or a clinical diagnostic tool.',
  allTools: 'All tools', reviewed: 'Reviewed', guides: 'guides',
  indexTitle: 'Articles and sound guides', indexDescription: 'Sourced dBcheck guides about decibels, phone sound measurement, noise exposure and common sound levels.', indexIntro: 'Twenty evidence-aware guides organized around the concepts, measurement limits and everyday contexts needed to interpret a sound level responsibly.',
  clusters: { fundamentals: ['Decibel fundamentals', 'Definitions, SPL, weighting and the logarithmic scale.'], exposure: ['Safe exposure', 'Level, duration, dose and the differences between major guidance frameworks.'], smartphone: ['Smartphone measurement', 'Accuracy, calibration, repeatable procedure and professional-use boundaries.'], 'common-sounds': ['Common sounds', 'Source-specific ranges with distance, metric and exposure context.'] },
} as const;

const de = {
  skip: 'Zum Inhalt springen', mainNav: 'Hauptnavigation', menu: 'Menü', tools: 'Rechner und Werkzeuge', pricing: 'Preise auf Englisch', articles: 'Artikel', sounds: 'Alltagsgeräusche', contact: 'Kontakt', search: 'Suchen', closeSearch: 'Suche schließen',
  searchTitle: 'Geräusche, Rechner und Artikel durchsuchen', searchLabel: 'dBcheck-Website durchsuchen', searchPlaceholder: 'Zum Beispiel „Konzert“ oder „Rechner“…', searchEmpty: 'Keine passenden Ergebnisse. Versuchen Sie einen anderen Begriff.',
  footerTagline: 'Ein ruhiges Instrument für eine laute Welt.\nSchallbewusstsein und verständliche Rechner für Android.', footerExplore: 'Entdecken', disclaimer: 'dBcheck unterstützt Bildung, Aufmerksamkeit und persönliche relative Verlaufskontrolle. Es ist weder ein zertifizierter Schallpegelmesser noch ein klinisches Diagnoseinstrument.',
  allTools: 'Alle Werkzeuge', reviewed: 'Geprüft', guides: 'Ratgeber',
  indexTitle: 'Artikel und Geräusch-Ratgeber', indexDescription: 'Quellenbasierte dBcheck-Ratgeber zu Dezibel, Smartphone-Messungen, Lärmexposition und Alltagsgeräuschen.', indexIntro: 'Zwanzig quellenbasierte Ratgeber helfen, Schallpegel, Messgrenzen und Alltagssituationen verantwortlich einzuordnen.',
  clusters: { fundamentals: ['Dezibel-Grundlagen', 'Definitionen, Schalldruckpegel, Bewertungen und die logarithmische Skala.'], exposure: ['Lärmexposition und Gehörschutz', 'Pegel, Dauer, Dosis und die Regeln in Deutschland und der EU.'], smartphone: ['Schallmessung mit dem Smartphone', 'Genauigkeit, Kalibrierung, wiederholbare Messung und fachliche Grenzen.'], 'common-sounds': ['Alltagsgeräusche', 'Quellenbezogene Bereiche mit Abstand, Messgröße und Expositionskontext.'] },
} as const;

export const ui = { en, de } satisfies Record<Locale, typeof en | typeof de>;
export const getUi = (locale: Locale) => ui[locale];
