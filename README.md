# Sri Ambica Electricals website

Bilingual (English / தமிழ்) site for Sri Ambica Electricals, 20/72 Siva Complex, Chittu Koil Street, Salem. Built with Astro, a Three.js 3D logo, and Firebase (Hosting + Firestore for live offers).

## Run and build

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # static site in dist/
```

## Shop details

`src/data/site.js` holds the phone numbers, WhatsApp number, address, hours and every label in English and Tamil.

## Catalogue (demo for now)

`src/data/catalog-demo.js` is a **temporary demo catalogue** built from the official ranges of brands the shop carries (Fybros, GM, Philips) so the client can see the site working. When the shop sends its own list:

1. Replace the `products` array (each item: id, category, brand, illustration kind, English/Tamil name and spec, optional sizes).
2. Adjust `categories` if needed.
3. Set `DEMO_CATALOG = false` to remove the "sample range" note.

## How ordering works

Customers add products to **My list** (kept on their device), then **Send list on WhatsApp**. The message lists every item with its size and quantity, plus their name and note. The shop replies with availability and price; the customer pays and collects in store. No online payment.

## Diwali theme

The toran lights, rangoli, diyas and "Happy Diwali" copy are seasonal. Remove them from `src/components/Page.astro` (hero) and `src/data/site.js` (`festive`, `heroTitle`, `offersEmpty`) after the festival.

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
