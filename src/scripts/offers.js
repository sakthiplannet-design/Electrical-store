import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore/lite';
import { t } from '../data/site.js';

// Firestore collection `offers`, one document per offer:
//   title_en, title_ta, detail_en, detail_ta (strings), validUntil (timestamp, optional),
//   active (boolean), order (number, lower shows first).
// Public read, no client writes (see firestore.rules). The shop edits them in the Firebase console.
export async function loadOffers(config, lang) {
  const list = document.getElementById('offer-list');
  const section = document.getElementById('offers');
  if (!list || !section) return;
  const db = getFirestore(initializeApp(config));
  const snap = await getDocs(query(collection(db, 'offers'), where('active', '==', true)));
  const now = Date.now();
  const fmt = new Intl.DateTimeFormat(lang === 'ta' ? 'ta-IN' : 'en-IN', { day: 'numeric', month: 'short' });
  const offers = snap.docs
    .map((d) => d.data())
    .filter((o) => !o.validUntil || o.validUntil.toMillis() >= now)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  list.replaceChildren(
    ...offers.map((o) => {
      const li = document.createElement('li');
      li.className = 'offer';
      const h = document.createElement('h3');
      h.textContent = o[`title_${lang}`] || o.title_en || '';
      li.append(h);
      const detail = o[`detail_${lang}`] || o.detail_en;
      if (detail) {
        const p = document.createElement('p');
        p.textContent = detail;
        li.append(p);
      }
      if (o.validUntil) {
        const until = document.createElement('span');
        until.className = 'until';
        until.textContent = t[lang].offerUntil(fmt.format(o.validUntil.toDate()));
        li.append(until);
      }
      return li;
    }),
  );
  section.classList.toggle('has-offers', offers.length > 0);
}
