import { defineConfig } from 'astro/config';

export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'ru', 'fr', 'es', 'it', 'ar'],
  },
  build: { format: 'directory' },
});
