import { shop } from '../data/site.js';
import { products, categories, productImages } from '../data/catalog-demo.js';
import { firebaseConfig } from '../data/firebase-config.js';
import { art } from './illustrations.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const T = JSON.parse(document.getElementById('i18n-data').textContent);
const lang = T.lang;
const byId = Object.fromEntries(products.map((p) => [p.id, p]));
const toneOf = Object.fromEntries(categories.map((c) => [c.id, c.tone]));

/* Open / closed, in Salem time. */
function updateStatus() {
  const el = document.getElementById('status');
  if (!el) return;
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const now = Number(parts.find((p) => p.type === 'hour').value) * 60 + Number(parts.find((p) => p.type === 'minute').value);
  const open = now >= shop.hours.open[0] * 60 + shop.hours.open[1] && now < shop.hours.close[0] * 60 + shop.hours.close[1];
  el.classList.toggle('is-open', open);
  el.querySelector('.meter-text').textContent = open ? el.dataset.open : el.dataset.closed;
}
updateStatus();
setInterval(updateStatus, 60_000);

/* Catalogue: category chips + search. */
const cards = [...document.querySelectorAll('.card')];
const chips = [...document.querySelectorAll('.chip')];
const search = document.getElementById('search');
const count = document.getElementById('count');
const empty = document.getElementById('empty');
let activeCat = 'all';
function applyFilter() {
  const q = (search?.value || '').trim().toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);
  let shown = 0;
  for (const card of cards) {
    const okCat = activeCat === 'all' || card.dataset.cat === activeCat;
    const okText = words.every((w) => card.dataset.search.includes(w));
    card.hidden = !(okCat && okText);
    if (!card.hidden) shown++;
  }
  count.textContent = T.showing.replace(/\d+/, String(shown));
  empty.hidden = shown > 0;
}
for (const chip of chips) {
  chip.addEventListener('click', () => {
    activeCat = chip.dataset.cat;
    for (const c of chips) c.setAttribute('aria-pressed', String(c === chip));
    applyFilter();
    // If the reader is already inside the results, bring the first row back into view.
    const grid = document.getElementById('grid');
    const stacked = window.matchMedia('(max-width: 900px)').matches;
    const above = stacked ? document.querySelector('.filters').getBoundingClientRect().bottom : document.querySelector('.topbar').getBoundingClientRect().bottom;
    const top = grid.getBoundingClientRect().top - above;
    if (top < 0) window.scrollBy({ top: top - 16, behavior: reduced ? 'auto' : 'smooth' });
  });
}
search?.addEventListener('input', applyFilter);

/* Quantity steppers (cards and cart lines). */
function clampQty(v) {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(999, Math.max(1, n)) : 1;
}
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.qty button');
  if (!btn) return;
  const input = btn.parentElement.querySelector('input');
  input.value = clampQty(Number(input.value) + Number(btn.dataset.step));
  input.dispatchEvent(new Event('change', { bubbles: true }));
});

/* Cart: saved on this device, sent to the shop on WhatsApp. */
const KEY = 'sae-cart-v1';
const store = {
  get(k, fallback) {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {
      /* private mode: the cart still works for this visit */
    }
  },
};
let cart = store.get(KEY, []).filter((l) => byId[l.id]);
const lineKey = (l) => `${l.id}|${l.opt || ''}`;
const total = () => cart.reduce((s, l) => s + l.qty, 0);

function save() {
  store.set(KEY, cart);
  for (const el of document.querySelectorAll('[data-cart-count]')) {
    el.textContent = String(cart.length);
    el.classList.remove('bump');
    void el.offsetWidth;
    if (!reduced) el.classList.add('bump');
  }
  render();
}

for (const form of document.querySelectorAll('.card-form')) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = form.dataset.id;
    const opt = form.querySelector('select')?.value || '';
    const qty = clampQty(form.querySelector('input[name=qty]').value);
    const found = cart.find((l) => lineKey(l) === `${id}|${opt}`);
    if (found) found.qty = Math.min(999, found.qty + qty);
    else cart.push({ id, opt, qty });
    form.querySelector('input[name=qty]').value = 1;
    save();
    const btn = form.querySelector('.btn-add');
    const label = btn.textContent;
    btn.textContent = btn.dataset.added;
    btn.classList.add('is-added');
    setTimeout(() => {
      btn.textContent = label;
      btn.classList.remove('is-added');
    }, 1300);
  });
}

const dialog = document.getElementById('cart');
const linesEl = document.getElementById('cart-lines');
const summary = document.getElementById('cart-summary');
const nameEl = document.getElementById('cart-name');
const noteEl = document.getElementById('cart-note');
nameEl.value = store.get('sae-name', '');

function render() {
  dialog.classList.toggle('is-empty', cart.length === 0);
  summary.textContent = cart.length === 1 ? T.items[0] : T.items[1].replace(/\d+/, String(cart.length));
  linesEl.replaceChildren(
    ...cart.map((l, i) => {
      const p = byId[l.id];
      const li = document.createElement('li');
      li.className = `line tone-${toneOf[p.cat]}`;
      const pic = productImages[p.id];
      li.innerHTML = `${pic ? `<img class="line-photo" src="${pic}" width="56" height="56" alt="">` : `<span class="line-art">${art[p.kind]}</span>`}
        <p class="line-name"></p>
        <div class="qty"><button type="button" data-step="-1" aria-label="${T.less}">−</button><input type="number" min="1" max="999" inputmode="numeric" aria-label="${T.qty}"><button type="button" data-step="1" aria-label="${T.more}">+</button></div>
        <button type="button" class="line-remove">${T.remove}</button>`;
      const name = li.querySelector('.line-name');
      name.textContent = `${p.brand} ${p.name[lang]}`;
      if (l.opt) {
        const small = document.createElement('small');
        small.textContent = l.opt;
        name.append(small);
      }
      const input = li.querySelector('input');
      input.value = l.qty;
      input.addEventListener('change', () => {
        cart[i].qty = clampQty(input.value);
        input.value = cart[i].qty;
        store.set(KEY, cart);
      });
      li.querySelector('.line-remove').addEventListener('click', () => {
        cart.splice(i, 1);
        save();
      });
      return li;
    }),
  );
}

