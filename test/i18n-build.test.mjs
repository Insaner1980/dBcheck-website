import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import { assertFreshBuild } from '../scripts/build-freshness.mjs';
import { getCommonSounds, validateSoundIdentityUniqueness, validateSoundRanges } from '../src/data/sounds.ts';
import { socialImages } from '../src/data/social.ts';
import { getTools } from '../src/data/tools.ts';
import { contentTranslations, routePairs } from '../src/i18n/routes.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
await assertFreshBuild({ root });
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
const routeFile = (href) => {
  const pathname = href.split(/[?#]/)[0];
  if (pathname === '/') return join(dist, 'index.html');
  const target = join(dist, ...pathname.split('/').filter(Boolean));
  return /\.[^/]+$/.test(pathname) ? target : join(target, 'index.html');
};
const routeExists = (href) => existsSync(routeFile(href));
const publishedEditorialEntries = () => ['articles', 'sounds'].flatMap((collection) => ['en', 'de'].flatMap((locale) =>
  markdownFiles(collection, locale).map((path) => {
    const source = readFileSync(path, 'utf8');
    return {
      collection,
      locale,
      slug: field(source, 'slug'),
      translationKey: field(source, 'translationKey'),
      draft: field(source, 'draft') === 'true',
      path,
    };
  }).filter((entry) => !entry.draft),
));

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

test('editorial related cards retain same-locale Markdown link order in English and German', () => {
  const relatedHrefs = (html) => [...(html.match(/<section class="related"[\s\S]*?<\/section>/)?.[0] ?? '').matchAll(/<a href="([^"]+)"/g)].map((match) => match[1]);
  const cases = [
    [join(dist, 'articles', 'what-is-a-decibel', 'index.html'), [
      '/articles/why-is-the-decibel-scale-logarithmic/',
      '/articles/what-is-sound-pressure-level/',
      '/articles/db-vs-dba/',
      '/articles/is-3-db-twice-as-loud/',
    ]],
    [join(dist, 'de', 'artikel', 'was-ist-ein-dezibel', 'index.html'), [
      '/de/artikel/warum-ist-die-dezibelskala-logarithmisch/',
      '/de/artikel/was-ist-schalldruckpegel/',
      '/de/artikel/db-und-dba-unterschied/',
      '/de/artikel/sind-3-db-doppelt-so-laut/',
    ]],
  ];
  for (const [path, expected] of cases) {
    const html = readFileSync(path, 'utf8');
    assert.deepEqual(relatedHrefs(html), expected, path);
    for (const href of expected) assert.ok(routeExists(href), `${path}: ${href}`);
  }
});

test('editorial breadcrumbs, social-image alt text, and sound-guide Explorer copy are localized in built output', () => {
  const articleEn = readFileSync(join(dist, 'articles', 'what-is-a-decibel', 'index.html'), 'utf8');
  const articleDe = readFileSync(join(dist, 'de', 'artikel', 'was-ist-ein-dezibel', 'index.html'), 'utf8');
  assert.match(articleEn, /<nav class="breadcrumbs" aria-label="Breadcrumb"[^>]*>/);
  assert.match(articleDe, /<nav class="breadcrumbs" aria-label="Brotkrümelnavigation"[^>]*>/);

  const germanAlts = new Set(Object.values(socialImages).map(({ alt }) => alt.de));
  const englishAlts = new Set(Object.values(socialImages).map(({ alt }) => alt.en));
  const germanHtmlFiles = [];
  const walk = (dir) => { for (const entry of readdirSync(dir, { withFileTypes: true })) entry.isDirectory() ? walk(join(dir, entry.name)) : entry.name === 'index.html' && germanHtmlFiles.push(join(dir, entry.name)); };
  walk(join(dist, 'de'));
  for (const path of germanHtmlFiles) {
    const html = readFileSync(path, 'utf8');
    const ogAlt = html.match(/<meta property="og:image:alt" content="([^"]+)">/)?.[1];
    const twitterAlt = html.match(/<meta name="twitter:image:alt" content="([^"]+)">/)?.[1];
    assert.ok(ogAlt && germanAlts.has(ogAlt), `${path}: German og:image:alt`);
    assert.equal(twitterAlt, ogAlt, `${path}: matching twitter:image:alt`);
    assert.ok(!englishAlts.has(ogAlt), `${path}: no English social-image fallback`);
  }

  for (const slug of ['staubsauger', 'normales-gespraech', 'babygeschrei']) {
    const html = readFileSync(join(dist, 'de', 'alltagsgeraeusche', slug, 'index.html'), 'utf8');
    assert.match(html, /Alltagsgeräusche-Explorer/);
    assert.doesNotMatch(html, /Common Sounds Explorer/);
  }
});

