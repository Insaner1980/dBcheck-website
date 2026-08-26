import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, isAbsolute, join, relative, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter } from '@astrojs/markdown-remark';
import { parse } from 'parse5';

const root = fileURLToPath(new URL('..', import.meta.url));
const contentRoot = join(root, 'src', 'content');
const dist = join(root, 'dist');
const assetDirectory = join(dist, '_astro');
const site = 'https://dbcheck.app';

const expectedFormulaCounts = new Map([
  ['/articles/how-long-can-you-listen-at-85-db/', 5],
  ['/articles/how-to-calibrate-a-decibel-meter-app/', 2],
  ['/articles/is-3-db-twice-as-loud/', 5],
  ['/articles/niosh-vs-osha-noise-exposure-limits/', 5],
  ['/articles/what-is-noise-dose/', 9],
  ['/articles/what-is-sound-pressure-level/', 4],
  ['/articles/why-is-the-decibel-scale-logarithmic/', 2],
  ['/de/artikel/db-und-dba-unterschied/', 7],
  ['/de/artikel/dezibel-app-kalibrieren/', 2],
  ['/de/artikel/laermexpositionsgrenzen-deutschland-eu/', 1],
  ['/de/artikel/sind-3-db-doppelt-so-laut/', 6],
  ['/de/artikel/warum-ist-die-dezibelskala-logarithmisch/', 4],
  ['/de/artikel/warum-sind-85-db-wichtig/', 1],
  ['/de/artikel/was-ist-ein-dezibel/', 5],
  ['/de/artikel/was-ist-eine-laermdosis/', 3],
  ['/de/artikel/was-ist-schalldruckpegel/', 10],
  ['/de/artikel/wie-lange-85-db-hoeren/', 1],
]);

const walkFiles = (directory, accept, files = []) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walkFiles(path, accept, files);
    else if (accept(path)) files.push(path);
  }
  return files;
};

const attributes = (node) => Object.fromEntries((node.attrs ?? []).map(({ name, value }) => [name, value]));
const textContent = (node) => node.nodeName === '#text'
  ? node.value
  : (node.childNodes ?? []).map(textContent).join('');
const hasClass = (node, className) => (attributes(node).class ?? '').split(/\s+/).includes(className);

const inspectHtml = (path) => {
  const document = parse(readFileSync(path, 'utf8'));
  const result = {
    title: '',
    description: '',
    canonical: [],
    alternates: [],
    h1: 0,
    editorial: false,
    katex: 0,
    mathml: 0,
    annotations: 0,
    stylesheets: [],
    headStylesheets: [],
    schemas: [],
    robots: [],
  };
  let inHead = false;
  const visit = (node) => {
    const attrs = attributes(node);
    if (node.nodeName === 'head') inHead = true;
    if (node.nodeName === 'title') result.title = textContent(node);
    if (node.nodeName === 'meta' && attrs.name === 'description') result.description = attrs.content ?? '';
    if (node.nodeName === 'meta' && attrs.name === 'robots') result.robots.push(attrs.content ?? '');
    if (node.nodeName === 'link' && (attrs.rel ?? '').split(/\s+/).includes('canonical')) result.canonical.push(attrs.href);
    if (node.nodeName === 'link' && (attrs.rel ?? '').split(/\s+/).includes('alternate') && attrs.hreflang) {
      result.alternates.push({ locale: attrs.hreflang, href: attrs.href });
    }
    if (node.nodeName === 'link' && (attrs.rel ?? '').split(/\s+/).includes('stylesheet') && attrs.href) {
      result.stylesheets.push(attrs.href);
      if (inHead) result.headStylesheets.push(attrs.href);
    }
    if (node.nodeName === 'h1') result.h1 += 1;
    if (node.nodeName === 'article' && hasClass(node, 'editorial')) result.editorial = true;
    if (hasClass(node, 'katex')) result.katex += 1;
    if (node.nodeName === 'math') result.mathml += 1;
    if (node.nodeName === 'annotation' && attrs.encoding === 'application/x-tex') result.annotations += 1;
    if (node.nodeName === 'script' && attrs.type === 'application/ld+json') {
      result.schemas.push(JSON.parse(textContent(node)));
    }
  };
  const traverse = (node) => {
    const wasInHead = inHead;
    visit(node);
    for (const child of node.childNodes ?? []) traverse(child);
    if (node.content) traverse(node.content);
    inHead = wasInHead;
  };
  traverse(document);
  return result;
};

