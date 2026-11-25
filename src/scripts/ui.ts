import Lenis from 'lenis';

const $ = (id: string) => document.getElementById(id) as HTMLElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- smooth scroll ---------- */
const lenis = reduce
  ? null
  : new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.85,
      smoothWheel: true,
    });
(window as any).__lenis = lenis;

let programmaticScroll = false;
let programTimer = 0;

const goTo = (target: string | number) => {
  programmaticScroll = true;
  clearTimeout(programTimer);
  setHeaderHidden(false);

  if (lenis) {
    lenis.scrollTo(target as any, {
      duration: 1.5,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      onComplete: () => {
        programmaticScroll = false;
      },
    });
    programTimer = window.setTimeout(() => {
      programmaticScroll = false;
    }, 1700);
  } else {
    if (typeof target === 'string') {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      scrollTo({ top: target, behavior: 'smooth' });
    }
    programTimer = window.setTimeout(() => {
      programmaticScroll = false;
    }, 900);
  }
};
(window as any).__goTo = goTo;

document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
  if (!a || a.getAttribute('href') === '#') return;
  const id = a.getAttribute('href')!;
  if (document.querySelector(id)) {
    e.preventDefault();
    goTo(id);
  }
});

/* ---------- luxury menu curtain + live image preview ---------- */
const menu = $('menu') as HTMLElement & { inert: boolean };
const mb = $('menu-btn');
const previewImg = document.getElementById('menu-preview') as HTMLImageElement | null;
const defaultPreview = previewImg?.getAttribute('src') || '/images/hero.jpg';
let previewTimer = 0;

const swapPreview = (src: string) => {
  if (!previewImg || previewImg.getAttribute('src') === src) return;
  clearTimeout(previewTimer);
  previewImg.classList.add('switching');
  previewTimer = window.setTimeout(() => {
    const finish = () => previewImg.classList.remove('switching');
    previewImg.onload = finish;
    previewImg.src = src;
    if (previewImg.complete) finish();
  }, 140);
};

const closeBtn = $('menu-close');

const setMenu = (open: boolean) => {
  if (!open && menu.contains(document.activeElement)) {
    mb.focus({ preventScroll: true });
  }
  menu.classList.toggle('open', open);
  menu.setAttribute('aria-hidden', String(!open));
  menu.inert = !open;
  mb.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('lock', open);
  if (open) {
    setHeaderHidden(false);
    lenis?.stop();
    closeBtn.focus({ preventScroll: true });
  } else {
    lenis?.start();
    swapPreview(defaultPreview);
  }
};

mb.addEventListener('click', () => setMenu(true));
closeBtn.addEventListener('click', () => setMenu(false));
menu.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).closest('.menu-links a, .menu-mobile-cta')) setMenu(false);
});
menu.querySelectorAll<HTMLAnchorElement>('.menu-links a[data-preview]').forEach((link) => {
  const src = link.dataset.preview;
  if (!src) return;
  link.addEventListener('mouseenter', () => swapPreview(src));
  link.addEventListener('focus', () => swapPreview(src));
});
addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false);
});

/* ---------- flicker-free header state machine, progress & GPU parallax ---------- */
const header = document.querySelector('.site-header') as HTMLElement;
const progressBar = $('progress');
const mediaEls = [...document.querySelectorAll<HTMLElement>('.panel-media')];
const heroText = document.querySelector<HTMLElement>('.hero .panel-text');

let isSolid = false;
let isHidden = false;
let prevY = lenis ? lenis.scroll : scrollY;
let anchorY = prevY;
let direction: 1 | -1 | 0 = 0;

function setHeaderSolid(next: boolean) {
  if (isSolid === next) return;
  isSolid = next;
  header.classList.toggle('solid', next);
}

function setHeaderHidden(next: boolean) {
  if (isHidden === next) return;
  isHidden = next;
  header.classList.toggle('hide', next);
}

