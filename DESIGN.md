---
name: Sri Ambica Electricals: Diwali catalogue
colors:
  night: "#190b2c"
  night-2: "#221038"
  night-3: "#2e1749"
  night-4: "#3b1f5c"
  cream: "#fff4e2"
  cream-2: "#e6d3c0"
  cream-3: "#b9a6c4"
  gold: "#ffc23d"
  ink-on-gold: "#2a1204"
  marigold: "#ff8a1f"
  rani: "#c92a67"
  peacock: "#18a594"
  indigo: "#5b63f0"
  chilli: "#ee5232"
  lagoon: "#129fc6"
  violet: "#9d63e8"
  logo-blue: "#3d86ff"
typography:
  display:
    fontFamily: "Baloo Thambi 2"
    fontWeight: 800
  hero:
    fontFamily: "Baloo Thambi 2"
    fontSize: "clamp(2.6rem, 6vw, 5.2rem)"
    fontWeight: 800
    lineHeight: 0.98
  heading:
    fontFamily: "Baloo Thambi 2"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 800
  body:
    fontFamily: "Hind Madurai"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  pill: "999px"
  control: "12px"
  card: "20px"
  panel: "24px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  max-width: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink-on-gold}"
    rounded: "{rounded.pill}"
    height: "50px"
  button-ghost:
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    height: "50px"
  product-card:
    backgroundColor: "{colors.night-3}"
    textColor: "{colors.cream}"
    rounded: "{rounded.card}"
  how-band:
    backgroundColor: "{colors.marigold}"
    textColor: "{colors.ink-on-gold}"
---

# Sri Ambica Electricals: design system

## Overview

A Diwali night: the page is a deep plum sky lit by the shop's own wares. A toran of twinkling bulbs hangs across the top, a rangoli turns slowly behind the shop's 3D pipe logo, and a row of flickering diyas closes the hero. Below it the catalogue is the product: colour-coded tiles per category, an "Add to list" on every item, and a cart that sends the list to the shop on WhatsApp for availability and a price quote; the customer pays and collects in store. The festive layer (toran, rangoli, diyas, "Happy Diwali") is seasonal and can be removed after the festival without touching the catalogue.

## Colors

Plum night surfaces (`night` to `night-4`) carry the page; cream text on them. Diya `gold` is the single action colour (primary buttons, active chip, prices of attention). Each category owns one festive tone (marigold, gold, peacock, rani, indigo, chilli, lagoon, violet) used only on its product tiles, chips and cart icons. The "How it works" band is the one drenched marigold surface. The logo keeps its own blue.

## Typography

Baloo Thambi 2 (Tamil and Latin, rounded and festive) for every heading and the wordmark; Hind Madurai for body text in both languages. Product brand names are small tracked capitals in gold.

## Layout

Max width 1240px with fluid gutters. Hero: logo left, copy right; stacks on phones. Catalogue: sticky search and category chips, then an auto-fill grid (4 columns desktop, 2 on phones, 1 below 380px). Cart: right-side drawer on desktop, bottom sheet on phones, opened from the header button or the floating "My list" button on phones.

## Elevation & Depth

Cards lift 3px on hover with a dark offset shadow. Light comes from the scene (bulbs, diyas, the glow behind the logo), never from coloured glows on text or buttons.

## Shapes

Pill buttons, chips and steppers; 20px cards; 24px panels; product art drawn in one 3px line on a 64 grid.

## Components

- **Toran**: 25 bulbs that cycle through five blink patterns (chase, alternate, twinkle, wave, burst) every 6 s; fireworks burst on a canvas behind the hero. Both stop under reduced motion and pause off screen.
- **3D showroom**: Three.js models of a ceiling fan (spinning), an LED bulb (glowing) and a modular switch plate (flicking), drag to rotate; product photos replace it on software-only WebGL or before it loads.
- **Brand strip**: official GM, Fybros and Philips logos on white badges.
- **Catalogue layout**: category sidebar with counts and search on the left, results on the right; on phones the sidebar becomes a sticky search plus a scrolling category row.
- **Product card**: official product photo on white (from the manufacturer, `src/data/product-images.js`) with a category badge, or a category-toned art tile when no photo exists, brand, name, spec, optional size/rating select, quantity stepper, "Add to list" (turns green "Added" briefly).
- **Cart drawer**: lines with art, option, stepper and Remove; optional name and note; "Send list on WhatsApp" builds a numbered list with quantities; "Clear list". Saved on the device (localStorage).
- **Offers**: live from Firestore; with none, a Diwali greeting card with a WhatsApp action.
- **Sample note**: shown while `DEMO_CATALOG` is true in `src/data/catalog-demo.js`.

## Do's and Don'ts

- Do keep gold for actions only; category tones stay on their own products.
- Do keep every product one tap from the list, and never show invented prices.
- Do remove the Diwali layer after the festival rather than letting it age.
- Don't add glows to text or buttons; don't put body text on category tones.
