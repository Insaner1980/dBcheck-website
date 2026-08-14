/**
 * dBcheckin näyttöasteikko (0–130 dB) ja sen tasoluokat.
 * Yksi lähde kaikelle asteikkoon sidotulle liikkeelle ja väritykselle:
 * hero-mittari ja altistumiskisko lukevat rajansa täältä.
 */

export type DisplayLevel = 'quiet' | 'normal' | 'elevated' | 'dangerous';

/** Näyttöasteikon yläraja. Sama arvo kuin sovelluksen mittarissa. */
export const DISPLAY_MAX_DB = 130;

/** Ylempi altistumisen raja-arvo, joka merkitään asteikolle omalla viivallaan. */
export const EXPOSURE_LIMIT_DB = 85;

/** Asteikon merkkiviivat samassa järjestyksessä kuin Sound Explorerissa. */
export const DISPLAY_TICKS = [0, 40, 70, EXPOSURE_LIMIT_DB, 100, DISPLAY_MAX_DB] as const;

const LEVEL_THRESHOLDS: readonly (readonly [number, DisplayLevel])[] = [
  [55, 'quiet'],
  [70, 'normal'],
  [EXPOSURE_LIMIT_DB, 'elevated'],
];

/** Palauttaa desibeliarvon tasoluokan. Rajat vastaavat sovelluksen mittarin väritystä. */
export function levelForDb(db: number): DisplayLevel {
  for (const [limit, level] of LEVEL_THRESHOLDS) {
    if (db < limit) return level;
  }
  return 'dangerous';
}

/** Muuntaa desibeliarvon näyttöasteikon prosenttiosuudeksi (0–100). */
export function scalePercent(db: number): number {
  return (Math.min(Math.max(db, 0), DISPLAY_MAX_DB) / DISPLAY_MAX_DB) * 100;
}
