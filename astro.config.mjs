import { defineConfig } from 'astro/config';

export default defineConfig({
  // Netlify sets URL to the site's primary address, so a connected domain is picked up automatically.
  site: process.env.SITE_URL || process.env.URL || 'http://localhost:4321',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hu', 'de', 'fr', 'it', 'es', 'ru', 'ar'],
  },
  build: { format: 'directory' },
});
