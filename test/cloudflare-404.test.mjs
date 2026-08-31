import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { assertFreshBuild } from '../scripts/build-freshness.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
await assertFreshBuild({ root });
const dist = join(root, 'dist');
const errorPath = join(dist, '404.html');
const germanErrorPath = join(dist, 'de', '404.html');
const germanErrorRoutePath = join(dist, 'de', '404', 'index.html');
const legacyRedirects = [
  ['/sounds/normal-conversation-decibels/', '/sounds/normal-conversation/'],
  ['/sounds/vacuum-cleaner-decibels/', '/sounds/vacuum-cleaner/'],
  ['/sounds/lawn-mower-decibels/', '/sounds/lawn-mower/'],
  ['/sounds/concert-decibels/', '/sounds/concert/'],
  ['/sounds/whisper-decibels/', '/sounds/'],
  ['/sounds/busy-traffic-decibels/', '/sounds/'],
  ['/sounds/siren-decibels/', '/sounds/'],
  ['/sounds/fireworks-decibels/', '/sounds/'],
];
const edgeRedirects = legacyRedirects.flatMap(([from, to]) => {
  assert.ok(from.endsWith('/'), `legacy redirect source must end in "/": ${from}`);
  return [
    [from.slice(0, -1), to],
    [from, to],
  ];
});
const htmlFiles = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith('.html') ? [path] : [];
});

test('checked-in Cloudflare config targets fresh localized 404 assets', () => {
  const wrangler = JSON.parse(readFileSync(join(root, 'wrangler.jsonc'), 'utf8'));
  assert.equal(wrangler.assets.directory, './dist');
  assert.equal(wrangler.assets.not_found_handling, '404-page');
  for (const path of [errorPath, germanErrorPath]) {
    assert.ok(existsSync(path), `${relative(root, path)} is missing`);
    assert.ok(statSync(path).size > 0, `${relative(root, path)} is empty`);
  }
  assert.ok(!existsSync(germanErrorRoutePath), 'dist/de/404/index.html must not become a public 200 route');
});

test('generated 404 HTML has safe metadata, landmarks and recovery links', () => {
  const html = readFileSync(errorPath, 'utf8');
  assert.equal((html.match(/<title(?:\s[^>]*)?>/g) ?? []).length, 1);
  assert.equal((html.match(/<h1(?:\s[^>]*)?>/g) ?? []).length, 1);
  assert.equal((html.match(/<main(?:\s[^>]*)?>/g) ?? []).length, 1);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<meta name="robots" content="noindex">/);
  for (const href of ['/', '/articles/', '/sounds/', '/tools/']) {
    assert.match(html, new RegExp(`<a[^>]+href="${href.replaceAll('/', '\\/')}"`), href);
  }
  assert.doesNotMatch(html, /<link rel="canonical"/);
  assert.doesNotMatch(html, /<link\b[^>]*\shreflang=/);
  assert.doesNotMatch(html, /<script type="application\/ld\+json"/);
  assert.doesNotMatch(html, /"@type":"(?:Article|BreadcrumbList|WebSite)"/);
  assert.doesNotMatch(html, /googletagmanager|google-analytics|gtag\s*\(/i);
});

test('checked-in package scripts rebuild dist before Wrangler deployment commands', () => {
  const { scripts } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  assert.equal(scripts['deploy:dry-run'], 'npm run build && wrangler deploy --config wrangler.jsonc --dry-run');
  assert.equal(scripts.deploy, 'npm run build && wrangler deploy --config wrangler.jsonc');
});

test('generated German 404 HTML is a standalone German recovery document', () => {
  const html = readFileSync(germanErrorPath, 'utf8');
  assert.equal((html.match(/<title(?:\s[^>]*)?>/g) ?? []).length, 1);
  assert.equal((html.match(/<h1(?:\s[^>]*)?>/g) ?? []).length, 1);
  assert.equal((html.match(/<main(?:\s[^>]*)?>/g) ?? []).length, 1);
  assert.match(html, /<html lang="de">/);
  assert.match(html, /<meta name="robots" content="noindex">/);
  assert.match(html, />Seite nicht gefunden</);
  assert.doesNotMatch(html, /data-language-switcher/);
  assert.doesNotMatch(html, /<a[^>]+href="\/tools\/"/);
  for (const href of ['/', '/de/artikel/', '/de/alltagsgeraeusche/', '/de/werkzeuge/']) {
    assert.match(html, new RegExp(`<a[^>]+href="${href.replaceAll('/', '\\/')}"`), href);
  }
  assert.doesNotMatch(html, /<link rel="canonical"/);
  assert.doesNotMatch(html, /<link\b[^>]*\shreflang=/);
  assert.doesNotMatch(html, /<script type="application\/ld\+json"/);
  assert.doesNotMatch(html, /googletagmanager|google-analytics|gtag\s*\(/i);
});

test('fresh dist and checked-in redirects keep 404 outside normal published sets', () => {
  const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(sitemapUrls.length, 56);
  assert.equal(new Set(sitemapUrls).size, 56);
  assert.ok(sitemapUrls.every((url) => !new URL(url).pathname.startsWith('/404')));

  for (const path of [join(dist, 'search.json'), join(dist, 'de', 'search.json')]) {
    const entries = JSON.parse(readFileSync(path, 'utf8'));
    assert.ok(entries.every((entry) => !entry.url.startsWith('/404')), path);
  }

  const generatedHtml = htmlFiles(dist);
  const indexable = generatedHtml.filter((path) => !/<meta name="robots" content="noindex">/.test(readFileSync(path, 'utf8')));
  assert.equal(indexable.length, 56);
  assert.equal(generatedHtml.length, 56 + legacyRedirects.length + 2);

  const redirectLines = readFileSync(join(root, 'public', '_redirects'), 'utf8').split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  assert.deepEqual(redirectLines, edgeRedirects.map(([from, to]) => `${from} ${to} 301`));
  for (const [from, to] of legacyRedirects) {
    const path = join(dist, ...from.split('/').filter(Boolean), 'index.html');
    const html = readFileSync(path, 'utf8');
    assert.match(html, /<meta name="robots" content="noindex">/, relative(root, path));
    assert.match(html, new RegExp(`content="0;url=${to.replaceAll('/', '\\/')}"`), relative(root, path));
  }
});
