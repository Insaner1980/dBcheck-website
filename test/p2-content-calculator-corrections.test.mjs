import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = (...parts) => readFileSync(join(root, ...parts), 'utf8');
const calculatorScript = read('src', 'scripts', 'tool-calculators.ts');
const editorialPage = read('src', 'components', 'EditorialPage.astro');
const noiseDoseArticle = read('src', 'content', 'articles', 'en', 'what-is-noise-dose.md');
const actaTitle = 'Comparison between android applications and Class-I sound level meters in SPL measurement performance';
const oldActaTitle = 'Comparison between Android applications and Class-I sound level meter';
const actaUrl = 'https://acta-acustica.edpsciences.org/articles/aacus/full_html/2026/01/aacus250096/aacus250096.html';
const articleCta = (html) => html.match(/<aside class="article-cta"[\s\S]*?<\/aside>/)?.[0] ?? '';

test('all four calculator families gate calculation through native form validity', () => {
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

test('noise-dose article links directly to the published calculator', () => {
  assert.doesNotMatch(noiseDoseArticle, /planned Noise Dose Calculator/);
  assert.match(noiseDoseArticle, /\[Noise Dose Calculator\]\(\/tools\/noise-dose-calculator\/\)/);
});

test('German Android guide has a slug-based calibration CTA override', () => {
  assert.match(editorialPage, /entry\.data\.slug === 'dezibel-messen-mit-android-handy' \? 'Kalibrierungsanleitung lesen' : 'Messanleitung lesen'/);
  assert.match(editorialPage, /entry\.data\.slug === 'dezibel-messen-mit-android-handy' \? '\/de\/artikel\/dezibel-app-kalibrieren\/' : '\/de\/artikel\/dezibel-messen-mit-android-handy\/'/);
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
