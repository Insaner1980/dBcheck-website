import type { Locale } from '../i18n/config.ts';
import { translationFor, routeForContent } from '../i18n/routes.ts';

export type SoundRiskLevel = 'everyday' | 'warning' | 'danger';
export type SoundMarkerLane = 'low' | 'middle' | 'top';

export interface SoundRangeSource {
  credit: string;
  publisher: string;
  title: string;
  publicationDate: string;
  revisionDate?: string;
  url: string;
  supports: readonly string[];
  reportedMinDb: number;
  reportedMaxDb: number;
  displayMinDb: number;
  displayMaxDb: number;
  metric: 'dBA';
}

export const soundRangeSources = {
  whisperUsGs: {
    credit: 'Logan M. Maxwell et al.',
    publisher: 'U.S. Geological Survey',
    title: 'Effects of noise from oil and gas development on raptors and songbirds—A science synthesis to inform National Environmental Policy Act analyses',
    publicationDate: '2024-10-29',
    revisionDate: '2025-12-22',
    url: 'https://pubs.usgs.gov/sir/2024/5087/sir20245087.pdf',
    supports: ['whisper-decibels'],
    reportedMinDb: 25,
    reportedMaxDb: 30,
    displayMinDb: 25,
    displayMaxDb: 30,
    metric: 'dBA',
  },
  busyTrafficBangkok: {
    credit: 'Shing Tet Leong and Preecha Laortanakul',
    publisher: 'Environmental Monitoring and Assessment',
    title: 'Monitoring and Assessment of Daily Exposure of Roadside Workers to Traffic Noise Levels in an Asian City: A Case Study of Bangkok Streets',
    publicationDate: '2003-06',
    url: 'https://link.springer.com/article/10.1023/A%3A1023305216910',
    supports: ['busy-traffic-decibels'],
    reportedMinDb: 72.8,
    reportedMaxDb: 83,
    displayMinDb: 73,
    displayMaxDb: 83,
    metric: 'dBA',
  },
  emergencySirenNidcd: {
    credit: 'National Institute on Deafness and Other Communication Disorders',
    publisher: 'National Institutes of Health',
    title: 'Hearing Protectors',
    publicationDate: '2020-11',
    revisionDate: '2025-04-16',
    url: 'https://www.nidcd.nih.gov/health/hearing-protectors',
    supports: ['siren-decibels'],
    reportedMinDb: 110,
    reportedMaxDb: 129,
    displayMinDb: 110,
    displayMaxDb: 129,
    metric: 'dBA',
  },
  aerialFireworksTanaka: {
    credit: 'Tagayasu Tanaka, Ryoichi Inaba and Atsuhito Aoyama',
    publisher: 'Journal of Occupational Health',
    title: 'Noise and low-frequency sound levels due to aerial fireworks and prediction of the occupational exposure of pyrotechnicians to noise',
    publicationDate: '2016-11-20',
    url: 'https://www.jstage.jst.go.jp/article/joh/58/6/58_16-0064-OA/_html/-char/en',
    supports: ['fireworks-decibels'],
    reportedMinDb: 100,
    reportedMaxDb: 115,
    displayMinDb: 100,
    displayMaxDb: 115,
    metric: 'dBA',
  },
} as const satisfies Record<string, SoundRangeSource>;

export type SoundRangeSourceId = keyof typeof soundRangeSources;

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
  rangeReference?: {
    context: string;
    sourceId: SoundRangeSourceId;
    source: SoundRangeSource;
  };
  articleRoute?: string;
}

export type CommonSound = LocalizedCommonSound;

type TechnicalSound = readonly [string, number, number, SoundRiskLevel, SoundMarkerLane, SoundRangeSourceId?];

