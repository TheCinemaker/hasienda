// Swipeable photo gallery: native scroll snapping, arrows, thumbnails and arrow keys. Works left-to-right and right-to-left.
export function initGallery(root: HTMLElement | null) {
  if (!root) return null;
  const track = root.querySelector<HTMLElement>('.gallery-track')!;
  const slides = [...root.querySelectorAll<HTMLElement>('.gallery-slide')];
  const thumbs = [...root.querySelectorAll<HTMLButtonElement>('[data-slide]')];
  const strip = root.querySelector<HTMLElement>('.gallery-thumbs')!;
  const now = root.querySelector<HTMLElement>('#gallery-now')!;
  const rtl = document.documentElement.dir === 'rtl';
  let current = 0;

  const mark = (i: number) => {
    current = i;
    now.textContent = String(i + 1);
    thumbs.forEach((t, j) => (j === i ? t.setAttribute('aria-current', 'true') : t.removeAttribute('aria-current')));
    const t = thumbs[i].getBoundingClientRect(), s = strip.getBoundingClientRect();
    if (t.left < s.left || t.right > s.right) strip.scrollBy({ left: t.left - s.left - (s.width - t.width) / 2, behavior: 'smooth' });
  };
  const show = (i: number, behavior: ScrollBehavior = 'smooth') => {
    const target = slides[(i + slides.length) % slides.length];
    track.scrollBy({ left: target.getBoundingClientRect().left - track.getBoundingClientRect().left, behavior });
  };

  const seen = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) mark(slides.indexOf(e.target as HTMLElement)); }), { root: track, threshold: 0.6 });
  slides.forEach((s) => seen.observe(s));

  root.querySelector('.gallery-prev')!.addEventListener('click', () => show(current - 1));
  root.querySelector('.gallery-next')!.addEventListener('click', () => show(current + 1));
  thumbs.forEach((t) => t.addEventListener('click', () => show(Number(t.dataset.slide))));
  addEventListener('keydown', (e) => {
    if (!root.closest('.sheet-modal.open') || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
    e.preventDefault();
    show(current + ((e.key === 'ArrowRight') !== rtl ? 1 : -1));
  });

  return {
    reset() {
      show(0, 'auto');
      root.closest('.sheet-body')?.scrollTo({ top: 0 });
    },
  };
}
