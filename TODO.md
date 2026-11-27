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
- **Még ideiglenes MI-generált fotók (`public/images/`, azonos fájlnévvel cserélhetők):** `nungwi.jpg`, `transfer.jpg`, `excursions.jpg`, `book.jpg` (2400×1350 JPEG). A hotel saját fotói: `hero`, `welcome`, `house`, `dining`, `room-1..4` (a szobáknál bejárat/terasz – belső fotók még kellenek).
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

## Nyelvek és foglalás (2026-11-26)
- [x] 8 nyelv, nyelvválasztó, böngésző szerinti átirányítás, saját naptár az oldal nyelvén
- [x] Foglalás modalban; hosszú ugrásoknál átúsztatás
- [ ] Anyanyelvi átolvasás, elsősorban arab és orosz; a magyart a tulaj nézze át
- [ ] A tulaj hagyja jóvá a Welcome / Nungwi szöveg fordításait (az eredetit ő küldte HU + EN nyelven)
- [ ] Élesítéskor a noindex mindhárom helyről törlendő (meta, netlify.toml header, public/robots.txt)

## Szobák (2026-11-27)
- [x] A 4 szoba egyforma: egy szoba-szekció + galéria modal
- [ ] Szobabelső fotók (egész szoba 2 sarokból, fürdő, részletek, terasz; fekvő, eredeti fájl) → public/images/room/ mappába, fájlnév szerinti sorrend, a 01 a borítókép

## Tulaj, 2026-11-27 (2. kör) – felülírja a "Szobák" bejegyzést
- [x] Vissza a 4 külön szobára, nevekkel: 1 Kleopátra, 2 Diana, 3 II. Erzsébet, 4 Hatsepszut
- [ ] Tulaj erősítse meg, melyik fotó / ajtó melyik szobanévhez tartozik; szobánkénti saját fotók
- [x] Eredeti reggeli- és itallap képként is (angol)
- [x] Reptéri transzfer csak igény esetén; nagy teljesítményű generátor
- Alkoholos italoknak szándékosan nincs ára (beszerzés miatt) – nem hiba, ne pótoljuk
