import { en, type Dict } from './en';
import { hu } from './hu';
import { de } from './de';
import { fr } from './fr';
import { it } from './it';
import { es } from './es';
import { ru } from './ru';
import { ar } from './ar';

// Order = order in the language switcher.
export const allLocales = {
  en: { label: 'English', dir: 'ltr' },
  hu: { label: 'Magyar', dir: 'ltr' },
  de: { label: 'Deutsch', dir: 'ltr' },
  fr: { label: 'Français', dir: 'ltr' },
  it: { label: 'Italiano', dir: 'ltr' },
  es: { label: 'Español', dir: 'ltr' },
  ru: { label: 'Русский', dir: 'ltr' },
  ar: { label: 'العربية', dir: 'rtl' },
} as const;
export type Locale = keyof typeof allLocales;

// Every language needs a complete dictionary, so a page never mixes languages.
// Check after editing copy:  node scripts/check-i18n.mjs
export const dictionaries: Record<Locale, Dict> = { en, hu, de, fr, it, es, ru, ar };

export const available = Object.keys(allLocales) as Locale[];
export const t = (lang: Locale): Dict => dictionaries[lang];
