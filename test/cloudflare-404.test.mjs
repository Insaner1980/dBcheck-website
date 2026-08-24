import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import test from 'node:test';

const root = new URL('..', import.meta.url).pathname.replace(/^\/(.:)/, '$1').replaceAll('/', '\\');
const dist = join(root, 'dist');
const errorPath = join(dist, '404.html');
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
const htmlFiles = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith('.html') ? [path] : [];
});

test('Cloudflare static assets use the generated custom 404 page', () => {
  const wrangler = JSON.parse(readFileSync(join(root, 'wrangler.jsonc'), 'utf8'));
  assert.equal(wrangler.assets.directory, './dist');
  assert.equal(wrangler.assets.not_found_handling, '404-page');
  assert.ok(existsSync(errorPath), 'dist/404.html is missing');
  assert.ok(statSync(errorPath).size > 0, 'dist/404.html is empty');
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
  assert.doesNotMatch(html, /hreflang=/);
  assert.doesNotMatch(html, /<script type="application\/ld\+json"/);
  assert.doesNotMatch(html, /"@type":"(?:Article|BreadcrumbList|WebSite)"/);
  assert.doesNotMatch(html, /googletagmanager|google-analytics|gtag\s*\(/i);
});

test('404 remains outside the normal route, sitemap, search and redirect sets', () => {
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
  assert.equal(generatedHtml.length, 56 + legacyRedirects.length + 1);

  const redirectLines = readFileSync(join(root, 'public', '_redirects'), 'utf8').split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  assert.deepEqual(redirectLines, legacyRedirects.map(([from, to]) => `${from} ${to} 301`));
  for (const [from, to] of legacyRedirects) {
    const path = join(dist, ...from.split('/').filter(Boolean), 'index.html');
    const html = readFileSync(path, 'utf8');
    assert.match(html, /<meta name="robots" content="noindex">/, relative(root, path));
    assert.match(html, new RegExp(`content="0;url=${to.replaceAll('/', '\\/')}"`), relative(root, path));
  }
});
