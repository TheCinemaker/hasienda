# TODO

## Design-referenciák
- Atlantis The Palm: teljes képernyős képes szekciók, középre igazított felirat, körvonalas gomb, oldalsó pöttyök
- The Mora Zanzibar: foglalósáv a hero alján, vonalas SVG ikonos gyorsgombok, helyi idő
- Hátra: hőmérséklet (időjárás API), tényleges szabad-szoba ellenőrzés a foglalósávban

## Fázisok
1. **Bemutatkozó oldal** (statikus, 7 nyelv, RTL az arabhoz) – Cloudflare Pages
2. **Foglalási kérés + rendelkezésre állás** (Supabase)
3. **Online fizetés** (szolgáltató nyitott kérdés)
4. **PMS + recepciós QR-beolvasás**
5. **Apple Wallet / Google Wallet jegy**

## Nyitott kérdések
- [ ] Hotel neve, szobaszám, szobatípusok, árak (csak valós adat!)
- [x] Nincs Booking.com / Insta, és nem is lesz, csak ha muszáj → nincs channel manager, csak közvetlen foglalás (ha később mégis: Beds24 kapcsolat)
- [ ] Fizetés: előleg vagy érkezéskor? Melyik cég/ország nevén fut a kereskedői fiók (Stripe TZ-ben nem elérhető → Pesapal / Flutterwave / DPO?)
- [x] Saját, egyszerű PMS (4 szoba, csak közvetlen foglalás)
- [ ] Domain név (.com), ki a regisztráló
- [ ] Fotók, logó, szövegek (fordítások: gépi + anyanyelvi ellenőrzés?)

## Fiókok / költségek, amit ügyfélnek kell intézni
- [ ] Apple Developer Program (Wallet pass tanúsítvány)
- [ ] Google Wallet Issuer fiók
- [ ] Cloudflare, Supabase fiók (ügyfél tulajdonában)

## Ideiglenes képek (cserélendő, azonos fájlnévvel)
- MI-generált ideiglenes luxury fotók (`public/images/`): `hero.jpg`, `welcome.jpg`, `room-1.jpg`, `room-2.jpg`, `room-3.jpg`, `room-4.jpg`, `house.jpg`, `nungwi.jpg`, `transfer.jpg`, `excursions.jpg`, `book.jpg`. Mind a 11 fájl 2400×1350 (16:9) JPEG, ugyanazzal a fájlnévvel cserélhető valódi fotóra (a korábbi Wikimedia Commons demo fotók és a lábléc `photoCredit` sor eltávolítva).
- Ideiglenes CC0 stock fotó: `dining.jpg` (Rawpixel / Openverse CC0, 2400×1350 – valódi étteremfotóra cserélendő).
- Hivatalos logó: `logo-seal.png` (tulaj FB-on is használt kör alakú pecsétje átlátszó háttérrel feldolgozva).
- A szövegekben "To be confirmed" jelölésű részek (egyedi szobaleírások, pontos szobaárak/kirándulás-árak, pontos távolságok, fizetés) valós adatra cserélendők, a jelölő (.tbc) ezután törölhető
- Jogi cégnév a lábléc copyright sorába (most: Aurora Hacienda Zanzibar)
- Foglalási űrlap: előtöltött WhatsApp (`+36303852459`) és e-mail (`aurorahaciendazanzibar@gmail.com`) küldés aktív; Supabase / saját PMS a 2. fázisban
- Fordítások (DE, RU, FR, ES, IT, AR): az EN szöveg véglegesítése után; addig az oldal csak EN, a nyelvválasztó rejtve