for (const b of document.querySelectorAll('[data-open-cart]')) {
  b.addEventListener('click', () => {
    render();
    dialog.showModal();
  });
}
document.querySelector('[data-close-cart]').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) dialog.close(); // backdrop
});
document.getElementById('cart-clear').addEventListener('click', () => {
  cart = [];
  save();
});
document.getElementById('cart-send').addEventListener('click', () => {
  if (!cart.length) return;
  const name = nameEl.value.trim();
  const note = noteEl.value.trim();
  store.set('sae-name', name);
  const lines = cart.map((l, i) => {
    const p = byId[l.id];
    return `${i + 1}. ${p.brand} ${p.name.en}${l.opt ? ` (${l.opt})` : ''} × ${l.qty}`;
  });
  const parts = [T.waIntro, '', ...lines, ''];
  if (name) parts.push(`${T.waName}: ${name}`);
  if (note) parts.push(`${T.waNote}: ${note}`);
  parts.push(T.waOutro);
  const msg = parts.join('\n');
  window.open(`https://wa.me/${T.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});
save();

/* Toran: the bulbs change blink pattern every few seconds. */
const toran = document.getElementById('toran');
if (toran && !reduced) {
  const modes = ['mode-chase', 'mode-alternate', 'mode-twinkle', 'mode-wave', 'mode-burst'];
  let m = 0;
  setInterval(() => {
    toran.classList.remove(modes[m]);
    m = (m + 1) % modes.length;
    toran.classList.add(modes[m]);
  }, 6000);
}

/* Fireworks over the hero: rockets rise and burst in festive colours. */
const fw = document.getElementById('fireworks');
if (fw && !reduced) {
  const ctx = fw.getContext('2d');
  const colors = ['#ffc23d', '#ff8a1f', '#ff4f8b', '#3fe0c8', '#9d63e8', '#ffffff', '#ffe066'];
  let W = 0;
  let H = 0;
  let dpr = 1;
  const rockets = [];
  const sparks = [];
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = fw.clientWidth;
    H = fw.clientHeight;
    fw.width = W * dpr;
    fw.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  size();
  window.addEventListener('resize', size);
  function launch() {
    rockets.push({
      x: W * (0.08 + Math.random() * 0.84),
      y: H,
      vy: -(H * 0.011 + Math.random() * H * 0.004),
      targetY: H * (0.12 + Math.random() * 0.35),
      color: colors[(Math.random() * colors.length) | 0],
    });
  }
  function burst(r) {
    const n = 46 + ((Math.random() * 24) | 0);
    const ring = Math.random() < 0.35;
    const second = colors[(Math.random() * colors.length) | 0];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const s = ring ? 2.6 : 0.8 + Math.random() * 2.4;
      sparks.push({ x: r.x, y: r.y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, color: i % 3 ? r.color : second, px: r.x, py: r.y });
    }
  }
  let running = true;
  let last = 0;
  let nextLaunch = 0;
  function tick(now) {
    if (!running) return;
    const dt = Math.min(2, (now - last) / 16.7 || 1);
    last = now;
    if (now > nextLaunch) {
      launch();
      if (Math.random() < 0.3) launch();
      nextLaunch = now + 700 + Math.random() * 1300;
    }
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.y += r.vy * dt;
      ctx.fillStyle = r.color;
      ctx.fillRect(r.x - 1, r.y, 2, 9);
      if (r.y <= r.targetY) {
        burst(r);
        rockets.splice(i, 1);
      }
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.px = s.x;
      s.py = s.y;
      s.vy += 0.035 * dt;
      s.vx *= 0.985;
      s.vy *= 0.985;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.life -= 0.0115 * dt;
      if (s.life <= 0) {
        sparks.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = s.life;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(s.px, s.py);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(tick);
  }
  new IntersectionObserver(([e]) => {
    const was = running;
    running = e.isIntersecting && !document.hidden;
    if (running && !was) requestAnimationFrame((t) => {
      last = t;
      tick(t);
    });
  }).observe(fw);
  document.addEventListener('visibilitychange', () => {
    const was = running;
    running = !document.hidden;
    if (running && !was) requestAnimationFrame(tick);
  });
  requestAnimationFrame(tick);
}

/* Hero shelf tiles jump into the catalogue with their category selected. */
for (const tile of document.querySelectorAll('[data-jump-cat]')) {
  tile.addEventListener('click', () => {
    document.querySelector(`.chip[data-cat="${tile.dataset.jumpCat}"]`)?.click();
  });
}

/* Offers, live from Firestore. */
if (firebaseConfig?.projectId && firebaseConfig?.apiKey) {
  import('./offers.js').then(({ loadOffers }) => loadOffers(firebaseConfig, lang)).catch(() => {});
}
