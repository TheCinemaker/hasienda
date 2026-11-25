import Lenis from 'lenis';

const $ = (id: string) => document.getElementById(id) as HTMLElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- smooth scroll ---------- */
const lenis = reduce ? null : new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
(window as any).__lenis = lenis;
const goTo = (target: string | number) =>
  lenis ? lenis.scrollTo(target as any, { duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) })
        : typeof target === 'string' ? document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' }) : scrollTo({ top: target, behavior: 'smooth' });
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
  if (!a || a.getAttribute('href') === '#') return;
  const id = a.getAttribute('href')!;
  if (document.querySelector(id)) { e.preventDefault(); goTo(id); }
});

/* ---------- menu ---------- */
const menu = $('menu'), mb = $('menu-btn');
const setMenu = (open: boolean) => {
  menu.hidden = !open;
  mb.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('lock', open);
  open ? lenis?.stop() : lenis?.start();
};
mb.addEventListener('click', () => setMenu(true));
$('menu-close').addEventListener('click', () => setMenu(false));
menu.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('.menu-links a')) setMenu(false); });
addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

/* ---------- header, progress, parallax ---------- */
const header = document.querySelector('.site-header') as HTMLElement;
const bar = $('progress');
const imgs = [...document.querySelectorAll<HTMLElement>('.panel-img')];
let lastY = 0;
const onScroll = () => {
  const y = scrollY, vh = innerHeight;
  header.classList.toggle('solid', y > 40);
  header.classList.toggle('hide', y > lastY && y > vh * 0.6 && !document.body.classList.contains('lock'));
  lastY = y;
  const max = document.documentElement.scrollHeight - vh;
  bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  if (reduce) return;
  for (const img of imgs) {
    const r = (img.parentElement as HTMLElement).getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh + 100) continue;
    const p = (r.top + r.height / 2 - vh / 2) / vh; // -1..1
    img.style.translate = `0 ${(-p * r.height * 0.09).toFixed(1)}px`;
  }
};
if (lenis) lenis.on('scroll', onScroll); else addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
const raf = (t: number) => { lenis?.raf(t); requestAnimationFrame(raf); };
if (lenis) requestAnimationFrame(raf);
onScroll();

/* ---------- side dots ---------- */
const dots = $('dots'), secs = [...document.querySelectorAll<HTMLElement>('[data-dot]')];
secs.forEach((s, i) => {
  if (!s.id) return;
  const a = document.createElement('a');
  a.href = '#' + s.id; a.title = s.dataset.dot || ''; a.dataset.i = String(i);
  dots.appendChild(a);
});
const dio = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  const i = secs.indexOf(e.target as HTMLElement);
  dots.querySelectorAll<HTMLElement>('a').forEach((a) => a.classList.toggle('on', Number(a.dataset.i) === i));
}), { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
secs.forEach((s) => dio.observe(s));

/* ---------- text reveal: headings word by word, the rest staggered ---------- */
document.querySelectorAll<HTMLElement>('.reveal').forEach((block) => {
  let c = 0;
  [...block.children].forEach((el) => {
    const node = el as HTMLElement;
    if (/^H[12]$/.test(node.tagName)) {
      const words = (node.textContent || '').trim().split(/\s+/);
      node.setAttribute('aria-label', words.join(' '));
      node.innerHTML = words.map((w, i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`).join(' ');
      node.style.setProperty('--n', String(words.length));
      c = Math.max(c, 1);
    } else {
      node.style.setProperty('--c', String(c++));
    }
  });
});
const show = (el: Element) => el.classList.add('in');
if (reduce) document.querySelectorAll('.reveal').forEach(show);
else {
  const ro = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { show(e.target); ro.unobserve(e.target); } }), { threshold: 0.25 });
  document.querySelectorAll('.reveal').forEach((el) => {
    if (el.closest('.hero')) setTimeout(() => show(el), 250);
    else ro.observe(el);
  });
}
