// Copies the hotel's own photos, UNEDITED (owner's wish), from inbox/ (git-ignored) to the site's file names.
// To swap a photo: change the source file name here and run:  node scripts/use-photos.mjs
import { copyFileSync } from 'node:fs';

const MAP = {
  'hero.jpg': '5a3729e8-3fa6-4248-8e0a-e982fff798fb.jpg',     // pool + bungalow row
  'welcome.jpg': 'e008cf19-3b30-49b8-99f1-dceb50740218.jpg',  // pool, thatched roofs, palms
  'house.jpg': '6bd8c09f-118e-456d-a7aa-8278bcb1bb98.jpg',    // thatched building, garden
  'dining.jpg': '73002d60-8a9a-4deb-b4c5-9100fa6d4fd4.jpg',   // restaurant terrace
  // book.jpg is deliberately not listed: it was replaced with a mood image on 2026-11-26
  // room gallery: every .jpg in public/images/room/ is shown, in file name order (01 is the cover)
  'room/01.jpg': '2cbcec66-c9b7-4d91-9b53-baa425cbc31c.jpg', // terrace + door
  'room/02.jpg': '5b399315-03ea-4724-a52e-3a86a71d490f.jpg', // entrance with bench
  'room/03.jpg': 'f841f544-8ce8-4673-961b-efa04d263e94.jpg', // room front towards the pool
  'room/04.jpg': 'c7d667c0-0d00-48ca-97e8-c87943893c59.jpg', // the row of rooms
};

for (const [name, file] of Object.entries(MAP)) {
  copyFileSync(`inbox/${file}`, `public/images/${name}`);
  console.log('copied', name);
}
