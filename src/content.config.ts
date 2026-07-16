import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { locales } from './i18n/config';

const editorialSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  locale: z.enum(locales),
  translationKey: z.string(),
  clusterKey: z.enum(['fundamentals', 'exposure', 'smartphone', 'common-sounds']),
  primaryIntent: z.string(),
  contentCluster: z.string(),
  researchSources: z.array(z.string()),
  publishedAt: z.coerce.date(),
  lastReviewed: z.coerce.date(),
  draft: z.boolean().default(false),
});

const articles = defineCollection({
  loader: glob({
    pattern: '**/*.md',
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
    pattern: '**/*.md',
    base: './src/content/sounds',
    generateId: ({ data, entry }) =>
      typeof data.locale === 'string' && typeof data.slug === 'string'
        ? `${data.locale}/${data.slug}`
        : entry.replace(/\.md$/, ''),
  }),
  schema: editorialSchema,
});

export const collections = { articles, sounds };