const onScroll = () => {
  const y = lenis ? lenis.scroll : scrollY;
  const vh = innerHeight;

  // Hysteresis for solid background prevents luminance strobe near threshold
  if (!isSolid && y > 70) setHeaderSolid(true);
  else if (isSolid && y < 30) setHeaderSolid(false);

  // Hysteresis for hide/show prevents flickering on micro-deltas & deceleration
  if (y < vh * 0.45 || document.body.classList.contains('lock') || programmaticScroll) {
    setHeaderHidden(false);
    direction = 0;
    anchorY = y;
  } else {
    const delta = y - prevY;
    if (Math.abs(delta) >= 0.5) {
      const nextDir: 1 | -1 = delta > 0 ? 1 : -1;
      if (direction !== nextDir) {
        direction = nextDir;
        anchorY = y;
      }
      if (direction === 1 && y - anchorY >= 52) setHeaderHidden(true);
      else if (direction === -1 && anchorY - y >= 28) setHeaderHidden(false);
    }
  }
  prevY = y;

  const max = document.documentElement.scrollHeight - vh;
  progressBar.style.transform = `scaleX(${max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0})`;

  if (reduce) return;

  const isMobile = innerWidth <= 860;
  const amp = isMobile ? 0.05 : 0.08;
  const scaleAmp = isMobile ? 0.03 : 0.045;

  for (const media of mediaEls) {
    const panel = media.parentElement as HTMLElement;
    const r = panel.getBoundingClientRect();
    if (r.bottom < -120 || r.top > vh + 120) continue;
    const p = (r.top + r.height / 2 - vh / 2) / vh; // roughly -1..1
    const ty = (-p * r.height * amp).toFixed(2);
    const scale = (1 + Math.min(Math.abs(p), 1) * scaleAmp).toFixed(4);
    media.style.transform = `translate3d(0, ${ty}px, 0) scale(${scale})`;
  }

  if (heroText) {
    const heroProgress = Math.min(Math.max(y / (vh * 0.7), 0), 1);
    heroText.style.transform = `translate3d(0, ${(-heroProgress * 26).toFixed(1)}px, 0)`;
    heroText.style.opacity = (1 - heroProgress * 0.8).toFixed(3);
  }
};

if (lenis) lenis.on('scroll', onScroll);
else addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll, { passive: true });

const raf = (t: number) => {
  lenis?.raf(t);
  requestAnimationFrame(raf);
};
if (lenis) requestAnimationFrame(raf);
onScroll();

/* ---------- side dots rail ---------- */
const dots = $('dots');
const secs = [...document.querySelectorAll<HTMLElement>('[data-dot]')];
secs.forEach((s, i) => {
  if (!s.id) return;
  const a = document.createElement('a');
  const label = s.dataset.dot || '';
  a.href = '#' + s.id;
  a.ariaLabel = label;
  a.dataset.i = String(i);
  a.innerHTML = `<span class="dot-label">${label}</span><span class="dot-pip"></span>`;
  dots.appendChild(a);
});

const dio = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      const i = secs.indexOf(e.target as HTMLElement);
      dots.querySelectorAll<HTMLElement>('a').forEach((a) => {
        a.classList.toggle('on', Number(a.dataset.i) === i);
      });
    }),
  { rootMargin: '-48% 0px -48% 0px', threshold: 0 }
);
secs.forEach((s) => dio.observe(s));

/* ---------- text reveal: headings word by word, the rest staggered ---------- */
document.querySelectorAll<HTMLElement>('.reveal').forEach((block) => {
  let c = 0;
  [...block.children].forEach((el) => {
    const node = el as HTMLElement;
    if (/^H[12]$/.test(node.tagName)) {
      const words = (node.textContent || '').trim().split(/\s+/);
      node.setAttribute('aria-label', words.join(' '));
      node.innerHTML = words
        .map((w, i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`)
        .join(' ');
      node.style.setProperty('--n', String(words.length));
      c = Math.max(c, 1);
    } else {
      node.style.setProperty('--c', String(c++));
    }
  });
});

const show = (el: Element) => el.classList.add('in');
if (reduce) {
  document.querySelectorAll('.reveal').forEach(show);
} else {
  const ro = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          show(e.target);
          ro.unobserve(e.target);
        }
      }),
    { threshold: 0.16 }
  );
  document.querySelectorAll('.reveal').forEach((el) => {
    if (el.closest('.hero')) setTimeout(() => show(el), 220);
    else ro.observe(el);
  });
}
