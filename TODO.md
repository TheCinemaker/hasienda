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

## Képek állapota (cserélendő ideiglenesek azonos fájlnévvel)
- **VALÓDI hotel fotók (színkorrigálva az oldal arany-obszidián-türkiz palettájához, `inbox/`-ból):** `hero.jpg`, `welcome.jpg`, `dining.jpg`, `house.jpg` (2400×1350 JPEG).
- **Még ideiglenes MI-generált fotók (`public/images/`, azonos fájlnévvel cserélhetők):** `room-1.jpg`, `room-2.jpg`, `room-3.jpg`, `room-4.jpg`, `nungwi.jpg`, `transfer.jpg`, `excursions.jpg`, `book.jpg` (2400×1350 JPEG).
- **Hivatalos logó:** `logo-seal.png` (arany-obszidián hivatalos pecsét, 512×512 PNG).
- A szövegekben "To be confirmed" jelölésű részek (egyedi szobaleírások, pontos szobaárak/kirándulás-árak, pontos távolságok, fizetés) valós adatra cserélendők, a jelölő (.tbc) ezután törölhető
- Jogi cégnév a lábléc copyright sorába (most: Aurora Hacienda Zanzibar)
- Foglalási űrlap: előtöltött WhatsApp (`+36303852459`) és e-mail (`aurorahaciendazanzibar@gmail.com`) küldés aktív; Supabase / saját PMS a 2. fázisban
- Fordítások (DE, RU, FR, ES, IT, AR): az EN szöveg véglegesítése után; addig az oldal csak EN, a nyelvválasztó rejtve

## Kivett helyőrző szövegek (2026-11-26) – ha megjön az adat, visszakerülhet
- Szobák egyedi leírása (4 db)
- Épület, kert, közös terek bővebb leírása
- Távolság: tengerpart, reptér, Stone Town
- Reptéri transzfer részletei és díja
- Kirándulások listája és ára
