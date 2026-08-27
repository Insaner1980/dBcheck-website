import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const walk = (dir) => readdirSync(dir).flatMap((name) => {
  const path = join(dir, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});
const htmlFiles = walk(dist).filter((path) => path.endsWith(`${join('', 'index.html')}`));
const pages = htmlFiles.map((path) => ({ path, html: readFileSync(path, 'utf8') }));
const redirects = pages.filter(({ html }) => /http-equiv=["']refresh["']/i.test(html));
const indexable = pages.filter(({ html }) => !/http-equiv=["']refresh["']/i.test(html));
const linkTags = (html) => [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}=["']([^"']+)["']`, 'i'))?.[1];
const canonicals = indexable.flatMap(({ html }) => linkTags(html)
  .filter((tag) => attribute(tag, 'rel') === 'canonical')
  .map((tag) => attribute(tag, 'href')));
const alternates = indexable.flatMap(({ html }) => linkTags(html)
  .filter((tag) => attribute(tag, 'rel') === 'alternate' && attribute(tag, 'hreflang'))
  .map((tag) => attribute(tag, 'hreflang')));
const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replaceAll('&amp;', '&'));
const sorted = (values) => [...new Set(values)].sort();
const sameCanonicalSet = JSON.stringify(sorted(canonicals)) === JSON.stringify(sorted(sitemapUrls));
const schemas = [];
for (const { html } of indexable) {
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    const value = JSON.parse(match[1]);
    const visit = (node) => {
      if (Array.isArray(node)) return node.forEach(visit);
      if (!node || typeof node !== 'object') return;
      if (node['@type']) schemas.push(node['@type']);
      if (node['@graph']) visit(node['@graph']);
    };
    visit(value);
  }
}
const counts = (values) => Object.fromEntries([...new Set(values)].sort().map((value) => [value, values.filter((item) => item === value).length]));
const routeChecks = indexable.map(({ html, path }) => ({
  path: `/${relative(dist, path).replaceAll('\\', '/').replace(/index\.html$/, '')}`,
  titles: (html.match(/<title\b/gi) ?? []).length,
  descriptions: (html.match(/<meta\b[^>]*name=["']description["']/gi) ?? []).length,
  h1s: (html.match(/<h1\b/gi) ?? []).length,
  canonicals: linkTags(html).filter((tag) => attribute(tag, 'rel') === 'canonical').length,
}));
const invalidRouteMetadata = routeChecks.filter((item) => item.titles !== 1 || item.descriptions !== 1 || item.h1s !== 1 || item.canonicals !== 1);

const mathFiles = [
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
const oldMath = (text) => [...text.matchAll(/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g)].map((match) => (match[1] ?? match[2]).trim());
const newMath = (text) => [...text.matchAll(/\$\$([\s\S]*?)\$\$|\$([^$\n]*?)\$/g)].map((match) => (match[1] ?? match[2]).trim());
const math = [];
for (const file of mathFiles) {
  const sourcePath = join(root, 'src', 'content', 'articles', 'de', file);
  const source = readFileSync(sourcePath, 'utf8');
  const repoPath = `src/content/articles/de/${file}`;
  const head = execFileSync('git', ['show', `HEAD:${repoPath}`], { encoding: 'utf8' });
  const htmlPath = join(dist, 'de', 'artikel', file.replace(/\.md$/, ''), 'index.html');
  const html = readFileSync(htmlPath, 'utf8');
  const current = newMath(source);
  const previous = oldMath(head);
  math.push({
    file,
    sourceExpressions: current.length,
    formulaBodiesUnchanged: JSON.stringify(current) === JSON.stringify(previous),
    unsupportedDelimiters: (source.match(/\\\(|\\\)|\\\[|\\\]/g) ?? []).length,
    katex: (html.match(/<span class=["']katex["']/g) ?? []).length,
    mathml: (html.match(/<math\b/g) ?? []).length,
    texAnnotations: (html.match(/<annotation encoding=["']application\/x-tex["']/g) ?? []).length,
  });
}

console.log(JSON.stringify({
  htmlOutputs: pages.length,
  indexableRoutes: indexable.length,
  redirectOutputs: redirects.length,
  redirects: redirects.map(({ path }) => `/${relative(dist, path).replaceAll('\\', '/').replace(/index\.html$/, '')}`).sort(),
  uniqueCanonicals: new Set(canonicals).size,
  sitemapUrls: sitemapUrls.length,
  sameCanonicalSet,
  hreflangs: counts(alternates),
  schemaTypes: counts(schemas),
  invalidRouteMetadata,
  math,
  mathTotals: {
    sourceExpressions: math.reduce((sum, item) => sum + item.sourceExpressions, 0),
    katex: math.reduce((sum, item) => sum + item.katex, 0),
    mathml: math.reduce((sum, item) => sum + item.mathml, 0),
    texAnnotations: math.reduce((sum, item) => sum + item.texAnnotations, 0),
    allBodiesUnchanged: math.every((item) => item.formulaBodiesUnchanged),
    unsupportedDelimiters: math.reduce((sum, item) => sum + item.unsupportedDelimiters, 0),
  },
}, null, 2));
