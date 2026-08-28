// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRawUrls from './src/lib/rehype-raw-urls.mjs';
import { defaultLocale, locales } from './src/i18n/config.ts';
import { routePairs } from './src/i18n/routes.ts';

const siteUrl = 'https://dbcheck.app';
/** @param {string} url */
const routePairForUrl = (url) => {
  const path = new URL(url).pathname;
  return routePairs.find((pair) => pair.en === path || pair.de === path);
};

/** @type {import('@astrojs/markdown-remark').RemarkPlugin} */
const remarkMathPresence = () => (tree, file) => {
  /** @type {import('@astrojs/markdown-remark').Node[]} */
  const nodes = [tree];
  let hasMath = false;
  while (nodes.length > 0) {
    const node = nodes.pop();
    if (!node) continue;
    if (node.type === 'inlineMath' || node.type === 'math') {
      hasMath = true;
      break;
    }
    if ('children' in node && Array.isArray(node.children)) nodes.push(...node.children);
  }
  file.data.astro ??= {};
  file.data.astro.frontmatter ??= {};
  file.data.astro.frontmatter.hasMath = hasMath;
};

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  integrations: [sitemap({
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
      remarkPlugins: [remarkMath, remarkMathPresence],
      rehypePlugins: [rehypeKatex, rehypeRawUrls],
    }),
  },
  vite: {
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
