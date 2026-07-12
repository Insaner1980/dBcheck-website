// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://dbcheck.app',
  integrations: [sitemap()],
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
