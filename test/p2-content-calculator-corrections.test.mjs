import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { assertFreshBuild } from '../scripts/build-freshness.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
await assertFreshBuild({ root });
const read = (...parts) => readFileSync(join(root, ...parts), 'utf8');
const calculatorScript = read('src', 'scripts', 'tool-calculators.ts');
const exposureCalculator = read('src', 'components', 'ExposureCalculator.astro');
const noiseDoseCalculator = read('src', 'components', 'NoiseDoseCalculator.astro');
const noiseDoseLib = read('src', 'lib', 'noise-dose.ts');
const editorialPage = read('src', 'components', 'EditorialPage.astro');
const noiseDoseArticle = read('src', 'content', 'articles', 'en', 'what-is-noise-dose.md');
const actaTitle = 'Comparison between android applications and Class-I sound level meters in SPL measurement performance';
const oldActaTitle = 'Comparison between Android applications and Class-I sound level meter';
const actaUrl = 'https://acta-acustica.edpsciences.org/articles/aacus/full_html/2026/01/aacus250096/aacus250096.html';
const articleCta = (html) => html.match(/<aside class="article-cta"[\s\S]*?<\/aside>/)?.[0] ?? '';

test('source contract normalizes German number entry before native sanitization', () => {
  assert.match(calculatorScript, /const normalizeGermanNumberText = \(text: string\)/);
  assert.match(calculatorScript, /input\.addEventListener\('keydown',[\s\S]*event\.key === ','/);
  assert.match(calculatorScript, /input\.addEventListener\('beforeinput',[\s\S]*event\.data\?\.includes\(','\)/);
  assert.match(calculatorScript, /input\.addEventListener\('paste',[\s\S]*event\.clipboardData\?\.getData\('text'\)/);
});

test('source contract debounces a dedicated exposure-slider announcement', () => {
  assert.doesNotMatch(exposureCalculator, /class="calculator-result" role="status"/);
  assert.match(exposureCalculator, /data-exposure-announcement aria-live="polite" aria-atomic="true"/);
  assert.match(exposureCalculator, /slider\.addEventListener\('input', \(\) => update\(true\)\);\s*update\(\);/);
  assert.match(exposureCalculator, /announcementTimer = setTimeout\([\s\S]*}, 250\);/);
});

test('source template initializes the noise-dose SSR result with formatter-compatible text', () => {
  assert.match(noiseDoseCalculator, /<strong data-dose-output>100\.0%<\/strong>/);
});

test('source contract gates all four calculator families through native form validity', () => {
  assert.equal((calculatorScript.match(/form\.checkValidity\(\)/g) ?? []).length, 4);
  for (const initializer of [
    'initializeNoiseDoseCalculator',
    'initializeDistanceCalculator',
    'initializeAddDecibelsCalculator',
    'initializeDailyExposureCalculator',
  ]) {
    const start = calculatorScript.indexOf(`const ${initializer}`);
    const end = calculatorScript.indexOf('\nconst initialize', start + 1);
    const source = calculatorScript.slice(start, end === -1 ? undefined : end);
    assert.ok(start >= 0, initializer);
    assert.match(source, /form\.checkValidity\(\)/, initializer);
  }
});

test('source contract labels multi-row calculator remove buttons with their current row', () => {
  assert.match(calculatorScript, /removeButton\.setAttribute\('aria-label', `Remove exposure period \$\{index \+ 1\}`\)/);
  assert.match(calculatorScript, /`Schallpegel \$\{index \+ 1\} entfernen` : `Remove sound level \$\{index \+ 1\}`/);
  assert.match(calculatorScript, /`Arbeitsabschnitt \$\{index \+ 1\} entfernen` : `Remove work period \$\{index \+ 1\}`/);
});

test('source contract shares the pure-model row maximum and gates calculator results', () => {
  assert.match(calculatorScript, /import \{ calculateDailyNoiseExposure, MAX_PERIODS \}/);
  assert.match(calculatorScript, /import \{ calculateNoiseDose \} from '\.\.\/lib\/noise-dose\.ts';/);
  assert.match(calculatorScript, /const MAX_ROWS = MAX_PERIODS;/);
  assert.match(calculatorScript, /if \(!form\.checkValidity\(\)\)[\s\S]*dose = calculateNoiseDose\(periods\)/);
  assert.match(calculatorScript, /levels\.length < 2 \|\| levels\.length > MAX_ROWS \|\| !form\.checkValidity\(\)/);
});

test('source contract delegates noise-dose duration limits to the shared safe helper', () => {
  assert.match(noiseDoseLib, /import \{ isOverDailyDurationLimit, MAX_PERIODS \}/);
  assert.match(noiseDoseLib, /if \(isOverDailyDurationLimit\(periods\.reduce\(\(total, \{ hours \}\) => total \+ hours, 0\)\)\)/);
});

test('source contract delegates noise dose to the shared NIOSH duration model', () => {
  assert.match(noiseDoseLib, /import \{ calculateExposureHours \} from '\.\/exposure-time\.ts';/);
  assert.match(noiseDoseLib, /calculateExposureHours\(level, 'niosh'\)/);
  assert.doesNotMatch(calculatorScript, /8 \* Math\.pow\(2, \(85 - level\) \/ 3\)/);
});

test('source contract defines in-calculator focus restoration after row removal', () => {
  assert.match(calculatorScript, /const focusAfterRowRemoval = \(remainingRows:[\s\S]*targetButton && !targetButton\.disabled[\s\S]*else addButton\.focus\(\);/);
  assert.equal((calculatorScript.match(/focusAfterRowRemoval\(rows\(\), removedIndex,/g) ?? []).length, 3);
});

test('article source links directly to the published noise-dose calculator route', () => {
  assert.doesNotMatch(noiseDoseArticle, /planned Noise Dose Calculator/);
  assert.match(noiseDoseArticle, /\[Noise Dose Calculator\]\(\/tools\/noise-dose-calculator\/\)/);
});

test('EditorialPage source defines the German Android calibration CTA override by slug', () => {
  assert.match(editorialPage, /entry\.data\.slug === 'dezibel-messen-mit-android-handy' \? 'Kalibrierungsanleitung lesen' : 'Messanleitung lesen'/);
  assert.match(editorialPage, /entry\.data\.slug === 'dezibel-messen-mit-android-handy' \? '\/de\/artikel\/dezibel-app-kalibrieren\/' : '\/de\/artikel\/dezibel-messen-mit-android-handy\/'/);
});

test('EditorialPage source selects English CTAs by stable cluster keys', () => {
  assert.match(editorialPage, /entry\.data\.clusterKey === 'exposure'/);
  assert.match(editorialPage, /entry\.data\.clusterKey === 'smartphone'/);
  assert.doesNotMatch(editorialPage, /entry\.data\.contentCluster ===/);
});

test('German sound sources use the exact Acta title without changing its URL', () => {
  for (const name of ['konzert.md', 'rasenmaeher.md']) {
    const source = read('src', 'content', 'sounds', 'de', name);
    assert.equal(source.split(actaTitle).length - 1, 2, name);
    assert.doesNotMatch(source, new RegExp(oldActaTitle), name);
    assert.equal(source.split(actaUrl).length - 1, 3, name);
  }
});

test('generated noise-dose article contains the direct calculator link', () => {
  const html = read('dist', 'articles', 'what-is-noise-dose', 'index.html');
  assert.doesNotMatch(html, /planned Noise Dose Calculator/);
  assert.match(html, /<a href="\/tools\/noise-dose-calculator\/">Noise Dose Calculator<\/a>/);
});

test('generated contextual CTAs change only the German Android guide', () => {
  const measurement = articleCta(read('dist', 'de', 'artikel', 'dezibel-messen-mit-android-handy', 'index.html'));
  const calibration = articleCta(read('dist', 'de', 'artikel', 'dezibel-app-kalibrieren', 'index.html'));
  const english = articleCta(read('dist', 'articles', 'how-to-measure-decibels-with-android-phone', 'index.html'));
  assert.match(measurement, /href="\/de\/artikel\/dezibel-app-kalibrieren\/"[^>]*>Kalibrierungsanleitung lesen/);
  assert.doesNotMatch(measurement, /href="\/de\/artikel\/dezibel-messen-mit-android-handy\/"/);
  assert.match(calibration, /href="\/de\/artikel\/dezibel-messen-mit-android-handy\/"[^>]*>Messanleitung lesen/);
  assert.match(english, /href="\/#features"[^>]*>See dBcheck measurement features/);
});

test('generated German sound guides display the corrected Acta title', () => {
  for (const name of ['konzert', 'rasenmaeher']) {
    const html = read('dist', 'de', 'alltagsgeraeusche', name, 'index.html');
    assert.equal(html.split(actaTitle).length - 1, 1, name);
    assert.doesNotMatch(html, new RegExp(oldActaTitle), name);
    assert.ok(html.includes(`href="${actaUrl}"`), name);
  }
});
