import { getCollection } from 'astro:content';
import { getCommonSounds } from '../data/sounds';
import { getTools } from '../data/tools';
import type { Locale } from './config';
import { routeForContent, soundExplorerFallbackUrl } from './routes';

export async function buildSearchIndex(locale: Locale) {
  const de = locale === 'de';
  const toolKind = (category: string) => {
    if (category === 'explorer') return de ? 'Geräusche' : 'sound explorer';
    return de ? 'Werkzeug' : 'tool';
  };
  const soundKind = (hasArticle: boolean) => {
    if (hasArticle) return de ? 'Geräusch-Ratgeber' : 'sound guide';
    return de ? 'Geräusch' : 'sound explorer';
  };
  const [articles, soundArticles] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft && data.locale === locale),
    getCollection('sounds', ({ data }) => !data.draft && data.locale === locale),
  ]);
  const toolEntries = getTools(locale).map((tool) => ({ kind: toolKind(tool.category), title: tool.title, description: tool.description, tags: tool.searchTags, url: tool.href }));
  const articleEntries = articles.map((entry) => ({ kind: de ? 'Artikel' : 'article', title: entry.data.title, description: entry.data.description, tags: [entry.data.contentCluster, entry.data.primaryIntent], url: routeForContent(locale, 'articles', entry.data.slug) }));
  const soundArticlesByKey = new Map(soundArticles.map((entry) => [entry.data.translationKey, entry]));
  const soundEntries = getCommonSounds(locale).map((sound) => {
    const article = soundArticlesByKey.get(sound.translationKey);
    return { kind: soundKind(Boolean(article)), title: article?.data.title ?? sound.name, description: article?.data.description ?? `${sound.typicalMinDb}–${sound.typicalMaxDb} dB. ${sound.shortDescription}`, tags: [sound.category, sound.slug, de ? 'Dezibel' : 'decibels'], url: sound.articleRoute ?? soundExplorerFallbackUrl(locale) };
  });
  const staticEntries = de ? [
    { kind: 'Seite', title: 'Artikel und Geräusch-Ratgeber', description: 'Quellenbasierte Ratgeber zu Schall, Messung und Lärmexposition', tags: ['Artikel', 'Ratgeber'], url: '/de/artikel/' },
    { kind: 'Seite', title: 'Rechner und Werkzeuge', description: 'Kostenlose Schall- und Lärmexpositionsrechner', tags: ['Rechner', 'Werkzeuge'], url: '/de/werkzeuge/' },
  ] : [
    { kind: 'page', title: 'Why dBcheck', description: 'Daily noise exposure, nighttime events and personal relative hearing-result tracking', tags: ['why', 'exposure', 'sleep', 'hearing'], url: '/#why' },
    { kind: 'page', title: 'Sound tools', description: 'Free educational sound calculators from dBcheck', tags: ['tools', 'calculators', 'free'], url: '/tools/' },
    { kind: 'page', title: 'Articles and sound guides', description: 'Sourced guides about sound levels, phone measurement, exposure and common sounds', tags: ['articles', 'guides'], url: '/articles/' },
  ];
  return [...soundEntries, ...articleEntries, ...toolEntries, ...staticEntries];
}
