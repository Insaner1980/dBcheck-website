import type { Locale } from '../i18n/config.ts';
import { translationFor, routeForContent } from '../i18n/routes.ts';

export type SoundRiskLevel = 'everyday' | 'warning' | 'danger';
export type SoundMarkerLane = 'low' | 'middle' | 'top';

export interface LocalizedCommonSound {
  translationKey: string;
  locale: Locale;
  slug: string;
  name: string;
  category: string;
  typicalMinDb: number;
  typicalMaxDb: number;
  measurementDistance: string;
  soundType: string;
  shortDescription: string;
  exposureNote: string;
  riskLevel: SoundRiskLevel;
  markerLane: SoundMarkerLane;
  articleRoute?: string;
}

export type CommonSound = LocalizedCommonSound;

const technical = [
  ['whisper-decibels', 25, 35, 'everyday', 'low'],
  ['normal-conversation', 55, 75, 'everyday', 'top'],
  ['vacuum-cleaner', 65, 85, 'everyday', 'low'],
  ['busy-traffic-decibels', 75, 85, 'warning', 'middle'],
  ['lawn-mower', 86, 96, 'warning', 'low'],
  ['concert', 85, 105, 'danger', 'middle'],
  ['baby-crying', 75, 100, 'warning', 'top'],
  ['siren-decibels', 105, 120, 'danger', 'middle'],
  ['fireworks-decibels', 120, 150, 'danger', 'low'],
] as const;

type SoundText = { slug: string; name: string; category: string; measurementDistance: string; soundType: string; shortDescription: string; exposureNote: string };

