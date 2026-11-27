// Runs before every build: makes light WebP versions of the photos (same picture, only resized and re-encoded),
// the social sharing image and the icons. The originals in public/images/ stay untouched.
import sharp from 'sharp';
import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';

const SRC = 'public/images';
const OUT = 'public/images/opt';
mkdirSync(OUT, { recursive: true });
mkdirSync('src/generated', { recursive: true });

const manifest = {};
for (const file of readdirSync(SRC).filter((f) => f.endsWith('.jpg'))) {
  const name = file.slice(0, -4);
  const meta = await sharp(`${SRC}/${file}`).metadata();
  const widths = [...new Set([900, 1500, 2200].map((w) => Math.min(w, meta.width)))];
  for (const w of widths) {
    await sharp(`${SRC}/${file}`).rotate().resize({ width: w }).webp({ quality: 78 }).toFile(`${OUT}/${name}-${w}.webp`);
  }
  manifest[name] = { width: meta.width, height: meta.height, widths };
}
writeFileSync('src/generated/images.json', JSON.stringify(manifest, null, 2));

await sharp(`${SRC}/hero.jpg`).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 84, mozjpeg: true }).toFile('public/og.jpg');
const logo = `${SRC}/logo-seal.png`;
for (const [file, size] of [['images/opt/logo-192.png', 192], ['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180]]) {
  await sharp(logo).resize(size, size).png({ compressionLevel: 9, palette: true }).toFile(`public/${file}`);
}
console.log(`images: ${Object.keys(manifest).length} photos optimised`);
