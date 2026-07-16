import type { APIRoute } from 'astro';
import { buildSearchIndex } from '../i18n/search';
export const prerender = true;
export const GET: APIRoute = async () => new Response(JSON.stringify(await buildSearchIndex('en')), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
