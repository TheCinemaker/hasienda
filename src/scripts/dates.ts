// Native date fields follow the browser's language, so the site uses its own calendar in the page language.
import flatpickr from 'flatpickr';
import { Hungarian } from 'flatpickr/dist/l10n/hu.js';
import { German } from 'flatpickr/dist/l10n/de.js';
import { French } from 'flatpickr/dist/l10n/fr.js';
import { Italian } from 'flatpickr/dist/l10n/it.js';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { Russian } from 'flatpickr/dist/l10n/ru.js';
import { Arabic } from 'flatpickr/dist/l10n/ar.js';

const locales: Record<string, any> = { hu: Hungarian, de: German, fr: French, it: Italian, es: Spanish, ru: Russian, ar: Arabic };

export function initDatePickers() {
  const lang = document.documentElement.lang;
  const shown = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', year: 'numeric' });
  const pad = (v: number) => String(v).padStart(2, '0');
  const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const nextDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);

  const options = (extra: Record<string, unknown>) => ({
    locale: locales[lang] || 'default',
    disableMobile: true,
    dateFormat: 'Y-m-d', // submitted value
    altInput: true,
    altInputClass: 'date-field',
    altFormat: 'shown',
    ariaDateFormat: 'shown',
    formatDate: (d: Date, format: string) => (format === 'Y-m-d' ? iso(d) : shown.format(d)),
    ...extra,
  });

  document.querySelectorAll<HTMLFormElement>('#bar, #book-form').forEach((form) => {
    const arrival = form.querySelector<HTMLInputElement>('input[name="arrival"]');
    const departure = form.querySelector<HTMLInputElement>('input[name="departure"]');
    if (!arrival || !departure) return;
    const out = flatpickr(
      departure,
      options({
        minDate: nextDay(new Date()),
        // with nothing chosen yet, open on the first month that can be selected
        onOpen: (_: Date[], __: string, fp: any) => { if (!fp.selectedDates.length) fp.jumpToDate(fp.config.minDate); },
      })
    ) as any;
    flatpickr(
      arrival,
      options({
        minDate: 'today',
        onChange: ([d]: Date[]) => {
          if (!d) return;
          out.set('minDate', nextDay(d)); // departure is always after arrival
          if (out.selectedDates[0] && out.selectedDates[0] <= d) out.clear();
          if (!out.selectedDates[0]) out.jumpToDate(nextDay(d));
        },
      })
    );
  });
}
