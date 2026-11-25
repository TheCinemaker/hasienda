import sharp from 'sharp';
import fs from 'node:fs';
const out = 'c:/Users/Szilveszter/Projects/zanzibar-hotel/public/images';
const list = {
  hero: 'Nungwi Beach, Zanzibar, Tanzania (south view from Z Hotel).jpg',
  welcome: 'Bathers on Nungwi Beach, Zanzibar, Tanzania.jpg',
  nungwi: 'Tourists and local people on Nungwi Beach, Zanzibar, Tanzania.jpg',
  house: 'Ornate Carved Door in Zanzibar.jpg',
};
for (const [n, f] of Object.entries(list)) {
  const url = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(f) + '?width=2400';
  const r = await fetch(url, { headers: { 'User-Agent': 'demo-image-lookup/1.0' }, redirect: 'follow' });
  if (!r.ok) { console.log(n, 'HTTP', r.status); continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  await sharp(buf).rotate().resize({ width: 2400, withoutEnlargement: true }).jpeg({ quality: 82 }).toFile(`${out}/${n}.jpg`);
  console.log(n, 'ok', buf.length);
}
