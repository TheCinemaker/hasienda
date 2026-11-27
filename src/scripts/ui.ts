import Lenis from 'lenis';
import { initDatePickers } from './dates';
import { initGallery } from './gallery';

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

  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : null;
  const destination = el ? el.getBoundingClientRect().top + scrollY : Number(target);
  const done = () => {
    programmaticScroll = false;
  };
  const jump = () => {
    if (lenis) lenis.scrollTo(destination, { immediate: true, force: true });
    else scrollTo({ top: destination, behavior: 'auto' });
  };

  if (!reduce && Math.abs(destination - scrollY) > innerHeight * 1.25) {
    const curtain = $('curtain');
    curtain.classList.add('on');
    window.setTimeout(() => {
      jump();
      setHeaderHidden(false);
      window.setTimeout(() => {
        curtain.classList.remove('on');
        done();
      }, 160);
    }, 380);
    return;
  }

  if (lenis) lenis.scrollTo(destination, { duration: 1.2, easing: (t: number) => 1 - Math.pow(1 - t, 4), onComplete: done });
  else scrollTo({ top: destination, behavior: reduce ? 'auto' : 'smooth' });
  programTimer = window.setTimeout(done, 1400);
};
(window as any).__goTo = goTo;

document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
  if (!a || a.getAttribute('href') === '#') return;
  const id = a.getAttribute('href')!;
  if (id === '#book') {
    // booking opens on top of the page, wherever the visitor is
    e.preventDefault();
    openSheet(bookModal, a);
    return;
  }
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
  if (e.key === 'Escape') {
    if (menu.classList.contains('open')) setMenu(false);
    closeSheet();
  }
});

/* ---------- sheets (modals): menus and booking ---------- */
type Sheet = HTMLElement & { inert: boolean };
const diningModal = document.getElementById('dining-modal') as Sheet | null;
const bookModal = document.getElementById('book-modal') as Sheet | null;
const roomModal = document.getElementById('room-modal') as Sheet | null;
const roomGallery = initGallery(document.getElementById('room-gallery'));
document.querySelectorAll<HTMLElement>('[data-open-room]').forEach((btn) => {
  btn.addEventListener('click', () => {
    openSheet(roomModal, btn);
    roomGallery?.reset();
  });
});
let sheetTrigger: HTMLElement | null = null;

const openedSheet = () => document.querySelector<Sheet>('.sheet-modal.open');

const hideSheet = (sheet: Sheet) => {
  if (sheet.contains(document.activeElement)) sheetTrigger?.focus({ preventScroll: true });
  sheet.querySelectorAll<any>('input').forEach((i) => i._flatpickr?.close());
  sheet.classList.remove('open');
  sheet.setAttribute('aria-hidden', 'true');
  sheet.inert = true;
};

function openSheet(sheet: Sheet | null, trigger?: HTMLElement | null) {
  if (!sheet || sheet.classList.contains('open')) return;
  const other = openedSheet();
  if (other) hideSheet(other);
  sheetTrigger = trigger || null;
  sheet.classList.add('open');
  sheet.setAttribute('aria-hidden', 'false');
  sheet.inert = false;
  document.body.classList.add('lock');
  setHeaderHidden(true);
  lenis?.stop();
  sheet.querySelector<HTMLElement>('.sheet-close')?.focus({ preventScroll: true });
  // the phone's own back button should close the sheet, not leave the page
  if (!history.state?.sheet) history.pushState({ sheet: true }, '');
}

function closeSheet() {
  const sheet = openedSheet();
  if (!sheet) return;
  hideSheet(sheet);
  if (!menu.classList.contains('open')) {
    document.body.classList.remove('lock');
    lenis?.start();
  }
  setHeaderHidden(false);
  if (history.state?.sheet) history.back();
}

addEventListener('popstate', closeSheet);
document.querySelectorAll<HTMLElement>('.sheet-modal [data-close-modal], #dining-modal-close, #dining-modal-back').forEach((el) => el.addEventListener('click', closeSheet));
// the calendar floats above the sheet, so close it when the sheet content scrolls
bookModal?.querySelector('.sheet-body')?.addEventListener('scroll', () => bookModal.querySelectorAll<any>('input').forEach((i) => i._flatpickr?.close()), { passive: true });
(window as any).__openBooking = () => openSheet(bookModal);

const diningBody = document.getElementById('dining-modal-body') as HTMLElement | null;
const setDiningTab = (tab: string) => {
  if (!diningModal) return;
  diningModal.querySelectorAll<HTMLButtonElement>('[data-tab]').forEach((btn) => {
    btn.setAttribute('aria-selected', String(btn.dataset.tab === tab));
  });
  diningModal.querySelectorAll<HTMLElement>('.sheet-panel').forEach((panel) => {
    panel.hidden = panel.id !== `tab-${tab}`;
  });
  if (diningBody) diningBody.scrollTop = 0;
};
document.querySelectorAll<HTMLElement>('[data-open-menu]').forEach((btn) => {
  btn.addEventListener('click', () => {
    setDiningTab(btn.dataset.openMenu || 'breakfast');
    openSheet(diningModal, btn);
  });
});
diningModal?.querySelectorAll<HTMLButtonElement>('[data-tab]').forEach((btn) => {
  btn.addEventListener('click', () => setDiningTab(btn.dataset.tab || 'breakfast'));
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
  // replays in both directions: show when enough is visible, reset only once fully off screen
  const ro = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) e.target.classList.remove('in');
        else if (e.intersectionRatio >= 0.16) show(e.target);
      }),
    { threshold: [0, 0.16] }
  );
  // the hero waits a moment on first load, so the entrance is seen
  setTimeout(() => document.querySelectorAll('.reveal').forEach((el) => ro.observe(el)), 220);
}

/* ---------- back to top ---------- */
const toTop = $('to-top');
const small = matchMedia('(max-width: 860px)');
let prevTopY = scrollY;
const updateToTop = () => {
  const y = scrollY;
  const past = y > innerHeight * 0.9;
  // on phones show it only while scrolling up, so it never covers the buttons being read
  const goingDown = y > prevTopY;
  if (y !== prevTopY) toTop.classList.toggle('show', past && !(small.matches && goingDown));
  else if (!past) toTop.classList.remove('show');
  prevTopY = y;
};
addEventListener('scroll', updateToTop, { passive: true });
toTop.addEventListener('click', () => goTo(0));

/* ---------- language switcher ---------- */
const langSwitch = document.getElementById('lang-switch') as HTMLDetailsElement | null;
document.addEventListener('click', (e) => {
  const link = (e.target as HTMLElement).closest('a[data-lang]') as HTMLAnchorElement | null;
  if (link) {
    // remember the visitor's choice for the next visit to the start page
    try { localStorage.setItem('lang', link.dataset.lang!); } catch { /* private mode */ }
  }
  if (langSwitch?.open && !langSwitch.contains(e.target as Node)) langSwitch.open = false;
});
addEventListener('keydown', (e) => { if (e.key === 'Escape' && langSwitch) langSwitch.open = false; });

/* ---------- date pickers in the page language ---------- */
initDatePickers();

// a shared link ending in #book opens the booking sheet straight away
if (location.hash === '#book') openSheet(bookModal);
