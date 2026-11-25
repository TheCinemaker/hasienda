// Only the ROOM placeholders remain (no room photos exist yet); hero/welcome/house/nungwi use demo photos from scripts/fetch-demo-photos.mjs.
// Temporary placeholder "photos" (dawn-sky style). Replace each file with the real photo using the SAME file name.
import sharp from 'sharp';
// name, w, h, [sky top, sky mid, horizon glow, ground]
const list = [
  ['room-1', 2400, 1400, ['#3a2a28', '#a85d3c', '#f2b27a', '#2a1c17']],
  ['room-2', 2400, 1400, ['#23383a', '#4f7a74', '#e9c79a', '#1d2a28']],
  ['room-3', 2400, 1400, ['#3b2438', '#a24f66', '#f0a78c', '#2a1822']],
  ['room-4', 2400, 1400, ['#2c2a22', '#8a7342', '#f0cf94', '#221e16']],
];
for (const [n, w, h, [a, b, c, d]] of list) {
  const fs = Math.round(w / 90), m = Math.round(w / 40);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset=".8" stop-color="${c}"/><stop offset=".8" stop-color="${d}"/><stop offset="1" stop-color="#000"/></linearGradient>
    <radialGradient id="g" cx=".5" cy=".8" r=".55"><stop offset="0" stop-color="${c}" stop-opacity=".9"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#s)"/><rect width="100%" height="100%" fill="url(#g)"/>
  <text x="${w / 2}" y="${Math.round(h * 0.17)}" text-anchor="middle" fill="#fff" fill-opacity=".4" font-family="Arial" font-size="${fs}">PLACEHOLDER  ${n}.jpg</text></svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 84 }).toFile(`public/images/${n}.jpg`);
}
