# Zanzibári hotel – weboldal (brief)

Megrendelő: egy zanzibári hotel (név: ____). Kivitelező: SA Software & Network Solutions.
Indult: 2026. november 25.

## Rögzített döntések (2026-11-25, tulaj elképzelése alapján)
- Hely: Nungwi (Zanzibár északi csúcsa). GPS: -5.736968776973334, 39.296170872725 (src/i18n/site.ts).
- Stílus: luxury, referencia: https://www.aryaboutiqueresort.com/?lang=en – **ne legyen "AI-érzés"** (nincs sablonos gradiens/kártyarács, valódi fotók, visszafogott tipó).
- Nyelvek: EN, DE, RU, FR, ES, IT, AR (az arab RTL!).
- Nulla emoji, csak SVG ikonok.
- Online foglalás + Apple Wallet / Google Wallet jegy (QR) – lásd TODO.md.
- Recepció: QR-beolvasás → vendég/foglalás azonnal a recepciós felületen → saját PMS kell.
- Hotel: Aurora Hacienda Zanzibar, 4 szoba, zanzibári stílus (az épület is). Most nyílt, nincs még anyag.
- Nincs Booking.com és Instagram (nem is lesz, ha nem muszáj) → csak közvetlen foglalás, saját PMS.
- Fizetés: első körben foglalási kérés, fizetés a szálláson; előleg később, ha kell.
- Infra: Cloudflare (Pages/Workers, DNS) + Supabase + .com domain.

## Amit tudni kell az induláshoz (töltsd ki, vagy mondd el Claude-nak)

1. **A hotel**
   - Név: ____
   - Mostani weboldal / Instagram / Booking.com / TripAdvisor link: ____
   - Hol van a szigeten (Nungwi, Kendwa, Paje, Jambiani, Stone Town, Michamvi…): ____
   - Jellege (butik, resort, villák, budget, all-inclusive…), hány szoba: ____
2. **Mit tudjon az oldal?**
   - [ ] Bemutatkozás: szobák, galéria, étterem/bár, programok (búvárkodás, kirándulások), kapcsolat, térkép
   - [ ] Foglalási kérés: űrlap és/vagy WhatsApp gomb
   - [ ] Valódi online foglalás – van-e már foglalási rendszerük (Cloudbeds, SiteMinder, Little Hotelier, Beds24…)? → azt kötjük be
   - [ ] Egyéb: ____
3. **Nyelvek:** angol + ____ (olasz / német / lengyel / francia?)
4. **Anyagok:** fotók, logó, szövegek, szobák és árak – mi van meg? Ami nincs: ideiglenes képek, később csere.
5. **Domain, tárhely, e-mail:** van-e domain, ki kezeli? (alap javaslat: Netlify)
6. **Határidő:** ____
7. **Árajánlat / számlázás:** ____ (csak belső jegyzet)
