// Verifies every language has exactly the same structure as English (no missing or extra lines).
// Run: node scripts/check-i18n.mjs
const base = (await import('../src/i18n/en.ts')).en;
let bad = 0;
const walk = (a, b, path, same, lang) => {
  if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b)) return void (console.log(lang, 'type differs', path), bad++);
  if (typeof a === 'string') {
    if (a && !b) { console.log(lang, 'empty', path); bad++; }
    if (a === b && a.split(' ').length > 3) same.push(path);
    return;
  }
  if (Array.isArray(a) && a.length !== b.length) { console.log(lang, 'length differs', path); bad++; }
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
    if (!(k in a) || !(k in b)) { console.log(lang, k in a ? 'missing' : 'extra', `${path}.${k}`); bad++; continue; }
    walk(a[k], b[k], `${path}.${k}`, same, lang);
  }
};
for (const lang of ['hu', 'de', 'fr', 'it', 'es', 'ru', 'ar']) {
  const same = [];
  walk(base, (await import(`../src/i18n/${lang}.ts`))[lang], lang, same, lang);
  console.log(lang, 'checked; identical to English:', same.join(', ') || 'none');
}
if (bad) { console.error(bad, 'problem(s)'); process.exit(1); }
console.log('all languages complete');
