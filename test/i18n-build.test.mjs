import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { getCommonSounds } from '../src/data/sounds.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const contentRoot = join(root, 'src', 'content');
const dist = join(root, 'dist');
const markdownFiles = (collection, locale) => readdirSync(join(contentRoot, collection, locale)).filter((name) => name.endsWith('.md')).map((name) => join(contentRoot, collection, locale, name));
const field = (source, name) => source.match(new RegExp(`^${name}:\\s*["']?([^"'\\r\\n]+)`, 'm'))?.[1]?.trim();
const germanMathArticles = [
  'db-und-dba-unterschied.md',
  'laermexpositionsgrenzen-deutschland-eu.md',
  'sind-3-db-doppelt-so-laut.md',
  'warum-ist-die-dezibelskala-logarithmisch.md',
  'warum-sind-85-db-wichtig.md',
  'was-ist-ein-dezibel.md',
  'was-ist-eine-laermdosis.md',
  'was-ist-schalldruckpegel.md',
  'wie-lange-85-db-hoeren.md',
];
const routeExists = (href) => {
  const pathname = href.split(/[?#]/)[0];
  if (pathname === '/') return existsSync(join(dist, 'index.html'));
  const target = join(dist, ...pathname.split('/').filter(Boolean));
  return existsSync(join(target, 'index.html')) || (/\.[^/]+$/.test(pathname) && existsSync(target));
};

test('published German math articles use supported delimiters', () => {
  for (const name of germanMathArticles) {
    const path = join(contentRoot, 'articles', 'de', name);
    assert.ok(existsSync(path), path);
    const source = readFileSync(path, 'utf8')
      .replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, '')
      .replace(/`[^`\r\n]*`/g, '');
    assert.doesNotMatch(source, /\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/, path);
  }
});

test('contains 15+15 articles and 5+5 sound guides with complete translation pairs', () => {
  assert.equal(markdownFiles('articles', 'en').length, 15);
  assert.equal(markdownFiles('articles', 'de').length, 15);
  assert.equal(markdownFiles('sounds', 'en').length, 5);
  assert.equal(markdownFiles('sounds', 'de').length, 5);
  for (const collection of ['articles', 'sounds']) {
    const entries = ['en', 'de'].flatMap((locale) => markdownFiles(collection, locale).map((path) => ({ locale, path, source: readFileSync(path, 'utf8') })));
    const pairs = new Map();
    const localeSlugs = new Set();
    for (const entry of entries) {
      assert.equal(field(entry.source, 'locale'), entry.locale);
      const key = field(entry.source, 'translationKey'); const slug = field(entry.source, 'slug');
      assert.ok(key && slug && field(entry.source, 'clusterKey'));
      assert.ok(!localeSlugs.has(`${entry.locale}:${slug}`), `duplicate ${entry.locale}:${slug}`);
      localeSlugs.add(`${entry.locale}:${slug}`);
      pairs.set(key, [...(pairs.get(key) ?? []), entry.locale]);
    }
    for (const [key, locales] of pairs) assert.deepEqual(locales.sort(), ['de', 'en'], key);
  }
});

test('German content has no placeholders or root-English internal content links', () => {
  const files = [...markdownFiles('articles', 'de'), ...markdownFiles('sounds', 'de')];
  for (const path of files) {
    const source = readFileSync(path, 'utf8');
    assert.doesNotMatch(source, /\[Interner Link geplant/i, path);
    assert.doesNotMatch(source, /\]\(\/(?:articles|sounds|tools)\//, path);
    for (const match of source.matchAll(/\]\((\/de\/[^)#?]+\/?)(?:#[^)]+)?\)/g)) assert.ok(routeExists(match[1]), `${path}: ${match[1]}`);
  }
});

test('localized sound technical data is identical and ordered', () => {
  const en = getCommonSounds('en'); const de = getCommonSounds('de');
  assert.equal(en.length, 9); assert.equal(de.length, 9);
  assert.deepEqual(en.map(({ translationKey, typicalMinDb, typicalMaxDb, riskLevel, markerLane }) => ({ translationKey, typicalMinDb, typicalMaxDb, riskLevel, markerLane })), de.map(({ translationKey, typicalMinDb, typicalMaxDb, riskLevel, markerLane }) => ({ translationKey, typicalMinDb, typicalMaxDb, riskLevel, markerLane })));
});

test('baseline English and planned German routes exist', () => {
  const baseline = ['/', '/articles/', '/sounds/', '/tools/', '/tools/add-decibels/', '/tools/decibel-distance/', '/tools/noise-dose-calculator/', '/tools/safe-listening-time-calculator/', ...markdownFiles('articles', 'en').map((path) => `/articles/${field(readFileSync(path, 'utf8'), 'slug')}/`), ...markdownFiles('sounds', 'en').map((path) => `/sounds/${field(readFileSync(path, 'utf8'), 'slug')}/`)];
  const german = ['/de/artikel/', '/de/alltagsgeraeusche/', '/de/werkzeuge/', '/de/werkzeuge/expositionsdauer-rechner/', '/de/werkzeuge/laermexpositionsrechner/', '/de/werkzeuge/schallpegel-entfernung/', '/de/werkzeuge/dezibel-addieren/', ...markdownFiles('articles', 'de').map((path) => `/de/artikel/${field(readFileSync(path, 'utf8'), 'slug')}/`), ...markdownFiles('sounds', 'de').map((path) => `/de/alltagsgeraeusche/${field(readFileSync(path, 'utf8'), 'slug')}/`)];
  for (const route of [...baseline, ...german]) assert.ok(routeExists(route), route);
  for (const obsolete of ['/de/', '/de/articles/', '/de/sounds/']) assert.equal(routeExists(obsolete), false, obsolete);
});

test('English and German exposure-time pages share the same page and calculator structure', () => {
  const en = readFileSync(join(dist, 'tools', 'safe-listening-time-calculator', 'index.html'), 'utf8');
  const de = readFileSync(join(dist, 'de', 'werkzeuge', 'expositionsdauer-rechner', 'index.html'), 'utf8');
  for (const html of [en, de]) {
    assert.match(html, /class="calculator-page"/);
    assert.match(html, /data-exposure-calculator/);
    assert.match(html, /class="reference-grid"/);
  }
  assert.match(de, /L_EX,8h = 85 dB\(A\)/);
  assert.match(de, /Kein Sicherheitsversprechen/);
  assert.doesNotMatch(de, /100% NIOSH|Safe Exposure Time Calculator/);
});

test('German HTML uses de, a content-only header navigation, reciprocal alternates, and registered language switches', () => {
  const htmlFiles = [];
  const walk = (dir) => { for (const name of readdirSync(dir, { withFileTypes: true })) name.isDirectory() ? walk(join(dir, name.name)) : name.name === 'index.html' && htmlFiles.push(join(dir, name.name)); };
  walk(join(dist, 'de'));
  for (const path of htmlFiles) {
    const html = readFileSync(path, 'utf8');
    assert.match(html, /<html lang="de">/, path);
    assert.match(html, /<link rel="canonical" href="https:\/\/dbcheck\.app\/de\//, path);
    assert.match(html, /class="language-switcher"/, path);
    const header = html.match(/<header class="site-header">[\s\S]*?<\/header>/)?.[0] ?? '';
    const navigation = header.match(/<div class="nav-links"[^>]*>[\s\S]*?<\/div>/)?.[0] ?? '';
    assert.equal((navigation.match(/<a /g) ?? []).length, 2, path);
    assert.ok(navigation.indexOf('href="/de/werkzeuge/"') < navigation.indexOf('href="/de/artikel/"'), path);
    assert.doesNotMatch(navigation, /href="\/de\/"/, path);
    assert.doesNotMatch(navigation, /href="\/de\/(?:articles|sounds)\/"/, path);
    assert.doesNotMatch(header, /App auf Englisch/, path);
    assert.doesNotMatch(html, /App auf Englisch|App-Vorstellung auf Englisch|Zur englischen App-Seite/, path);
    assert.match(html, /<a href="mailto:contact@finnvek\.com">Kontakt<\/a>/, path);
    assert.doesNotMatch(html, /<span class="footer-label">Kontakt<\/span>|>contact@finnvek\.com</, path);
    assert.match(html, /<a href="https:\/\/finnvek\.com">Finnvek<\/a>/, path);
  }
  const articleEn = readFileSync(join(dist, 'articles', 'what-is-a-decibel', 'index.html'), 'utf8');
  const homeEn = readFileSync(join(dist, 'index.html'), 'utf8');
  assert.doesNotMatch(homeEn, /class="language-switcher"/);
  const englishFooter = homeEn.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0] ?? '';
  assert.doesNotMatch(englishFooter, /Sound Library|href="\/sounds\//);
  assert.match(englishFooter, /<a href="https:\/\/finnvek\.com">Finnvek<\/a>/);
  const articleDe = readFileSync(join(dist, 'de', 'artikel', 'was-ist-ein-dezibel', 'index.html'), 'utf8');
  assert.match(articleDe, /<a class="wordmark" href="\/"/);
  assert.match(articleDe, /<li[^>]*><a href="\/"[^>]*>Startseite<\/a><\/li>/);
  assert.match(articleEn, /hreflang="de-DE" href="https:\/\/dbcheck\.app\/de\/artikel\/was-ist-ein-dezibel\/"/);
  assert.match(articleDe, /hreflang="en-GB" href="https:\/\/dbcheck\.app\/articles\/what-is-a-decibel\/"/);
  assert.match(articleDe, /hreflang="x-default" href="https:\/\/dbcheck\.app\/articles\/what-is-a-decibel\/"/);
  assert.match(articleEn, /class="language-trigger"[\s\S]*?<span[^>]*>EN<\/span>/);
  assert.match(articleEn, /href="\/de\/artikel\/was-ist-ein-dezibel\/"/);
  assert.match(articleDe, /class="language-trigger"[\s\S]*?<span[^>]*>DE<\/span>/);
  assert.match(articleDe, /href="\/articles\/what-is-a-decibel\/"/);
});

test('language switch appears outside the homepage with real targets and no fabricated translation metadata', () => {
  const registeredTool = readFileSync(join(dist, 'tools', 'daily-noise-exposure-level-calculator', 'index.html'), 'utf8');
  const registeredToolDe = readFileSync(join(dist, 'de', 'werkzeuge', 'laermexpositionsrechner', 'index.html'), 'utf8');
  const unregisteredTool = readFileSync(join(dist, 'tools', 'noise-dose-calculator', 'index.html'), 'utf8');
  const home = readFileSync(join(dist, 'index.html'), 'utf8');
  for (const html of [registeredTool, registeredToolDe]) assert.match(html, /class="language-switcher"/);
  const fallbackSwitcher = unregisteredTool.match(/<div class="language-switcher"[\s\S]*?<\/div>/)?.[0] ?? '';
  assert.match(fallbackSwitcher, /href="\/de\/werkzeuge\/"/);
  for (const html of [unregisteredTool, home]) {
    const head = html.match(/<head>[\s\S]*?<\/head>/)?.[0] ?? '';
    assert.doesNotMatch(head, /<link rel="alternate"/);
  }

  const htmlFiles = [];
  const walk = (dir) => { for (const name of readdirSync(dir, { withFileTypes: true })) name.isDirectory() ? walk(join(dir, name.name)) : name.name.endsWith('.html') && htmlFiles.push(join(dir, name.name)); };
  walk(dist);
  for (const path of htmlFiles) {
    const html = readFileSync(path, 'utf8');
    if (/<meta http-equiv="refresh"/.test(html)) continue;
    const switcher = html.match(/<div class="language-switcher"[\s\S]*?<\/div>/)?.[0];
    assert.equal(Boolean(switcher), path !== join(dist, 'index.html'), `${path}: language switcher`);
    if (!switcher) continue;
    for (const match of switcher.matchAll(/href="([^"]+)"/g)) assert.ok(routeExists(match[1]), `${path}: ${match[1]}`);
  }
});

test('sitemap uses localized pairs and contains no fabricated locale routes', () => {
  const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
  assert.match(sitemap, /de\/artikel\/was-ist-ein-dezibel\//);
  assert.match(sitemap, /hreflang="x-default" href="https:\/\/dbcheck\.app\/articles\/what-is-a-decibel\/"/);
  assert.doesNotMatch(sitemap, /\/de\/(?:de\/|tools\/|artikel\/what-is-a-decibel|alltagsgeraeusche\/baby-crying)/);
  assert.doesNotMatch(sitemap, /\/de\/(?:articles|sounds)\//);
  assert.doesNotMatch(sitemap, /search\.json/);
});
