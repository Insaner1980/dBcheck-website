import { getCollection } from 'astro:content';
import { commonSounds } from '../data/sounds';
import { tools } from '../data/tools';

const toolEntries = tools.map((tool) => ({
  kind: tool.category === 'explorer' ? 'sound explorer' : 'tool',
  title: tool.title,
  description: tool.description,
  tags: tool.searchTags,
  url: tool.href,
}));

const staticEntries = [
  {
    kind: 'page',
    title: 'Why dBcheck',
    description: 'Daily noise exposure, accumulated dose, nighttime events and personal relative hearing-result tracking',
    tags: ['why', 'exposure', 'sleep', 'hearing'],
    url: '/#why',
  },
  {
    kind: 'feature',
    title: 'Live sound level meter',
    description: 'Detailed readout, waveform, LAeq, LCpeak and session statistics',
    tags: ['meter', 'sound level', 'decibel', 'waveform'],
    url: '/#features',
  },
  {
    kind: 'feature',
    title: 'Noise dosimeter',
    description: 'NIOSH REL and OSHA PEL dose, projected dose and estimated remaining exposure time',
    tags: ['dosimeter', 'niosh', 'osha', 'dose'],
    url: '/#features',
  },
  {
    kind: 'feature',
    title: 'Hearing test and recovery check',
    description: 'Personal relative threshold tracking against your own baseline, not clinical diagnosis',
    tags: ['hearing', 'test', 'baseline', 'recovery'],
    url: '/#features',
  },
  {
    kind: 'feature',
    title: 'Sleep monitor',
    description: 'Nighttime measurement showing when notable noise events occurred and how loud they were',
    tags: ['sleep', 'night', 'monitor', 'events'],
    url: '/#features',
  },
  {
    kind: 'page',
    title: 'Free and Pro',
    description: 'What is included for free and what the one-time Pro purchase unlocks on Android',
    tags: ['pricing', 'pro', 'free', 'purchase'],
    url: '/#pricing',
  },
  {
    kind: 'page',
    title: 'Sound tools',
    description: 'Free educational sound calculators from dBcheck',
    tags: ['tools', 'calculators', 'free'],
    url: '/tools/',
  },
  {
    kind: 'page',
    title: 'Articles and sound guides',
    description: 'Sourced guides about sound levels, phone measurement, exposure and common sounds',
    tags: ['articles', 'guides'],
    url: '/articles/',
  },
];

export async function GET() {
  const [articles, soundArticles] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('sounds', ({ data }) => !data.draft),
  ]);
  const articleEntries = articles.map((entry) => ({
    kind: 'article',
    title: entry.data.title,
    description: entry.data.description,
    tags: [entry.data.contentCluster, entry.data.primaryIntent],
    url: `/articles/${entry.id}/`,
  }));
  const soundArticlesBySlug = new Map(soundArticles.map((entry) => [entry.id, entry]));
  const soundEntries = commonSounds.map((sound) => {
    const article = soundArticlesBySlug.get(sound.slug);
    return {
      kind: article ? 'sound guide' : 'sound explorer',
      title: article?.data.title ?? sound.name,
      description: article?.data.description ?? `${sound.typicalMinDb}–${sound.typicalMaxDb} dB typical range. ${sound.shortDescription}`,
      tags: [sound.category, sound.slug, 'decibels', 'common sounds'],
      url: sound.articleRoute ?? '/sounds/#library-explorer',
    };
  });

  return new Response(JSON.stringify([...soundEntries, ...articleEntries, ...toolEntries, ...staticEntries]), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