const technical: readonly TechnicalSound[] = [
  ['whisper-decibels', soundRangeSources.whisperUsGs.displayMinDb, soundRangeSources.whisperUsGs.displayMaxDb, 'everyday', 'low', 'whisperUsGs'],
  ['normal-conversation', 55, 75, 'everyday', 'top'],
  ['vacuum-cleaner', 65, 85, 'everyday', 'low'],
  ['busy-traffic-decibels', soundRangeSources.busyTrafficBangkok.displayMinDb, soundRangeSources.busyTrafficBangkok.displayMaxDb, 'warning', 'middle', 'busyTrafficBangkok'],
  ['lawn-mower', 86, 96, 'warning', 'low'],
  ['concert', 85, 105, 'danger', 'middle'],
  ['baby-crying', 75, 100, 'warning', 'top'],
  ['siren-decibels', soundRangeSources.emergencySirenNidcd.displayMinDb, soundRangeSources.emergencySirenNidcd.displayMaxDb, 'danger', 'middle', 'emergencySirenNidcd'],
  ['fireworks-decibels', soundRangeSources.aerialFireworksTanaka.displayMinDb, soundRangeSources.aerialFireworksTanaka.displayMaxDb, 'danger', 'low', 'aerialFireworksTanaka'],
];

type SoundText = { slug: string; name: string; category: string; measurementDistance: string; soundType: string; shortDescription: string; exposureNote: string; referenceContext?: string };

