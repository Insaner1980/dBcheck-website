import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { locales } from './i18n/config';
import { isEditorialDate, parseEditorialDate } from './lib/editorial-date.mjs';

const editorialDate = z.string()
  .refine(isEditorialDate, 'Expected a real calendar date in YYYY-MM-DD format')
  .transform(parseEditorialDate);

const editorialSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string(),
  slug: z.string(),
  locale: z.enum(locales),
  translationKey: z.string(),
  clusterKey: z.enum(['fundamentals', 'exposure', 'smartphone', 'common-sounds']),
  primaryIntent: z.string(),
  contentCluster: z.string(),
  researchSources: z.array(z.string()),
  publishedAt: editorialDate,
  lastReviewed: editorialDate,
  draft: z.boolean().default(false),
});

const articles = defineCollection({
  loader: glob({
    pattern: locales.map((locale) => `${locale}/*.md`),
    base: './src/content/articles',
    generateId: ({ data, entry }) =>
      typeof data.locale === 'string' && typeof data.slug === 'string'
        ? `${data.locale}/${data.slug}`
        : entry.replace(/\.md$/, ''),
  }),
  schema: editorialSchema,
});

const sounds = defineCollection({
  loader: glob({
    pattern: locales.map((locale) => `${locale}/*.md`),
    base: './src/content/sounds',
    generateId: ({ data, entry }) =>
      typeof data.locale === 'string' && typeof data.slug === 'string'
        ? `${data.locale}/${data.slug}`
        : entry.replace(/\.md$/, ''),
  }),
  schema: editorialSchema,
});

export const collections = { articles, sounds };
