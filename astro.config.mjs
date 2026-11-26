import { defineConfig } from 'astro/config';

export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'hu', 'de', 'fr', 'it', 'es', 'ru', 'ar'],
  },
  build: { format: 'directory' },
});