const text: Record<Locale, Record<string, SoundText>> = {
  en: {
    'whisper-decibels': { slug: 'whisper-decibels', name: 'Whisper', category: 'Voices', measurementDistance: '1.5–5 metres in the cited reference', soundType: 'Variable speech sound', shortDescription: 'A whisper is quiet at close range. Distance and room reflections can change the reading substantially.', exposureNote: 'Usually well below occupational exposure limits.', referenceContext: 'Active-source averages compiled from measurements at 1.5–5 metres.' },
    'normal-conversation': { slug: 'normal-conversation', name: 'Normal conversation', category: 'Voices', measurementDistance: 'About 1 metre', soundType: 'Variable and intermittent speech', shortDescription: 'Normal conversation varies with vocal effort, distance, background noise and room acoustics.', exposureNote: 'Ordinary one-to-one conversation is generally not treated as a hearing hazard.' },
    'vacuum-cleaner': { slug: 'vacuum-cleaner', name: 'Vacuum cleaner', category: 'Home', measurementDistance: 'Operator position or about 1 metre', soundType: 'Continuous but operating-state dependent', shortDescription: 'Vacuum cleaner readings change with the model, setting, floor, room and microphone position.', exposureNote: 'Duration matters more for repeated or occupational cleaning than for a short household task.' },
    'busy-traffic-decibels': { slug: 'busy-traffic-decibels', name: 'Busy traffic', category: 'Transport', measurementDistance: 'Roadside monitoring positions in the cited study', soundType: 'Variable environmental sound', shortDescription: 'Road traffic changes with vehicle mix, speed, distance and surrounding buildings.', exposureNote: 'Long or repeated exposure near the upper end deserves attention.', referenceContext: 'Daytime average levels at four Bangkok roadside traffic zones; source values are rounded to whole decibels.' },
    'lawn-mower': { slug: 'lawn-mower', name: 'Lawn mower', category: 'Garden', measurementDistance: "Operator's hearing zone", soundType: 'Continuous with variable load', shortDescription: 'Powered mower levels vary with the machine, blade, load, terrain and operator position.', exposureNote: 'Levels in this range can accumulate occupational noise dose quickly.' },
    'concert': { slug: 'concert', name: 'Concert', category: 'Music', measurementDistance: 'Audience or front-of-house position', soundType: 'Variable amplified music', shortDescription: 'Concert levels vary by audience position, loudspeaker layout, venue, programme and averaging period.', exposureNote: 'At higher average levels, a full occupational reference dose can accumulate rapidly.' },
    'baby-crying': { slug: 'baby-crying', name: 'Baby crying', category: 'Voices', measurementDistance: 'Roughly 0.3 to 1 metre', soundType: 'Variable and intermittent vocal sound', shortDescription: 'Crying levels vary strongly with age, vocal effort, distance, room and whether average or maximum is reported.', exposureNote: 'A close loud cry and repeated exposure are different contexts; the reading cannot assess health.' },
    'siren-decibels': { slug: 'siren-decibels', name: 'Siren', category: 'Warnings', measurementDistance: 'Not reported by the cited source', soundType: 'Variable warning sound', shortDescription: 'Sirens are designed to remain audible over other sound and can be intense at close range.', exposureNote: 'Move away from the source when practical; distance strongly affects the level.', referenceContext: 'Average educational rating for emergency-vehicle sirens; the source does not report distance or averaging time.' },
    'fireworks-decibels': { slug: 'fireworks-decibels', name: 'Fireworks', category: 'Impulse sound', measurementDistance: 'About 100 metres in the cited display study', soundType: 'Impulse sound', shortDescription: 'Fireworks create brief impulse peaks, but this reference range is an A-weighted Fast reading from one display; true peaks can be higher.', exposureNote: 'Impulse sound is not well represented by a simple continuous-exposure estimate.', referenceContext: 'A-weighted Fast (125 ms) measurement about 100 metres from one nighttime aerial display; not a true impulse-peak range.' },
  },
  de: {
    'whisper-decibels': { slug: 'fluestern', name: 'Flüstern', category: 'Stimmen', measurementDistance: '1,5–5 Meter in der zitierten Referenz', soundType: 'Veränderlicher Sprachschall', shortDescription: 'Flüstern ist aus kurzer Entfernung leise. Abstand und Raumreflexionen können den Messwert deutlich verändern.', exposureNote: 'Üblicherweise deutlich unter arbeitsbezogenen Auslösewerten.', referenceContext: 'Mittelwerte während der aktiven Quelle, zusammengestellt aus Messungen in 1,5–5 Metern Abstand.' },
    'normal-conversation': { slug: 'normales-gespraech', name: 'Normales Gespräch', category: 'Stimmen', measurementDistance: 'Etwa 1 Meter', soundType: 'Veränderliche, unterbrochene Sprache', shortDescription: 'Ein normales Gespräch variiert mit Stimmeinsatz, Abstand, Hintergrundgeräusch und Raumakustik.', exposureNote: 'Ein gewöhnliches Gespräch zu zweit gilt im Allgemeinen nicht als Gehörgefährdung.' },
    'vacuum-cleaner': { slug: 'staubsauger', name: 'Staubsauger', category: 'Haushalt', measurementDistance: 'Bedienposition oder etwa 1 Meter', soundType: 'Kontinuierlich, abhängig vom Betriebszustand', shortDescription: 'Messwerte ändern sich mit Modell, Stufe, Boden, Raum und Mikrofonposition.', exposureNote: 'Die Dauer ist bei wiederholter oder beruflicher Reinigung wichtiger als bei einer kurzen Haushaltsaufgabe.' },
    'busy-traffic-decibels': { slug: 'strassenverkehr', name: 'Starker Straßenverkehr', category: 'Verkehr', measurementDistance: 'Messpositionen am Straßenrand in der zitierten Studie', soundType: 'Veränderliches Umgebungsgeräusch', shortDescription: 'Straßenverkehr ändert sich mit Fahrzeugmix, Geschwindigkeit, Abstand und Bebauung.', exposureNote: 'Lange oder wiederholte Exposition am oberen Ende verdient Aufmerksamkeit.', referenceContext: 'Durchschnittspegel am Tag an vier verkehrsbelasteten Straßenabschnitten in Bangkok; die Quellenwerte sind auf ganze Dezibel gerundet.' },
    'lawn-mower': { slug: 'rasenmaeher', name: 'Rasenmäher', category: 'Garten', measurementDistance: 'Hörzone der bedienenden Person', soundType: 'Kontinuierlich mit wechselnder Last', shortDescription: 'Pegel variieren mit Maschine, Messer, Last, Gelände und Bedienposition.', exposureNote: 'Pegel in diesem Bereich können die tägliche Lärmexposition schnell erhöhen.' },
    'concert': { slug: 'konzert', name: 'Konzert', category: 'Musik', measurementDistance: 'Publikums- oder Mischpultposition', soundType: 'Veränderliche verstärkte Musik', shortDescription: 'Konzertpegel variieren mit Position, Lautsprecheranordnung, Veranstaltungsort, Programm und Mittelungsdauer.', exposureNote: 'Bei höheren Mittelungspegeln kann sich eine erhebliche Exposition schnell aufbauen.' },
    'baby-crying': { slug: 'babygeschrei', name: 'Babygeschrei', category: 'Stimmen', measurementDistance: 'Ungefähr 0,3 bis 1 Meter', soundType: 'Veränderlicher, unterbrochener Stimmschall', shortDescription: 'Pegel variieren stark mit Alter, Stimmeinsatz, Abstand, Raum und verwendeter Messgröße.', exposureNote: 'Ein lauter Schrei aus kurzer Nähe und wiederholte Exposition sind verschiedene Situationen; der Messwert beurteilt nicht die Gesundheit.' },
    'siren-decibels': { slug: 'sirene', name: 'Sirene', category: 'Warnsignale', measurementDistance: 'In der zitierten Quelle nicht angegeben', soundType: 'Veränderliches Warnsignal', shortDescription: 'Sirenen sollen andere Geräusche übertönen und können aus kurzer Entfernung sehr intensiv sein.', exposureNote: 'Vergrößern Sie wenn möglich den Abstand; er beeinflusst den Pegel stark.', referenceContext: 'Allgemeiner Mittelwertbereich für Einsatzfahrzeugsirenen; die Quelle nennt weder Abstand noch Mittelungsdauer.' },
    'fireworks-decibels': { slug: 'feuerwerk', name: 'Feuerwerk', category: 'Impulsschall', measurementDistance: 'Etwa 100 Meter in der zitierten Veranstaltungsstudie', soundType: 'Impulsschall', shortDescription: 'Feuerwerk erzeugt kurze Impulsspitzen; dieser Referenzbereich ist jedoch ein A-bewerteter Fast-Messwert aus einer Veranstaltung. Echte Spitzen können höher liegen.', exposureNote: 'Impulsschall lässt sich mit einer einfachen Dauerexpositionsschätzung nicht angemessen darstellen.', referenceContext: 'A-bewertete Fast-Messung (125 ms) in etwa 100 Meter Abstand bei einem nächtlichen Feuerwerk; kein Bereich echter Impulsspitzen.' },
  },
};

const publishedKeys = new Set(['normal-conversation', 'vacuum-cleaner', 'lawn-mower', 'concert', 'baby-crying']);

export const getCommonSounds = (locale: Locale): LocalizedCommonSound[] => technical.map(([translationKey, typicalMinDb, typicalMaxDb, riskLevel, markerLane, rangeSourceId]) => {
  const localized = text[locale][translationKey];
  const { referenceContext, ...localizedSound } = localized;
  const translation = translationFor(translationKey);
  const articleSlug = translation?.[locale];
  const rangeReference: LocalizedCommonSound['rangeReference'] = rangeSourceId && referenceContext
    ? { context: referenceContext, sourceId: rangeSourceId, source: soundRangeSources[rangeSourceId] }
    : undefined;
  return {
    translationKey, locale, ...localizedSound, typicalMinDb, typicalMaxDb, riskLevel, markerLane,
    rangeReference,
    articleRoute: publishedKeys.has(translationKey) && articleSlug ? routeForContent(locale, 'sounds', articleSlug) : undefined,
  };
});

export const commonSounds = getCommonSounds('en');
export const findCommonSound = (slug: string, locale: Locale = 'en') => getCommonSounds(locale).find((sound) => sound.slug === slug);
