import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { assertFreshBuild } from '../scripts/build-freshness.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
await assertFreshBuild({ root });
const dist = join(root, 'dist');
const home = readFileSync(join(dist, 'index.html'), 'utf8');

test('the hero poster is preloaded at high priority only on the homepage', () => {
  const poster = home.match(/<video\b[^>]*\bposter="([^"]+)"/)?.[1];
  assert.ok(poster);
  const head = home.slice(0, home.indexOf('</head>'));
  const preloads = [...head.matchAll(/<link\b[^>]*rel="preload"[^>]*>/g)].map(([tag]) => tag);
  assert.equal(preloads.filter((tag) => tag.includes(`href="${poster}"`)).length, 1);
  assert.ok(preloads.some((tag) => tag.includes(`href="${poster}"`) && tag.includes('as="image"') && tag.includes('fetchpriority="high"')));
  assert.ok(preloads.some((tag) => tag.includes(`href="${poster}"`) && tag.includes('crossorigin="anonymous"')), 'match the video CORS mode to avoid fetching its poster twice');
  for (const page of ['tools/index.html', 'de/artikel/index.html']) {
    assert.ok(!readFileSync(join(dist, page), 'utf8').includes(poster), page);
  }
});

test('scroll tracking is excluded from the homepage static JavaScript dependency graph', () => {
  const visited = new Set();
  const visit = (path) => {
    if (visited.has(path)) return;
    visited.add(path);
    const source = readFileSync(path, 'utf8');
    assert.doesNotMatch(source, /scrollTicker|dataTimer/, path);
    const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true);
    for (const statement of ast.statements) {
      if ((ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)) && statement.moduleSpecifier) {
        const specifier = statement.moduleSpecifier.text;
        if (specifier.startsWith('.')) visit(resolve(dirname(path), specifier));
      }
    }
  };
  const scripts = [...home.matchAll(/<script\b[^>]*src="([^"]+)"/g)];
  assert.ok(scripts.length > 0);
  for (const [, src] of scripts) visit(join(dist, src));
  assert.ok(visited.size > scripts.length, 'transitive imports were checked');
});

test('both hero videos have a bounded browser cache lifetime', () => {
  const headers = readFileSync(join(dist, '_headers'), 'utf8').replaceAll('\r\n', '\n');
  for (const video of ['mobile', 'desktop']) {
    assert.ok(headers.includes(`/dBcheck-hero-${video}.mp4\n  Cache-Control: public, max-age=86400`));
  }
  assert.doesNotMatch(headers, /immutable/);
});