test('built sound-index overview images reserve space and load eagerly at high priority', () => {
  for (const path of [join(dist, 'sounds', 'index.html'), join(dist, 'de', 'alltagsgeraeusche', 'index.html')]) {
    const html = readFileSync(path, 'utf8');
    const image = html.match(/<img\b[^>]*common-sounds-level-overview[^>]*>/)?.[0] ?? '';
    assert.match(image, /\bwidth="1672"/);
    assert.match(image, /\bheight="941"/);
    assert.match(image, /\bsrcset="[^"]+"/);
    assert.match(image, /\bsizes="[^"]+"/);
    assert.match(image, /\bloading="eager"/);
    assert.match(image, /\bfetchpriority="high"/);
  }
});

test('localized sound technical data is identical and ordered', () => {
  const en = getCommonSounds('en'); const de = getCommonSounds('de');
  assert.equal(en.length, 9); assert.equal(de.length, 9);
  assert.deepEqual(en.map(({ translationKey, typicalMinDb, typicalMaxDb, riskLevel, markerLane }) => ({ translationKey, typicalMinDb, typicalMaxDb, riskLevel, markerLane })), de.map(({ translationKey, typicalMinDb, typicalMaxDb, riskLevel, markerLane }) => ({ translationKey, typicalMinDb, typicalMaxDb, riskLevel, markerLane })));
});

test('localized sound identities reject duplicate keys, slugs, and article routes', () => {
  const base = { translationKey: 'one', slug: 'one', articleRoute: '/sounds/one/' };
  for (const [field, duplicate] of [
    ['translationKey', { translationKey: 'one', slug: 'two', articleRoute: '/sounds/two/' }],
    ['slug', { translationKey: 'two', slug: 'one', articleRoute: '/sounds/two/' }],
    ['articleRoute', { translationKey: 'two', slug: 'two', articleRoute: '/sounds/one/' }],
  ]) {
    assert.throws(
      () => validateSoundIdentityUniqueness('en', [base, duplicate]),
      new RegExp(`Duplicate en sound ${field}`),
    );
  }
});

test('localized sound ranges reject non-finite, reversed, and out-of-scale values', () => {
  const sound = (typicalMinDb, typicalMaxDb) => ({ translationKey: 'example', typicalMinDb, typicalMaxDb });
  assert.doesNotThrow(() => validateSoundRanges('en', [sound(0, 130)]));
  assert.throws(() => validateSoundRanges('en', [sound(Number.NaN, 50)]), /Non-finite en sound range/);
  assert.throws(() => validateSoundRanges('en', [sound(40, Number.POSITIVE_INFINITY)]), /Non-finite en sound range/);
  assert.throws(() => validateSoundRanges('en', [sound(60, 50)]), /Reversed en sound range/);
  assert.throws(() => validateSoundRanges('en', [sound(-1, 50)]), /Out-of-scale en sound range/);
  assert.throws(() => validateSoundRanges('en', [sound(40, 131)]), /Out-of-scale en sound range/);
});

