import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { assertFreshBuild } from '../scripts/build-freshness.mjs';
import { getCommonSounds, soundRangeSources, validateSoundRangeReferences } from '../src/data/sounds.ts';
import { soundExplorerFallbackUrl, soundExplorerId } from '../src/i18n/routes.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
await assertFreshBuild({ root });
const read = (...parts) => readFileSync(join(root, ...parts), 'utf8');
const targets = {
  'whisper-decibels': { min: 25, max: 30, sourceId: 'whisperUsGs', en: 'Whisper', de: 'Flüstern' },
  'busy-traffic-decibels': { min: 73, max: 83, sourceId: 'busyTrafficBangkok', en: 'Busy traffic', de: 'Starker Straßenverkehr' },
  'siren-decibels': { min: 110, max: 129, sourceId: 'emergencySirenNidcd', en: 'Siren', de: 'Sirene' },
  'fireworks-decibels': { min: 100, max: 115, sourceId: 'aerialFireworksTanaka', en: 'Fireworks', de: 'Feuerwerk' },
};
const unaffectedRanges = {
  'normal-conversation': [55, 75],
  'vacuum-cleaner': [65, 85],
  'lawn-mower': [86, 96],
  concert: [85, 105],
  'baby-crying': [75, 100],
};
const sourceBlock = (html) => (html.match(/<details class="sound-sources"[^>]*>[\s\S]*?<\/details>/)?.[0] ?? '')
  .replace(/ data-astro-cid-[a-z0-9]+/g, '');

test('range-reference validation rejects inconsistent relationships and source metadata', () => {
  const validSource = { ...soundRangeSources.whisperUsGs };
  const sound = (source = validSource, overrides = {}) => ({
    translationKey: 'whisper-decibels',
    typicalMinDb: 25,
    typicalMaxDb: 30,
    rangeReference: { sourceId: 'fixture', source },
    ...overrides,
  });
  const validate = (source = validSource, entry = sound(source)) =>
    validateSoundRangeReferences('en', [entry], { fixture: source });

  assert.doesNotThrow(() => validate());
  assert.throws(() => validate({ ...validSource, supports: ['other'] }, sound({ ...validSource, supports: ['other'] })), /Unsupported en sound range source relationship/);
  assert.throws(() => validate(validSource, sound(validSource, { typicalMaxDb: 31 })), /Mismatched en sound display bounds/);
  assert.throws(() => validate({ ...validSource, reportedMinDb: 24 }), /Inconsistent reported and display bounds/);
  assert.throws(() => validate({ ...validSource, publicationDate: '2024-13' }), /Invalid sound range source dates/);
  assert.throws(() => validate({ ...validSource, revisionDate: '2020-01-01' }), /Invalid sound range source dates/);
  assert.throws(() => validate({ ...validSource, url: 'http://example.com/source' }), /Invalid sound range source URL/);
});

test('the four Explorer references are complete, central and shared by both locales', () => {
  const en = getCommonSounds('en');
  const de = getCommonSounds('de');

  assert.deepEqual(Object.keys(soundRangeSources).sort(), Object.values(targets).map(({ sourceId }) => sourceId).sort());
  for (const [translationKey, expected] of Object.entries(targets)) {
    const enSound = en.find((sound) => sound.translationKey === translationKey);
    const deSound = de.find((sound) => sound.translationKey === translationKey);
    assert.ok(enSound?.rangeReference, translationKey);
    assert.ok(deSound?.rangeReference, translationKey);
    assert.equal(enSound.rangeReference.source, deSound.rangeReference.source, translationKey);
    assert.equal(enSound.rangeReference.sourceId, expected.sourceId, translationKey);
    assert.deepEqual([enSound.typicalMinDb, enSound.typicalMaxDb], [expected.min, expected.max], translationKey);
    assert.deepEqual([deSound.typicalMinDb, deSound.typicalMaxDb], [expected.min, expected.max], translationKey);
    assert.ok(expected.min < expected.max, `${translationKey} must remain a range`);

    const source = soundRangeSources[expected.sourceId];
    assert.deepEqual(source.supports, [translationKey], translationKey);
    assert.equal(source.displayMinDb, expected.min, translationKey);
    assert.equal(source.displayMaxDb, expected.max, translationKey);
    assert.equal(Math.round(source.reportedMinDb), expected.min, translationKey);
    assert.equal(Math.round(source.reportedMaxDb), expected.max, translationKey);
    assert.equal(source.metric, 'dBA', translationKey);
    for (const field of ['credit', 'publisher', 'title', 'publicationDate']) assert.ok(source[field], `${translationKey}: ${field}`);
    const url = new URL(source.url);
    assert.equal(url.protocol, 'https:', source.url);
    assert.notEqual(url.hostname, 'dbcheck.app', source.url);
  }

  assert.match(en.find((sound) => sound.translationKey === 'fireworks-decibels').rangeReference.context, /Fast \(125 ms\).*about 100 metres.*not a true impulse-peak range/i);
  assert.match(de.find((sound) => sound.translationKey === 'fireworks-decibels').rangeReference.context, /Fast-Messung \(125 ms\).*100 Meter.*kein Bereich echter Impulsspitzen/i);
});

