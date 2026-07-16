import type { APIRoute } from 'astro';
import { buildSearchIndex } from '../../i18n/search';
export const prerender = true;
export function getStaticPaths() { return [{ params: { locale: 'de' }, props: { locale: 'de' } }]; }
export const GET: APIRoute = async ({ props }) => new Response(JSON.stringify(await buildSearchIndex(props.locale)), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