const editorialEntries = () => {
  const entries = [];
  for (const collection of ['articles', 'sounds']) {
    for (const locale of ['en', 'de']) {
      const directory = join(contentRoot, collection, locale);
      for (const name of readdirSync(directory).filter((item) => item.endsWith('.md')).sort()) {
        const sourcePath = join(directory, name);
        const { frontmatter } = parseFrontmatter(readFileSync(sourcePath, 'utf8'));
        if (frontmatter.draft === true) continue;
        const segment = locale === 'en'
          ? collection
          : collection === 'articles' ? 'artikel' : 'alltagsgeraeusche';
        const route = locale === 'en'
          ? `/${segment}/${frontmatter.slug}/`
          : `/de/${segment}/${frontmatter.slug}/`;
        entries.push({ route, frontmatter });
      }
    }
  }
  return entries.sort((left, right) => left.route.localeCompare(right.route));
};

const htmlPathForRoute = (route) => route === '/'
  ? join(dist, 'index.html')
  : join(dist, ...route.split('/').filter(Boolean), 'index.html');

const routeForHtmlPath = (path) => {
  const outputPath = relative(dist, path).replaceAll('\\', '/');
  if (outputPath === 'index.html') return '/';
  if (outputPath === '404.html') return '/404.html';
  return `/${outputPath.replace(/index\.html$/, '')}`;
};

const localAssetName = (href) => basename(new URL(href, site).pathname);

test('editorial routes load KaTeX CSS exactly when generated math is present', () => {
  const entries = editorialEntries();
  assert.equal(entries.length, 40);

  const cssFiles = readdirSync(assetDirectory).filter((name) => name.endsWith('.css'));
  const katexCssAssets = cssFiles.filter((name) => {
    const css = readFileSync(join(assetDirectory, name), 'utf8');
    return css.includes('@font-face') && css.includes('font-family:KaTeX_Main') && css.includes('.katex');
  });
  assert.equal(katexCssAssets.length, 1, 'expected one generated KaTeX stylesheet asset');
  const katexCssAsset = katexCssAssets[0];

  const htmlFiles = walkFiles(dist, (path) => /(?:index|404)\.html$/.test(path));
  const generatedEditorialRoutes = [];
  const inspectedOutputs = new Map();
  for (const path of htmlFiles) {
    const route = routeForHtmlPath(path);
    const inspected = inspectHtml(path);
    inspectedOutputs.set(route, inspected);
    if (inspected.editorial) generatedEditorialRoutes.push(route);
  }
  assert.deepEqual(generatedEditorialRoutes.sort(), entries.map(({ route }) => route));

  for (const entry of entries) {
    const inspected = inspectedOutputs.get(entry.route);
    assert.ok(inspected, entry.route);
    const expectedFormulas = expectedFormulaCounts.get(entry.route) ?? 0;
    assert.deepEqual(
      { katex: inspected.katex, mathml: inspected.mathml, annotations: inspected.annotations },
      { katex: expectedFormulas, mathml: expectedFormulas, annotations: expectedFormulas },
      entry.route,
    );
    const katexLinks = inspected.stylesheets.filter((href) => localAssetName(href) === katexCssAsset);
    assert.equal(katexLinks.length, expectedFormulas > 0 ? 1 : 0, entry.route);
    assert.deepEqual(inspected.headStylesheets, inspected.stylesheets, `${entry.route}: stylesheet outside head`);
    assert.equal(new Set(inspected.stylesheets).size, inspected.stylesheets.length, `${entry.route}: duplicate stylesheet`);
  }

  for (const [route, inspected] of inspectedOutputs) {
    if (generatedEditorialRoutes.includes(route)) continue;
    assert.equal(
      inspected.stylesheets.filter((href) => localAssetName(href) === katexCssAsset).length,
      0,
      route,
    );
    assert.equal(inspected.katex, 0, route);
  }

  const katexCssPath = join(assetDirectory, katexCssAsset);
  assert.ok(statSync(katexCssPath).size > 0);
  const katexCss = readFileSync(katexCssPath, 'utf8');
  assert.doesNotMatch(katexCss, /url\(data:[^)]+\)|data:(?:font\/|application\/font)/i);
  const stylesheetUrl = new URL(`/_astro/${katexCssAsset}`, site);
  const fontUrls = [...katexCss.matchAll(/url\((?:"|')?([^"')]+)(?:"|')?\)/g)].map((match) => match[1]);
  assert.ok(fontUrls.length > 0, 'KaTeX stylesheet has no font URLs');
  for (const rawUrl of fontUrls) {
    const url = new URL(rawUrl, stylesheetUrl);
    assert.equal(url.origin, site, rawUrl);
    const outputPath = resolve(dist, `.${decodeURIComponent(url.pathname)}`);
    const relativePath = relative(dist, outputPath);
    assert.ok(relativePath && !relativePath.startsWith('..') && !isAbsolute(relativePath), rawUrl);
    assert.ok(existsSync(outputPath), rawUrl);
    assert.ok(statSync(outputPath).size > 0, rawUrl);
  }

  const headers = readFileSync(join(root, 'public', '_headers'), 'utf8');
  const csp = headers.match(/^\s*Content-Security-Policy:\s*(.+)$/m)?.[1]?.trim();
  assert.equal(
    csp,
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; media-src 'self'; connect-src 'self'; worker-src 'self'; upgrade-insecure-requests",
  );
});