const text: Record<Locale, Record<string, SoundText>> = {
  en: {
    'whisper-decibels': { slug: 'whisper-decibels', name: 'Whisper', category: 'Voices', measurementDistance: 'Close range; position affects the reading', soundType: 'Variable speech sound', shortDescription: 'A whisper is quiet at close range. Distance and room reflections can change the reading substantially.', exposureNote: 'Usually well below occupational exposure limits.' },
    'normal-conversation': { slug: 'normal-conversation', name: 'Normal conversation', category: 'Voices', measurementDistance: 'About 1 metre', soundType: 'Variable and intermittent speech', shortDescription: 'Normal conversation varies with vocal effort, distance, background noise and room acoustics.', exposureNote: 'Ordinary one-to-one conversation is generally not treated as a hearing hazard.' },
    'vacuum-cleaner': { slug: 'vacuum-cleaner', name: 'Vacuum cleaner', category: 'Home', measurementDistance: 'Operator position or about 1 metre', soundType: 'Continuous but operating-state dependent', shortDescription: 'Vacuum cleaner readings change with the model, setting, floor, room and microphone position.', exposureNote: 'Duration matters more for repeated or occupational cleaning than for a short household task.' },
    'busy-traffic-decibels': { slug: 'busy-traffic-decibels', name: 'Busy traffic', category: 'Transport', measurementDistance: 'Listener position must be stated', soundType: 'Variable environmental sound', shortDescription: 'Road traffic changes with vehicle mix, speed, distance and surrounding buildings.', exposureNote: 'Long or repeated exposure near the upper end deserves attention.' },
    'lawn-mower': { slug: 'lawn-mower', name: 'Lawn mower', category: 'Garden', measurementDistance: "Operator's hearing zone", soundType: 'Continuous with variable load', shortDescription: 'Powered mower levels vary with the machine, blade, load, terrain and operator position.', exposureNote: 'Levels in this range can accumulate occupational noise dose quickly.' },
    'concert': { slug: 'concert', name: 'Concert', category: 'Music', measurementDistance: 'Audience or front-of-house position', soundType: 'Variable amplified music', shortDescription: 'Concert levels vary by audience position, loudspeaker layout, venue, programme and averaging period.', exposureNote: 'At higher average levels, a full occupational reference dose can accumulate rapidly.' },
    'baby-crying': { slug: 'baby-crying', name: 'Baby crying', category: 'Voices', measurementDistance: 'Roughly 0.3 to 1 metre', soundType: 'Variable and intermittent vocal sound', shortDescription: 'Crying levels vary strongly with age, vocal effort, distance, room and whether average or maximum is reported.', exposureNote: 'A close loud cry and repeated exposure are different contexts; the reading cannot assess health.' },
    'siren-decibels': { slug: 'siren-decibels', name: 'Siren', category: 'Warnings', measurementDistance: 'Distance must be stated', soundType: 'Variable warning sound', shortDescription: 'Sirens are designed to remain audible over other sound and can be intense at close range.', exposureNote: 'Move away from the source when practical; distance strongly affects the level.' },
    'fireworks-decibels': { slug: 'fireworks-decibels', name: 'Fireworks', category: 'Impulse sound', measurementDistance: 'Distance and peak metric are essential', soundType: 'Impulse sound', shortDescription: 'Fireworks produce brief impulse peaks. Type, distance and surroundings create large variations.', exposureNote: 'Impulse sound is not well represented by a simple continuous-exposure estimate.' },
  },
  de: {
    'whisper-decibels': { slug: 'fluestern', name: 'Flüstern', category: 'Stimmen', measurementDistance: 'Kurzer Abstand; die Position beeinflusst den Messwert', soundType: 'Veränderlicher Sprachschall', shortDescription: 'Flüstern ist aus kurzer Entfernung leise. Abstand und Raumreflexionen können den Messwert deutlich verändern.', exposureNote: 'Üblicherweise deutlich unter arbeitsbezogenen Auslösewerten.' },
    'normal-conversation': { slug: 'normales-gespraech', name: 'Normales Gespräch', category: 'Stimmen', measurementDistance: 'Etwa 1 Meter', soundType: 'Veränderliche, unterbrochene Sprache', shortDescription: 'Ein normales Gespräch variiert mit Stimmeinsatz, Abstand, Hintergrundgeräusch und Raumakustik.', exposureNote: 'Ein gewöhnliches Gespräch zu zweit gilt im Allgemeinen nicht als Gehörgefährdung.' },
    'vacuum-cleaner': { slug: 'staubsauger', name: 'Staubsauger', category: 'Haushalt', measurementDistance: 'Bedienposition oder etwa 1 Meter', soundType: 'Kontinuierlich, abhängig vom Betriebszustand', shortDescription: 'Messwerte ändern sich mit Modell, Stufe, Boden, Raum und Mikrofonposition.', exposureNote: 'Die Dauer ist bei wiederholter oder beruflicher Reinigung wichtiger als bei einer kurzen Haushaltsaufgabe.' },
    'busy-traffic-decibels': { slug: 'strassenverkehr', name: 'Starker Straßenverkehr', category: 'Verkehr', measurementDistance: 'Die Hörposition muss angegeben werden', soundType: 'Veränderliches Umgebungsgeräusch', shortDescription: 'Straßenverkehr ändert sich mit Fahrzeugmix, Geschwindigkeit, Abstand und Bebauung.', exposureNote: 'Lange oder wiederholte Exposition am oberen Ende verdient Aufmerksamkeit.' },
    'lawn-mower': { slug: 'rasenmaeher', name: 'Rasenmäher', category: 'Garten', measurementDistance: 'Hörzone der bedienenden Person', soundType: 'Kontinuierlich mit wechselnder Last', shortDescription: 'Pegel variieren mit Maschine, Messer, Last, Gelände und Bedienposition.', exposureNote: 'Pegel in diesem Bereich können die tägliche Lärmexposition schnell erhöhen.' },
    'concert': { slug: 'konzert', name: 'Konzert', category: 'Musik', measurementDistance: 'Publikums- oder Mischpultposition', soundType: 'Veränderliche verstärkte Musik', shortDescription: 'Konzertpegel variieren mit Position, Lautsprecheranordnung, Veranstaltungsort, Programm und Mittelungsdauer.', exposureNote: 'Bei höheren Mittelungspegeln kann sich eine erhebliche Exposition schnell aufbauen.' },
    'baby-crying': { slug: 'babygeschrei', name: 'Babygeschrei', category: 'Stimmen', measurementDistance: 'Ungefähr 0,3 bis 1 Meter', soundType: 'Veränderlicher, unterbrochener Stimmschall', shortDescription: 'Pegel variieren stark mit Alter, Stimmeinsatz, Abstand, Raum und verwendeter Messgröße.', exposureNote: 'Ein lauter Schrei aus kurzer Nähe und wiederholte Exposition sind verschiedene Situationen; der Messwert beurteilt nicht die Gesundheit.' },
    'siren-decibels': { slug: 'sirene', name: 'Sirene', category: 'Warnsignale', measurementDistance: 'Der Abstand muss angegeben werden', soundType: 'Veränderliches Warnsignal', shortDescription: 'Sirenen sollen andere Geräusche übertönen und können aus kurzer Entfernung sehr intensiv sein.', exposureNote: 'Vergrößern Sie wenn möglich den Abstand; er beeinflusst den Pegel stark.' },
    'fireworks-decibels': { slug: 'feuerwerk', name: 'Feuerwerk', category: 'Impulsschall', measurementDistance: 'Abstand und Spitzenwert-Messgröße sind wesentlich', soundType: 'Impulsschall', shortDescription: 'Feuerwerk erzeugt kurze Impulsspitzen. Art, Abstand und Umgebung führen zu großen Unterschieden.', exposureNote: 'Impulsschall lässt sich mit einer einfachen Dauerexpositionsschätzung nicht angemessen darstellen.' },
  },
};

const publishedKeys = new Set(['normal-conversation', 'vacuum-cleaner', 'lawn-mower', 'concert', 'baby-crying']);

export const getCommonSounds = (locale: Locale): LocalizedCommonSound[] => technical.map(([translationKey, typicalMinDb, typicalMaxDb, riskLevel, markerLane]) => {
  const localized = text[locale][translationKey];
  const translation = translationFor(translationKey);
  const articleSlug = translation?.[locale];
  return {
    translationKey, locale, ...localized, typicalMinDb, typicalMaxDb, riskLevel, markerLane,
    articleRoute: publishedKeys.has(translationKey) && articleSlug ? routeForContent(locale, 'sounds', articleSlug) : undefined,
  };
});

export const commonSounds = getCommonSounds('en');
export const findCommonSound = (slug: string, locale: Locale = 'en') => getCommonSounds(locale).find((sound) => sound.slug === slug);
