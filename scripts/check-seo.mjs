// Checks the built site (run after: npm run build): titles, descriptions, canonical, hreflang,
// structured data, headings, image descriptions, sitemap, robots and that referenced files exist.
import { existsSync, readFileSync } from 'node:fs';

const langs = ['en', 'hu', 'de', 'fr', 'it', 'es', 'ru', 'ar'];
let problems = 0;
const bad = (page, msg) => (problems++, console.log(`PROBLEM ${page}: ${msg}`));
const titles = new Set();

for (const l of langs) {
  const html = readFileSync(`dist/${l}/index.html`, 'utf8');
  const one = (re) => re.exec(html)?.[1] ?? '';
  const title = one(/<title>([^<]*)<\/title>/);
  const desc = one(/<meta name="description" content="([^"]*)"/);
  if (!title || title.length > 65) bad(l, `title length ${title.length}`);
  if (desc.length < 70 || desc.length > 165) bad(l, `description length ${desc.length}`);
  titles.add(title);
  if (!one(/<link rel="canonical" href="([^"]*)"/).endsWith(`/${l}/`)) bad(l, 'canonical');
  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="(https?:[^"]+)"/g)];
  if (alternates.length !== 9) bad(l, `hreflang count ${alternates.length}`);
  for (const k of ['og:title', 'og:image', 'og:url', 'og:locale']) if (!html.includes(`property="${k}"`)) bad(l, k);
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) bad(l, 'h1 count');
  try {
    const data = JSON.parse(one(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/));
    const hotel = data['@graph'].find((x) => x['@type'] === 'Hotel');
    if (!hotel?.geo || !hotel.address || !hotel.telephone || hotel.numberOfRooms !== 4) bad(l, 'hotel data incomplete');
    for (const img of hotel.image) if (!existsSync('dist' + new URL(img).pathname)) bad(l, 'schema image missing ' + img);
  } catch (e) {
    bad(l, 'JSON-LD ' + e.message);
  }
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const photos = imgs.filter((i) => /class="panel-img/.test(i));
  for (const i of photos) if (!/ alt="[^"]{10,}"/.test(i)) bad(l, 'photo without description');
  for (const m of html.matchAll(/(?:src|href|data-preview)="(\/(?:images|icon|apple|og|site\.web)[^"]*)"/g)) if (!existsSync('dist' + m[1])) bad(l, 'missing file ' + m[1]);
  for (const m of html.matchAll(/(\/images\/opt\/[a-z0-9-]+\.webp) \d+w/g)) if (!existsSync('dist' + m[1])) bad(l, 'missing file ' + m[1]);
  console.log(l, `title ${title.length}, description ${desc.length}, photos ${photos.length}, ${/content="noindex/.test(html) ? 'noindex' : 'indexable'}`);
}
if (titles.size !== langs.length) bad('all', 'titles are not unique');
const map = readFileSync('dist/sitemap.xml', 'utf8');
if ((map.match(/<loc>/g) || []).length !== langs.length) bad('sitemap', 'url count');
console.log('robots.txt:', readFileSync('dist/robots.txt', 'utf8').trim().replace(/\n+/g, ' | '));
console.log(problems ? `${problems} problem(s)` : 'SEO checks passed');
process.exit(problems ? 1 : 0);