test('unrelated ranges and the five published guide links remain unchanged', () => {
  for (const locale of ['en', 'de']) {
    const sounds = getCommonSounds(locale);
    for (const [translationKey, range] of Object.entries(unaffectedRanges)) {
      const sound = sounds.find((item) => item.translationKey === translationKey);
      assert.deepEqual([sound.typicalMinDb, sound.typicalMaxDb], range, `${locale}:${translationKey}`);
      assert.equal(sound.rangeReference, undefined, `${locale}:${translationKey}`);
      assert.ok(sound.articleRoute, `${locale}:${translationKey}`);
    }
    for (const translationKey of Object.keys(targets)) {
      assert.equal(sounds.find((sound) => sound.translationKey === translationKey).articleRoute, undefined, `${locale}:${translationKey}`);
    }
    assert.equal(sounds.filter((sound) => sound.articleRoute).length, 5, locale);
  }
});

test('home and both sound indexes render localized, crawlable source disclosures', () => {
  const pages = [
    { locale: 'en', html: read('dist', 'index.html'), label: 'Sources for reference ranges', intro: 'These approximate ranges depend on distance, metric and measurement conditions.' },
    { locale: 'en', html: read('dist', 'sounds', 'index.html'), label: 'Sources for reference ranges', intro: 'These approximate ranges depend on distance, metric and measurement conditions.' },
    { locale: 'de', html: read('dist', 'de', 'alltagsgeraeusche', 'index.html'), label: 'Quellen zu den Referenzbereichen', intro: 'Diese Näherungsbereiche hängen von Abstand, Messgröße und Messbedingungen ab.' },
  ];

  for (const page of pages) {
    const block = sourceBlock(page.html);
    assert.ok(block, page.locale);
    assert.ok(block.includes(`<summary>${page.label}</summary>`), page.locale);
    assert.ok(block.includes(page.intro), page.locale);
    assert.doesNotMatch(block, /role="dialog"|data-tooltip|title="/i, page.locale);
    const anchors = [...block.matchAll(/<a href="([^"]+)">/g)].map((match) => match[1]);
    assert.deepEqual(anchors, Object.values(soundRangeSources).map((source) => source.url), page.locale);

    for (const [translationKey, expected] of Object.entries(targets)) {
      const source = soundRangeSources[expected.sourceId];
      const name = expected[page.locale];
      assert.ok(block.includes(`<strong>${name}: ${expected.min}–${expected.max} ${source.metric}.</strong>`), `${page.locale}:${translationKey}`);
      assert.ok(block.includes(`href="${source.url}"`), `${page.locale}:${translationKey}`);
      assert.ok(block.includes(`<cite>${source.title}</cite>`), `${page.locale}:${translationKey}`);
    }

    assert.ok(page.html.includes(page.locale === 'de'
      ? 'Typische Bereiche variieren mit Abstand, Umgebung, Quelle und Messmethode.'
      : 'Typical ranges vary with distance, environment, source and measurement method.'));
  }
});

test('source-only sounds stay in the Explorer and search without becoming guide routes', () => {
  const redirects = read('public', '_redirects');
  const searches = {
    en: JSON.parse(read('dist', 'search.json')),
    de: JSON.parse(read('dist', 'de', 'search.json')),
  };
  const libraryPages = {
    en: read('dist', 'sounds', 'index.html'),
    de: read('dist', 'de', 'alltagsgeraeusche', 'index.html'),
  };

  for (const [translationKey, expected] of Object.entries(targets)) {
    const source = soundRangeSources[expected.sourceId];
    assert.ok(!redirects.includes(source.url), source.url);
    for (const locale of ['en', 'de']) {
      const entry = searches[locale].find((item) => item.title === expected[locale]);
      assert.ok(entry, `${locale}:${translationKey}`);
      assert.equal(entry.kind, locale === 'de' ? 'Geräusch' : 'sound explorer');
      assert.match(entry.description, new RegExp(`${expected.min}–${expected.max} dB`));
      assert.equal(entry.url, soundExplorerFallbackUrl(locale));
      assert.ok(libraryPages[locale].includes(`id="${soundExplorerId}"`), `${locale}: fallback fragment target`);
    }
  }
});