test('route registry covers every published translation pair and bilingual tool/index pair exactly once', () => {
  const registeredRoutes = routePairs.flatMap(({ en, de }) => [en, de]);
  assert.equal(registeredRoutes.length, 54);
  assert.equal(new Set(registeredRoutes).size, 54);
  for (const route of registeredRoutes) assert.ok(routeExists(route), route);

  const publishedEntries = publishedEditorialEntries();
  const entryByKey = new Map();
  for (const entry of publishedEntries) {
    const key = `${entry.collection}\u0000${entry.locale}\u0000${entry.slug}`;
    assert.ok(entry.slug && entry.translationKey, entry.path);
    assert.ok(!entryByKey.has(key), `duplicate editorial entry ${key}`);
    entryByKey.set(key, entry);
  }

  const translationEntryKeys = [];
  for (const translation of contentTranslations) {
    for (const locale of ['en', 'de']) {
      const slug = translation[locale];
      const key = `${translation.collection}\u0000${locale}\u0000${slug}`;
      const entry = entryByKey.get(key);
      assert.ok(entry, `missing ${key}`);
      assert.equal(entry.translationKey, translation.translationKey, key);
      translationEntryKeys.push(key);
    }
  }
  assert.deepEqual([...new Set(translationEntryKeys)].sort(), [...entryByKey.keys()].sort());

  const englishTools = getTools('en');
  const germanToolsById = new Map(getTools('de').map((tool) => [tool.id, tool]));
  const bilingualToolIds = [];
  for (const englishTool of englishTools) {
    const germanTool = germanToolsById.get(englishTool.id);
    if (!germanTool) continue;
    bilingualToolIds.push(englishTool.id);
    assert.ok(routePairs.some((pair) => pair.en === englishTool.href && pair.de === germanTool.href), englishTool.id);
  }
  assert.deepEqual(bilingualToolIds, ['safe-exposure-time', 'daily-noise-exposure', 'common-sounds', 'decibel-distance', 'add-decibels']);
  assert.deepEqual(englishTools.filter((tool) => !germanToolsById.has(tool.id)).map((tool) => tool.id), ['noise-dose']);
  assert.deepEqual(getTools('de').filter((tool) => !englishTools.some((candidate) => candidate.id === tool.id)), []);

  for (const [en, de] of [
    ['/articles/', '/de/artikel/'],
    ['/sounds/', '/de/alltagsgeraeusche/'],
    ['/tools/', '/de/werkzeuge/'],
  ]) assert.ok(routePairs.some((pair) => pair.en === en && pair.de === de), `${en} -> ${de}`);
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

test('German HTML uses de, localized navigation and footer links, reciprocal alternates, and no visible language switch', () => {
  const htmlFiles = [];
  const walk = (dir) => { for (const name of readdirSync(dir, { withFileTypes: true })) name.isDirectory() ? walk(join(dir, name.name)) : name.name === 'index.html' && htmlFiles.push(join(dir, name.name)); };
  walk(join(dist, 'de'));
  for (const path of htmlFiles) {
    const html = readFileSync(path, 'utf8');
    assert.match(html, /<html lang="de">/, path);
    assert.match(html, /<link rel="canonical" href="https:\/\/dbcheck\.app\/de\//, path);
    assert.doesNotMatch(html, /class="language-switcher"/, path);
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
    assert.match(html, /<span class="footer-label">Finnvek<\/span>/, path);
    assert.match(html, /<a href="https:\/\/finnvek\.com\/about\/">Über die Entwicklerin<\/a>/, path);
    assert.match(html, /<a href="https:\/\/finnvek\.com\/#apps">Weitere Apps<\/a>/, path);
  }
  const articleEn = readFileSync(join(dist, 'articles', 'what-is-a-decibel', 'index.html'), 'utf8');
  const homeEn = readFileSync(join(dist, 'index.html'), 'utf8');
  assert.doesNotMatch(homeEn, /class="language-switcher"/);
  const englishFooter = homeEn.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0] ?? '';
  assert.doesNotMatch(englishFooter, /Sound Library|href="\/sounds\//);
  assert.doesNotMatch(englishFooter, /Coming soon to Google Play|Listen to the page/);
  assert.match(englishFooter, /<span class="footer-label">Finnvek<\/span>/);
  assert.match(englishFooter, /<a href="https:\/\/finnvek\.com\/about\/">About the maker<\/a>/);
  assert.match(englishFooter, /<a href="https:\/\/finnvek\.com\/#apps">Other apps<\/a>/);
  const articleDe = readFileSync(join(dist, 'de', 'artikel', 'was-ist-ein-dezibel', 'index.html'), 'utf8');
  assert.match(articleDe, /<a class="wordmark" href="\/"/);
  assert.match(articleDe, /<li[^>]*><a href="\/"[^>]*>Startseite<\/a><\/li>/);
  assert.match(articleEn, /hreflang="de-DE" href="https:\/\/dbcheck\.app\/de\/artikel\/was-ist-ein-dezibel\/"/);
  assert.match(articleDe, /hreflang="en-GB" href="https:\/\/dbcheck\.app\/articles\/what-is-a-decibel\/"/);
  assert.match(articleDe, /hreflang="x-default" href="https:\/\/dbcheck\.app\/articles\/what-is-a-decibel\/"/);
  assert.match(articleEn, /class="language-trigger"[\s\S]*?<span[^>]*>EN<\/span>/);
  assert.match(articleEn, /href="\/de\/artikel\/was-ist-ein-dezibel\/"/);
  assert.doesNotMatch(articleDe, /class="language-switcher"/);
});

test('language switch appears only on non-home English pages with real targets and no fabricated translation metadata', () => {
  const registeredTool = readFileSync(join(dist, 'tools', 'daily-noise-exposure-level-calculator', 'index.html'), 'utf8');
  const registeredToolDe = readFileSync(join(dist, 'de', 'werkzeuge', 'laermexpositionsrechner', 'index.html'), 'utf8');
  const unregisteredTool = readFileSync(join(dist, 'tools', 'noise-dose-calculator', 'index.html'), 'utf8');
  const home = readFileSync(join(dist, 'index.html'), 'utf8');
  assert.match(registeredTool, /class="language-switcher"/);
  assert.doesNotMatch(registeredToolDe, /class="language-switcher"/);
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
    const expected = path !== join(dist, 'index.html') && !path.startsWith(join(dist, 'de'));
    assert.equal(Boolean(switcher), expected, `${path}: language switcher`);
    if (!switcher) continue;
    for (const match of switcher.matchAll(/href="([^"]+)"/g)) assert.ok(routeExists(match[1]), `${path}: ${match[1]}`);
  }
});

test('language switch distinguishes direct translations from tools-index fallbacks', () => {
  const switcher = (path) => readFileSync(path, 'utf8').match(/<div class="language-switcher"[\s\S]*?<\/ul>\s*<\/div>/)?.[0] ?? '';
  const directEn = switcher(join(dist, 'articles', 'what-is-a-decibel', 'index.html'));
  const fallbackEn = switcher(join(dist, 'tools', 'noise-dose-calculator', 'index.html'));
  const fallback404En = switcher(join(dist, '404.html'));
  const fallback404De = switcher(join(dist, 'de', '404.html'));

  assert.match(directEn, /aria-label="Change language"/);
  assert.match(directEn, /href="\/de\/artikel\/was-ist-ein-dezibel\/"[\s\S]*?>Deutsch<\/span>/);
  assert.doesNotMatch(directEn, /Tools index|Werkzeugübersicht/);
  for (const html of [fallbackEn, fallback404En]) {
    assert.match(html, /aria-label="Language options: German opens the tools index"/);
    assert.match(html, /<span[^>]*>EN<\/span>/);
    assert.doesNotMatch(html, /DE TOOLS/);
    assert.match(html, /href="\/de\/werkzeuge\/"[\s\S]*?>Deutsch: <span lang="en"[^>]*>Tools index<\/span><\/span>/);
  }
  assert.equal(fallback404De, '');
});

test('language switch uses roving menuitem tab stops and marks its current language disabled', () => {
  const html = readFileSync(join(dist, 'articles', 'what-is-a-decibel', 'index.html'), 'utf8');
  const switcher = html.match(/<div class="language-switcher"[\s\S]*?<\/ul>\s*<\/div>/)?.[0] ?? '';
  const menuitems = [...switcher.matchAll(/<[^>]+role="menuitem"[^>]*>/g)].map(([element]) => element);

  assert.equal(menuitems.length, 2);
  for (const menuitem of menuitems) assert.match(menuitem, /tabindex="-1"/);
  assert.match(switcher, /role="menuitem" aria-current="page" aria-disabled="true" tabindex="-1"/);
});

test('language switch has a direct static counterpart link and keeps the enhanced trigger compact', () => {
  const switcher = (path) => readFileSync(path, 'utf8').match(/<div class="language-switcher"[\s\S]*?<\/ul>\s*<\/div>/)?.[0] ?? '';
  const direct = switcher(join(dist, 'articles', 'what-is-a-decibel', 'index.html'));
  const fallback = switcher(join(dist, 'tools', 'noise-dose-calculator', 'index.html'));
  const trigger = (html) => html.match(/<button class="language-trigger"[\s\S]*?<\/button>/)?.[0] ?? '';
  const staticLink = (html) => html.match(/<a class="language-static-link"[\s\S]*?<\/a>/)?.[0] ?? '';

  assert.match(direct, /<a class="language-static-link"[\s\S]*?href="\/de\/artikel\/was-ist-ein-dezibel\/"[\s\S]*?aria-label="Open German version"[\s\S]*?title="Open German version"/);
  assert.match(fallback, /<a class="language-static-link"[\s\S]*?href="\/de\/werkzeuge\/"[\s\S]*?aria-label="Open German tools index"[\s\S]*?title="Open German tools index"/);
  assert.match(staticLink(direct), /<span[^>]*>DE<\/span>/);
  assert.match(staticLink(fallback), /<span[^>]*>DE<\/span>/);
  assert.match(trigger(direct), /<span[^>]*>EN<\/span>/);
  assert.match(trigger(fallback), /<span[^>]*>EN<\/span>/);
  assert.doesNotMatch(trigger(fallback), /DE TOOLS/);
});

test('search indexes contain only generated internal URLs with valid fragment targets', () => {
  const idsByPage = new Map();
  const idsFor = (path) => {
    if (idsByPage.has(path)) return idsByPage.get(path);
    const ids = [];
    const visit = (node) => {
      for (const attribute of node.attrs ?? []) if (attribute.name === 'id') ids.push(attribute.value);
      for (const child of node.childNodes ?? []) visit(child);
    };
    visit(parse(readFileSync(path, 'utf8')));
    idsByPage.set(path, ids);
    return ids;
  };

  for (const indexPath of [join(dist, 'search.json'), join(dist, 'de', 'search.json')]) {
    for (const { url } of JSON.parse(readFileSync(indexPath, 'utf8'))) {
      const resolved = new URL(url, 'https://dbcheck.app');
      assert.equal(resolved.origin, 'https://dbcheck.app', `${indexPath}: external search URL ${url}`);
      const target = routeFile(`${resolved.pathname}${resolved.search}${resolved.hash}`);
      assert.ok(existsSync(target), `${indexPath}: ${url}`);
      const hash = resolved.hash.slice(1);
      if (!hash) continue;
      let fragment;
      try {
        fragment = decodeURIComponent(hash);
      } catch {
        assert.fail(`${indexPath}: invalid fragment encoding in ${url}`);
      }
      assert.equal(idsFor(target).filter((id) => id === fragment).length, 1, `${indexPath}: ${url}`);
    }
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
