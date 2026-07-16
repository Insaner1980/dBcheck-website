import type { Locale } from '../i18n/config';

export interface LocalizedToolDefinition {
  id: string;
  translationKey?: string;
  locale: Locale;
  title: string;
  description: string;
  href: string;
  actionLabel: string;
  category: 'calculator' | 'explorer';
  order: number;
  searchTags: string[];
}

const toolData: Record<Locale, LocalizedToolDefinition[]> = {
  en: [
    { id: 'safe-exposure-time', locale: 'en', title: 'Safe Exposure Time Calculator', description: 'Estimate the time to a 100% NIOSH daily occupational dose using the 85 dBA / 8 hour / 3 dB model.', href: '/tools/safe-listening-time-calculator/', actionLabel: 'Open calculator', category: 'calculator', order: 1, searchTags: ['calculator', 'niosh', 'exposure', 'time', '85 dba'] },
    { id: 'noise-dose', locale: 'en', title: 'Noise Dose Calculator', description: 'Combine multiple sound-level and duration periods into one estimated daily occupational noise dose.', href: '/tools/noise-dose-calculator/', actionLabel: 'Calculate dose', category: 'calculator', order: 2, searchTags: ['calculator', 'noise dose', 'multiple exposures', 'duration'] },
    { id: 'daily-noise-exposure', translationKey: 'daily-noise-exposure', locale: 'en', title: 'Daily Noise Exposure Level Calculator', description: 'Combine work periods into an eight-hour-normalized L_EX,8h level using the EU occupational model.', href: '/tools/daily-noise-exposure-level-calculator/', actionLabel: 'Calculate exposure level', category: 'calculator', order: 3, searchTags: ['calculator', 'L_EX,8h', 'EU', 'daily noise exposure'] },
    { id: 'common-sounds', translationKey: 'common-sounds', locale: 'en', title: 'Common Sounds Explorer', description: 'Compare typical decibel ranges for everyday sounds and open detailed sound guides.', href: '/sounds/', actionLabel: 'Explore sounds', category: 'explorer', order: 4, searchTags: ['sound library', 'common sounds', 'decibels', 'comparison'] },
    { id: 'decibel-distance', translationKey: 'decibel-distance', locale: 'en', title: 'Decibel Distance Calculator', description: 'Estimate how sound level may change as distance from a source increases under simplified free-field conditions.', href: '/tools/decibel-distance/', actionLabel: 'Estimate level', category: 'calculator', order: 5, searchTags: ['calculator', 'distance', 'free field', 'sound level'] },
    { id: 'add-decibels', translationKey: 'add-decibels', locale: 'en', title: 'Add Decibels Calculator', description: 'Combine independent sound levels correctly using logarithmic addition instead of ordinary arithmetic.', href: '/tools/add-decibels/', actionLabel: 'Combine levels', category: 'calculator', order: 6, searchTags: ['calculator', 'add decibels', 'logarithmic addition', 'sound levels'] },
  ],
  de: [
    { id: 'safe-exposure-time', translationKey: 'safe-exposure-time', locale: 'de', title: 'Expositionsdauer-Rechner', description: 'Berechnet die konstante Dauer bis zum oberen Auslösewert L_EX,8h = 85 dB(A) nach dem deutschen Arbeitsschutzmodell.', href: '/de/werkzeuge/expositionsdauer-rechner/', actionLabel: 'Expositionsdauer berechnen', category: 'calculator', order: 1, searchTags: ['Rechner', 'Expositionsdauer', 'L_EX,8h', '85 dB(A)', 'Arbeitsschutz'] },
    { id: 'daily-noise-exposure', translationKey: 'daily-noise-exposure', locale: 'de', title: 'Lärmexpositionsrechner', description: 'Berechnet aus mehreren Arbeitsabschnitten den auf acht Stunden bezogenen Tages-Lärmexpositionspegel L_EX,8h.', href: '/de/werkzeuge/laermexpositionsrechner/', actionLabel: 'Expositionspegel berechnen', category: 'calculator', order: 2, searchTags: ['Rechner', 'L_EX,8h', 'Lärmexposition', 'Arbeitsschutz'] },
    { id: 'common-sounds', translationKey: 'common-sounds', locale: 'de', title: 'Alltagsgeräusche', description: 'Vergleichen Sie typische Dezibelbereiche und öffnen Sie ausführliche, quellenbasierte Geräusch-Ratgeber.', href: '/de/alltagsgeraeusche/', actionLabel: 'Geräusche vergleichen', category: 'explorer', order: 3, searchTags: ['Geräusche', 'Dezibel', 'Vergleich', 'Alltag'] },
    { id: 'decibel-distance', translationKey: 'decibel-distance', locale: 'de', title: 'Schallpegel und Entfernung', description: 'Schätzen Sie die Pegeländerung mit der Entfernung im vereinfachten Freifeld-Punktquellenmodell.', href: '/de/werkzeuge/schallpegel-entfernung/', actionLabel: 'Pegel schätzen', category: 'calculator', order: 4, searchTags: ['Rechner', 'Entfernung', 'Freifeld', '6-dB-Regel'] },
    { id: 'add-decibels', translationKey: 'add-decibels', locale: 'de', title: 'Dezibel addieren', description: 'Addieren Sie kompatible, unabhängige Schallpegel logarithmisch statt mit gewöhnlicher Arithmetik.', href: '/de/werkzeuge/dezibel-addieren/', actionLabel: 'Pegel kombinieren', category: 'calculator', order: 5, searchTags: ['Rechner', 'Dezibel addieren', 'logarithmisch', 'Schallpegel'] },
  ],
};

export const getTools = (locale: Locale) => toolData[locale];
export const tools = toolData.en;
