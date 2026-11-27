import type { APIRoute } from 'astro';
import { seo } from '../i18n/site';

// Controlled by seo.indexable in src/i18n/site.ts
export const GET: APIRoute = ({ site }) =>
  new Response(
    seo.indexable ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n` : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