test('conditional stylesheet loading preserves current route and editorial metadata contracts', () => {
  const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
  assert.equal(sitemapUrls.length, 56);
  assert.equal(new Set(sitemapUrls).size, sitemapUrls.length);

  const schemaCounts = new Map();
  const entriesByRoute = new Map(editorialEntries().map((entry) => [entry.route, entry]));
  for (const url of sitemapUrls) {
    const route = new URL(url).pathname;
    const inspected = inspectHtml(htmlPathForRoute(route));
    assert.ok(inspected.title, `${route}: title`);
    assert.ok(inspected.description, `${route}: description`);
    assert.deepEqual(inspected.canonical, [url], `${route}: canonical`);
    assert.equal(inspected.h1, 1, `${route}: h1`);
    for (const alternate of inspected.alternates) {
      assert.ok(sitemapUrls.includes(alternate.href), `${route}: ${alternate.href}`);
    }
    if (inspected.alternates.some(({ locale }) => locale === 'x-default')) {
      assert.ok(inspected.alternates.some(({ locale }) => locale === 'en-GB'), route);
      assert.ok(inspected.alternates.some(({ locale }) => locale === 'de-DE'), route);
    }
    for (const schema of inspected.schemas) {
      schemaCounts.set(schema['@type'], (schemaCounts.get(schema['@type']) ?? 0) + 1);
    }
    const entry = entriesByRoute.get(route);
    if (entry) {
      assert.equal(inspected.title, `${entry.frontmatter.title} | dBcheck`, route);
      assert.equal(inspected.description, entry.frontmatter.description, route);
      const articleSchema = inspected.schemas.find((schema) => schema['@type'] === 'Article');
      assert.ok(articleSchema, route);
      const publishedAt = new Date(entry.frontmatter.publishedAt);
      const lastReviewed = new Date(entry.frontmatter.lastReviewed);
      assert.equal(articleSchema.datePublished, publishedAt.toISOString(), route);
      assert.equal(articleSchema.dateModified, new Date(Math.max(publishedAt.getTime(), lastReviewed.getTime())).toISOString(), route);
    }
  }
  assert.deepEqual(Object.fromEntries([...schemaCounts].sort()), {
    Article: 40,
    BreadcrumbList: 40,
    WebSite: 1,
  });

  const htmlOutputs = walkFiles(dist, (path) => /(?:index|404)\.html$/.test(path));
  assert.equal(htmlOutputs.length, 65);
  assert.equal(htmlOutputs.length - sitemapUrls.length - 1, 8);

  const notFound = inspectHtml(join(dist, '404.html'));
  assert.deepEqual(notFound.robots, ['noindex']);
  assert.equal(sitemapUrls.some((url) => new URL(url).pathname.includes('404')), false);
  for (const path of [join(dist, 'search.json'), join(dist, 'de', 'search.json')]) {
    const searchEntries = JSON.parse(readFileSync(path, 'utf8'));
    assert.equal(searchEntries.some((entry) => String(entry.url ?? entry.href ?? '').includes('/404')), false, path);
  }
});
