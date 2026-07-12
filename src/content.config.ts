import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const editorialSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  primaryIntent: z.string(),
  contentCluster: z.string(),
  researchSources: z.array(z.string()),
  lastReviewed: z.coerce.date(),
  draft: z.boolean().default(false),
});

const articles = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/articles',
    generateId: ({ data, entry }) => typeof data.slug === 'string' ? data.slug : entry.replace(/\.md$/, ''),
  }),
  schema: editorialSchema,
});

const sounds = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/sounds',
    generateId: ({ data, entry }) => typeof data.slug === 'string' ? data.slug : entry.replace(/\.md$/, ''),
  }),
  schema: editorialSchema,
});

export const collections = { articles, sounds };
