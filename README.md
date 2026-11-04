# Sri Ambica Electricals website

Bilingual (English / தமிழ்) site for Sri Ambica Electricals, 20/72 Siva Complex, Chittu Koil Street, Salem. Built with Astro, a Three.js 3D logo, and Firebase (Hosting + Firestore for live offers).

## Run and build

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # static site in dist/
```

## Edit products and shop details

Everything shown on the site lives in `src/data/site.js`: phone numbers, WhatsApp number, address, hours, the product catalogue (English and Tamil), and all labels. Product rows never show a price; each has an "Ask price" link that opens WhatsApp with the item named.

## Change offers (no redeploy needed)

Offers are read live from the Firestore collection `offers`. In the Firebase console, open Firestore, collection `offers`, and add one document per offer:

| field | type | example |
|---|---|---|
| `title_en` | string | Ceiling fans: trade price this week |
| `title_ta` | string | சீலிங் ஃபேன்கள்: இந்த வாரம் வணிக விலை |
| `detail_en`, `detail_ta` | string (optional) | |
| `validUntil` | timestamp (optional) | hidden after this date |
| `active` | boolean | `true` to show |
| `order` | number | lower shows first |

With no active offers, the site shows "No offers on the board right now" with a WhatsApp button. Visitors can only read offers (`firestore.rules`); only the shop edits them in the console.

## Deploy

```bash
npm run build
npx firebase-tools deploy --only hosting,firestore
```

## Design

`DESIGN.md` records the design system (a single-line wiring diagram drawn from the shop's pipe logo). `PRODUCT.md` records the shop facts and their sources.
