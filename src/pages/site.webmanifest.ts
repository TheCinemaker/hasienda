import type { APIRoute } from 'astro';
import { site as hotel } from '../i18n/site';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: hotel.name,
      short_name: 'Aurora Hacienda',
      start_url: '/',
      display: 'browser',
      background_color: '#0e0b09',
      theme_color: '#0e0b09',
      icons: [192, 512].map((s) => ({ src: `/icon-${s}.png`, sizes: `${s}x${s}`, type: 'image/png' })),
    }),
    { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } }
  );
