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
- DEMO fotók (Wikimedia Commons, scripts/fetch-demo-photos.mjs): hero, welcome, nungwi (Paul W, CC0), house (Eric Kilby, CC BY-SA 2.0 – a láblécben jelölve). Valódi fotóknál a lábléc photoCredit sor törlendő
- public/images/ szobák: room-1..4.jpg (még placeholder, valódi szobafotó nincs); eredeti lista: hero.jpg, welcome.jpg, room-1..4.jpg, house.jpg, nungwi.jpg (barna/zöld átmenetek "PLACEHOLDER" felirattal; újragenerálás: node scripts/gen-placeholders.mjs)
- A szövegekben "To be confirmed" jelölésű részek (szobaleírás, ár, épület, távolságok, fizetés) valós adatra cserélendők, a jelölő (.tbc) ezután törölhető
- Jogi cégnév a lábléc copyright sorába (most: Aurora Hacienda Zanzibar)
- Űrlap nincs bekötve (Supabase / e-mail a 2. fázisban)
- Fordítások (DE, RU, FR, ES, IT, AR): az EN szöveg véglegesítése után; addig az oldal csak EN, a nyelvválasztó rejtve
