export type SoundRiskLevel = 'everyday' | 'warning' | 'danger';
export type SoundMarkerLane = 'low' | 'middle' | 'top';

export interface CommonSound {
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

export const commonSounds: CommonSound[] = [
  {
    slug: 'whisper-decibels',
    name: 'Whisper',
    category: 'Voices',
    typicalMinDb: 25,
    typicalMaxDb: 35,
    measurementDistance: 'Close range; position affects the reading',
    soundType: 'Variable speech sound',
    shortDescription: 'A whisper is quiet at close range. Distance and room reflections can change the reading substantially.',
    exposureNote: 'Usually well below occupational exposure limits.',
    riskLevel: 'everyday',
    markerLane: 'low',
  },
  {
    slug: 'normal-conversation',
    name: 'Normal conversation',
    category: 'Voices',
    typicalMinDb: 55,
    typicalMaxDb: 75,
    measurementDistance: 'About 1 metre',
    soundType: 'Variable and intermittent speech',
    shortDescription: 'Normal conversation varies with vocal effort, distance, background noise and room acoustics.',
    exposureNote: 'Ordinary one-to-one conversation is generally not treated as a hearing hazard.',
    riskLevel: 'everyday',
    markerLane: 'top',
    articleRoute: '/sounds/normal-conversation/',
  },
  {
    slug: 'vacuum-cleaner',
    name: 'Vacuum cleaner',
    category: 'Home',
    typicalMinDb: 65,
    typicalMaxDb: 85,
    measurementDistance: 'Operator position or about 1 metre',
    soundType: 'Continuous but operating-state dependent',
    shortDescription: 'Vacuum cleaner readings change with the model, setting, floor, room and microphone position.',
    exposureNote: 'Duration matters more for repeated or occupational cleaning than for a short household task.',
    riskLevel: 'everyday',
    markerLane: 'low',
    articleRoute: '/sounds/vacuum-cleaner/',
  },
  {
    slug: 'busy-traffic-decibels',
    name: 'Busy traffic',
    category: 'Transport',
    typicalMinDb: 75,
    typicalMaxDb: 85,
    measurementDistance: 'Listener position must be stated',
    soundType: 'Variable environmental sound',
    shortDescription: 'Road traffic changes with vehicle mix, speed, distance and surrounding buildings.',
    exposureNote: 'Long or repeated exposure near the upper end deserves attention.',
    riskLevel: 'warning',
    markerLane: 'middle',
  },
  {
    slug: 'lawn-mower',
    name: 'Lawn mower',
    category: 'Garden',
    typicalMinDb: 86,
    typicalMaxDb: 96,
    measurementDistance: "Operator's hearing zone",
    soundType: 'Continuous with variable load',
    shortDescription: 'Powered mower levels vary with the machine, blade, load, terrain and operator position.',
    exposureNote: 'Levels in this range can accumulate occupational noise dose quickly.',
    riskLevel: 'warning',
    markerLane: 'low',
    articleRoute: '/sounds/lawn-mower/',
  },
  {
    slug: 'concert',
    name: 'Concert',
    category: 'Music',
    typicalMinDb: 85,
    typicalMaxDb: 105,
    measurementDistance: 'Audience or front-of-house position',
    soundType: 'Variable amplified music',
    shortDescription: 'Concert levels vary by audience position, loudspeaker layout, venue, programme and averaging period.',
    exposureNote: 'At higher average levels, a full occupational reference dose can accumulate rapidly.',
    riskLevel: 'danger',
    markerLane: 'middle',
    articleRoute: '/sounds/concert/',
  },
  {
    slug: 'baby-crying',
    name: 'Baby crying',
    category: 'Voices',
    typicalMinDb: 75,
    typicalMaxDb: 100,
    measurementDistance: 'Roughly 0.3 to 1 metre',
    soundType: 'Variable and intermittent vocal sound',
    shortDescription: 'Crying levels vary strongly with age, vocal effort, distance, room and whether average or maximum is reported.',
    exposureNote: 'A close loud cry and repeated exposure are different contexts; the reading cannot assess health.',
    riskLevel: 'warning',
    markerLane: 'top',
    articleRoute: '/sounds/baby-crying/',
  },
  {
    slug: 'siren-decibels',
    name: 'Siren',
    category: 'Warnings',
    typicalMinDb: 105,
    typicalMaxDb: 120,
    measurementDistance: 'Distance must be stated',
    soundType: 'Variable warning sound',
    shortDescription: 'Sirens are designed to remain audible over other sound and can be intense at close range.',
    exposureNote: 'Move away from the source when practical; distance strongly affects the level.',
    riskLevel: 'danger',
    markerLane: 'middle',
  },
  {
    slug: 'fireworks-decibels',
    name: 'Fireworks',
    category: 'Impulse sound',
    typicalMinDb: 120,
    typicalMaxDb: 150,
    measurementDistance: 'Distance and peak metric are essential',
    soundType: 'Impulse sound',
    shortDescription: 'Fireworks produce brief impulse peaks. Type, distance and surroundings create large variations.',
    exposureNote: 'Impulse sound is not well represented by a simple continuous-exposure estimate.',
    riskLevel: 'danger',
    markerLane: 'low',
  },
];

export const findCommonSound = (slug: string) => commonSounds.find((sound) => sound.slug === slug);
