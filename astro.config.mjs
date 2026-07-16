// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { defaultLocale, locales } from './src/i18n/config.ts';
import { routePairs } from './src/i18n/routes.ts';

const siteUrl = 'https://dbcheck.app';
const routePairForUrl = (url) => {
  const path = new URL(url).pathname;
  return routePairs.find((pair) => pair.en === path || pair.de === path);
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
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
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
