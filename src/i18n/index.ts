import { en, type Dict } from './en';

export const allLocales = {
  en: { label: 'English', dir: 'ltr' },
  de: { label: 'Deutsch', dir: 'ltr' },
  ru: { label: 'Русский', dir: 'ltr' },
  fr: { label: 'Français', dir: 'ltr' },
  es: { label: 'Español', dir: 'ltr' },
  it: { label: 'Italiano', dir: 'ltr' },
  ar: { label: 'العربية', dir: 'rtl' },
} as const;
export type Locale = keyof typeof allLocales;

// Only finished, reviewed translations are listed here. Others are added when ready,
// so a page never mixes languages.
export const dictionaries: Partial<Record<Locale, Dict>> = { en };

export const available = Object.keys(dictionaries) as Locale[];
export const t = (lang: Locale): Dict => dictionaries[lang] as Dict;

