import { shop } from '../data/site.js';
import { firebaseConfig } from '../data/firebase-config.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lang = document.body.dataset.lang || 'en';

/* Open / closed, printed like a meter reading (Salem time). */
function updateStatus() {
  const el = document.getElementById('status');
  if (!el) return;
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());
  const h = Number(parts.find((p) => p.type === 'hour').value);
  const m = Number(parts.find((p) => p.type === 'minute').value);
  const now = h * 60 + m;
  const [oh, om] = shop.hours.open;
  const [ch, cm] = shop.hours.close;
  const open = now >= oh * 60 + om && now < ch * 60 + cm;
  el.classList.toggle('is-open', open);
  el.querySelector('.meter-text').textContent = open ? el.dataset.open : el.dataset.closed;
}
updateStatus();
setInterval(updateStatus, 60_000);

/* The busbar starts under the logo's tap and fills with current as you read. */
const main = document.querySelector('main');
const bus = document.querySelector('.bus');
const stage = document.querySelector('.mark-stage');
function placeBus() {
  if (!bus || !stage) return;
  const mainTop = main.getBoundingClientRect().top + window.scrollY;
  let top;
  if (window.matchMedia('(max-width: 820px)').matches) {
    // Phones: the logo sits above the copy, so the busbar starts at the board.
    top = document.querySelector('.board').getBoundingClientRect().top + window.scrollY - mainTop;
  } else {
    // The drop hangs at about 93% of the stage height.
    const s = stage.getBoundingClientRect();
    top = s.top + window.scrollY - mainTop + s.height * 0.93;
  }
  bus.style.setProperty('--bus-top', `${Math.round(top)}px`);
  bus.style.top = `${Math.round(top)}px`;
}
let ticking = false;
function fillBus() {
  ticking = false;
  if (!bus) return;
  const r = bus.getBoundingClientRect();
  const reach = window.innerHeight * 0.62 - r.top;
  const p = Math.min(1, Math.max(0, reach / Math.max(r.height, 1)));
  bus.style.setProperty('--p', reduced ? 1 : p.toFixed(4));
}
placeBus();
fillBus();
window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(fillBus);
    }
  },
  { passive: true },
);
window.addEventListener('resize', () => {
  placeBus();
  fillBus();
});
document.fonts?.ready.then(() => {
  placeBus();
  fillBus();
});

/* Only the circuit in view is live; its MCB on the board switches on. */
const circuits = [...document.querySelectorAll('[data-circuit]')];
const mcbs = [...document.querySelectorAll('.mcb')];
function setLive(target) {
  for (const c of circuits) c.classList.toggle('is-live', c === target);
  const id = target?.id;
  for (const b of mcbs) {
    const on = b.dataset.target === id;
    b.classList.toggle('is-on', on);
    if (on) b.setAttribute('aria-current', 'true');
    else b.removeAttribute('aria-current');
  }
}
const visible = new Map();
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) visible.set(e.target, e.isIntersecting ? e.intersectionRatio : 0);
    let best = null;
    let bestTop = Infinity;
    for (const c of circuits) {
      if ((visible.get(c) || 0) <= 0) continue;
      const top = Math.abs(c.getBoundingClientRect().top - window.innerHeight * 0.3);
      if (top < bestTop) {
        bestTop = top;
        best = c;
      }
    }
    if (best) setLive(best);
  },
  { rootMargin: '-25% 0px -45% 0px', threshold: [0, 0.01, 0.5, 1] },
);
circuits.forEach((c) => io.observe(c));
for (const b of mcbs) {
  b.addEventListener('click', () => {
    const target = document.getElementById(b.dataset.target);
    if (target) setLive(target);
  });
}

/* Three.js logo, after first paint, only where WebGL works. */
// Hardware WebGL only: a software rasteriser (no GPU) keeps the crisp flat mark.
// `?force3d` overrides this for testing.
function canWebGL() {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    if (!gl) return false;
    if (new URLSearchParams(location.search).has('force3d')) return true;
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const name = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
    return !/swiftshader|llvmpipe|software|basic render/i.test(name);
  } catch {
    return false;
  }
}
const canvas = document.getElementById('logo3d');
if (canvas && canWebGL()) {
  const start = () =>
    import('./logo3d.js')
      .then(({ mountLogo3D }) => {
        mountLogo3D(canvas, { reducedMotion: reduced, onReady: () => stage.classList.add('has-3d') });
      })
      .catch(() => {});
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 1200 });
  else setTimeout(start, 300);
}

/* Offers come live from Firestore so the shop can change them without a redeploy. */
if (firebaseConfig?.projectId && firebaseConfig?.apiKey) {
  import('./offers.js').then(({ loadOffers }) => loadOffers(firebaseConfig, lang)).catch(() => {});
}
