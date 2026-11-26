# Folytatás otthon (Mac) – Aurora Hacienda Zanzibar

Állapot: **2026. november 26., csütörtök dél (iroda)**.

- Repó: `https://github.com/TheCinemaker/hasienda.git` (ág: `main`)
- Netlify a GitHub `main`-ből épít. A GitHubon a `5b974c9` van fent (8 nyelv, foglaló panel).
- **Ennél újabb helyi commit is van** (szövegaudit + ez a jegyzet). Ha még nem lett pusholva, a Dropboxban lévő
  `projekt/` mappa `.git`-je tartalmazza.
- A Netlify-cím nincs a repóban: a Netlify felületén látszik.

## 1. Indítás a Macen

A Dropboxból ne futtasd; legyen helyi példány.

```
git clone https://github.com/TheCinemaker/hasienda.git ~/hasienda
cd ~/hasienda
```

Ha a helyi commit nincs a GitHubon:

```
git pull ~/Dropbox/Privat/zanzibar-hotel/projekt main
```

Másold át a gitben nem lévő eredeti fotókat:

```
cp -R ~/Dropbox/Privat/zanzibar-hotel/projekt/inbox ~/hasienda/
npm install
npm run dev        # http://localhost:4321/
```

Titkos kulcs (`.env`) ebben a projektben még nincs.

## 2. Hol mi van

| Mi | Hol |
|---|---|
| Szövegek, 8 nyelv | `src/i18n/*.ts` (ellenőrzés: `node scripts/check-i18n.mjs`) |
| Oldal / keret / viselkedés | `src/pages/[lang]/index.astro`, `src/layouts/Base.astro`, `src/scripts/` |
| Stílus | `src/styles/global.css` |
| Elérhetőségek, GPS | `src/i18n/site.ts` |
| A hotel eredeti fotói | `inbox/` (nincs gitben), beemelés: `node scripts/use-photos.mjs` |
| Nyitott teendők | `TODO.md`, döntések: `BRIEF.md` |

## 3. Döntések (2026-11-26)

- Magyar: **tegező**. A német, olasz, spanyol is tegező. A francia (vous), orosz (вы) és arab udvarias forma maradt,
  mert ott a szállodai nyelvben ez a megszokott – ha a megrendelő mást kér, átírható.
- Kamerák, őrzés, tematikus estek, 50+ növényfaj stb.: **fix, hivatalos információ**.
- Az itallap és a reggeli menü a hoteltől kapott hivatalos lap alapján pontos, árat nem módosítunk.
- A hotel fotói **érintetlenül** kerülnek fel (se színezés, se MI-szerkesztés).
- A tulaj saját Welcome / Nungwi szövege a magyar alap.

## 4. Nyitva

- Messenger: a szöveg említi, de nincs link az oldalon (linket kérni, vagy kivenni).
- Fordítások anyanyelvi átolvasása (főleg arab, orosz).
- Fotók: szobabelső, tengerpart; `nungwi`, `transfer`, `excursions`, `book` ideiglenes hangulatkép.
- Szobanevek a „1–4. szoba” helyett.
- Lábléc: a „Designed & built by SA Software” a privát Gmailre mutat – céges oldal / e-mail legyen?
- Élesítés előtt `noindex` törlése (meta, `netlify.toml`, `public/robots.txt`); domain (.com, Cloudflare).
- Következő fázis: foglalás háttere (Supabase) → PMS + QR → fizetés → Wallet.
- Külön ötlet: saját SA Software weboldal.

## 5. Claude-nak (első üzenet otthon)

> Olvasd el az `OTTHON-FOLYTATAS.md`-t és a `~/Dropbox/Privat/zanzibar-hotel/_claude-memoria/` mappát,
> és frissítsd belőle a memóriádat. Innen folytatjuk.
