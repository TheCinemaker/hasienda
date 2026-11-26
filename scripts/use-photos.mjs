// Copies the hotel's own photos, UNEDITED (owner's wish), from inbox/ (git-ignored) to the site's file names.
// To swap a photo: change the source file name here and run:  node scripts/use-photos.mjs
import { copyFileSync } from 'node:fs';

const MAP = {
  'hero.jpg': '5a3729e8-3fa6-4248-8e0a-e982fff798fb.jpg',     // pool + bungalow row
  'welcome.jpg': 'e008cf19-3b30-49b8-99f1-dceb50740218.jpg',  // pool, thatched roofs, palms
  'house.jpg': '6bd8c09f-118e-456d-a7aa-8278bcb1bb98.jpg',    // thatched building, garden
  'dining.jpg': '73002d60-8a9a-4deb-b4c5-9100fa6d4fd4.jpg',   // restaurant terrace
  'book.jpg': '404766bb-d3ec-4925-8b3a-61bdf6063cea.jpg',     // night terrace
  'room-1.jpg': '2cbcec66-c9b7-4d91-9b53-baa425cbc31c.jpg',   // room terrace + door
  'room-2.jpg': '5b399315-03ea-4724-a52e-3a86a71d490f.jpg',   // room entrance, garden
  'room-3.jpg': 'b06cae73-b084-4367-a8d4-3562458e7ca6.jpg',   // room entrance, garden
  'room-4.jpg': 'f841f544-8ce8-4673-961b-efa04d263e94.jpg',   // room entrance, pool side
};

for (const [name, file] of Object.entries(MAP)) {
  copyFileSync(`inbox/${file}`, `public/images/${name}`);
  console.log('copied', name);
}
