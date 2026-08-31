// @ts-check
import { defineConfig } from 'astro/config';
import { existsSync, renameSync, rmdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRawUrls from './src/lib/rehype-raw-urls.mjs';
import { remarkEditorialSafety } from './src/lib/remark-editorial-safety.mjs';
import { remarkValidateLocalImages, validatePublicAssets } from './src/lib/validate-build-assets.mjs';
import { readEditorialEntries, validateEditorialPublicationIntegrity, validateEditorialRouteCollisions, validateEditorialTranslationKeyCollisions } from './src/lib/validate-content-route-collisions.mjs';
import { defaultLocale, locales } from './src/i18n/config.ts';
import { contentTranslations, routePairs } from './src/i18n/routes.ts';
import { getCommonSounds } from './src/data/sounds.ts';

const editorialEntries = readEditorialEntries();
validateEditorialRouteCollisions({ entries: editorialEntries });
validateEditorialTranslationKeyCollisions({ entries: editorialEntries });
await validateEditorialPublicationIntegrity({
  entries: editorialEntries,
  contentTranslations,
  soundEntries: locales.flatMap((locale) => getCommonSounds(locale)),
});

const siteUrl = 'https://dbcheck.app';
/** @returns {import('astro').AstroIntegration} */
const emitLocalizedErrorDocuments = () => ({
  name: 'emit-localized-error-documents',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const source = fileURLToPath(new URL('de/404/index.html', dir));
      if (!existsSync(source)) throw new Error(`Missing generated localized error document: ${source}`);
      renameSync(source, fileURLToPath(new URL('de/404.html', dir)));
      rmdirSync(fileURLToPath(new URL('de/404/', dir)));
    },
  },
});
/** @param {string} url */
const routePairForUrl = (url) => {
  const path = new URL(url).pathname;
  return routePairs.find((pair) => pair.en === path || pair.de === path);
};

/** @type {import('@astrojs/markdown-remark').RemarkPlugin} */
const remarkMathPresence = () => (tree, file) => {
  /** @type {import('@astrojs/markdown-remark').Node[]} */
  const nodes = [tree];
  const source = String(file.value);
  let hasMath = false;
  while (nodes.length > 0) {
    const node = nodes.pop();
    if (!node) continue;
    const position = /** @type {{ position?: { start?: { offset?: number }, end?: { offset?: number } } }} */ (node).position;
    const startOffset = position?.start?.offset;
    const endOffset = position?.end?.offset;
    const positionedSource = typeof startOffset === 'number' && typeof endOffset === 'number'
      ? source.slice(startOffset, endOffset)
      : '';
    if (node.type === 'math' && positionedSource && !positionedSource.trimEnd().endsWith('$$')) {
      file.fail('Unclosed $$ math block; add a closing $$ delimiter', node);
    }
    if (node.type === 'inlineMath' && 'value' in node && typeof node.value === 'string') {
      const value = node.value.trim();
      const proseWords = value.match(/[A-Za-zÀ-ÖØ-öø-ÿ]{2,}/g) ?? [];
      const hasMathSyntax = /\\[A-Za-z]+|[=+*/^_{}()[\]-]/.test(value);
      if (!value.includes('\n') && proseWords.length >= 2 && !hasMathSyntax) {
        file.fail('Prose-like dollar-delimited text was parsed as math; escape ordinary dollar signs as \\$', node);
      }
    }
    if (node.type === 'inlineMath' || node.type === 'math' || (node.type === 'code' && 'lang' in node && node.lang === 'math')) {
      hasMath = true;
    }
    if ('children' in node && Array.isArray(node.children)) nodes.push(...node.children);
  }
  file.data.astro ??= {};
  file.data.astro.frontmatter ??= {};
  file.data.astro.frontmatter.hasMath = hasMath;
};

/** @type {import('@astrojs/markdown-remark').RehypePlugin} */
const rehypeKatexErrors = () => (tree, file) => {
  /** @type {import('@astrojs/markdown-remark').Node[]} */
  const nodes = [tree];
  while (nodes.length > 0) {
    const node = nodes.pop();
    if (!node) continue;
    if (
      node.type === 'element'
      && 'tagName' in node
      && node.tagName === 'span'
      && 'properties' in node
      && node.properties
      && typeof node.properties === 'object'
      && 'className' in node.properties
      && Array.isArray(node.properties.className)
      && node.properties.className.includes('katex-error')
    ) {
      const title = 'title' in node.properties && typeof node.properties.title === 'string'
        ? node.properties.title
        : 'Could not render math with KaTeX';
      file.fail(title, node);
    }
    if ('children' in node && Array.isArray(node.children)) nodes.push(...node.children);
  }
};

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  integrations: [emitLocalizedErrorDocuments(), sitemap({
    i18n: {
      defaultLocale,
      locales: Object.fromEntries(locales.map((locale) => [locale, locale])),
    },
    serialize(item) {
      const pair = routePairForUrl(item.url);
      if (pair) {
        item.links = [
          { lang: 'en', url: new URL(pair.en, siteUrl).href },
          { lang: 'de', url: new URL(pair.de, siteUrl).href },
          { lang: 'x-default', url: new URL(pair.en, siteUrl).href },
        ];
      } else {
        item.links = undefined;
      }
      return item;
    },
  })],
  i18n: {
    defaultLocale,
    locales: [...locales],
    routing: { prefixDefaultLocale: false },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkValidateLocalImages, remarkEditorialSafety, remarkMath, remarkMathPresence],
      rehypePlugins: [rehypeKatex, rehypeKatexErrors, rehypeRawUrls],
    }),
  },
  vite: {
    plugins: [validatePublicAssets()],
    build: {
      assetsInlineLimit(filePath) {
        const normalizedPath = filePath.replaceAll('\\', '/');
        if (/\/node_modules\/katex\/dist\/fonts\/[^/]+\.(?:woff2?|ttf|otf)$/i.test(normalizedPath)) {
          return false;
        }
        return undefined;
      },
    },
  },
  redirects: {
    '/sounds/normal-conversation-decibels': '/sounds/normal-conversation/',
    '/sounds/vacuum-cleaner-decibels': '/sounds/vacuum-cleaner/',
    '/sounds/lawn-mower-decibels': '/sounds/lawn-mower/',
    '/sounds/concert-decibels': '/sounds/concert/',
    '/sounds/whisper-decibels': '/sounds/',
    '/sounds/busy-traffic-decibels': '/sounds/',
    '/sounds/siren-decibels': '/sounds/',
    '/sounds/fireworks-decibels': '/sounds/',
  },
});
