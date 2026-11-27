import type { APIRoute } from 'astro';
import { available } from '../i18n';

const photos = ['hero', 'welcome', 'room-1', 'room-2', 'room-3', 'room-4', 'dining', 'house'];

export const GET: APIRoute = ({ site }) => {
  const abs = (path: string) => new URL(path, site).href;
  const today = new Date().toISOString().slice(0, 10);
  const alternates = [
    ...available.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(`/${l}/`)}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs('/en/')}"/>`,
  ].join('\n');
  const images = photos.map((p) => `    <image:image><image:loc>${abs(`/images/${p}.jpg`)}</image:loc></image:image>`).join('\n');
  const urls = available.map((l) => `  <url>\n    <loc>${abs(`/${l}/`)}</loc>\n    <lastmod>${today}</lastmod>\n${alternates}\n${images}\n  </url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
