---
name: Sri Ambica Electricals: single-line diagram
colors:
  sheet: "#f4f7fb"
  paper: "#ffffff"
  graphite: "#141c27"
  graphite-soft: "#445063"
  graphite-faint: "#8b97a8"
  rule: "#cdd6e1"
  live-blue: "#1a63cf"
  live-blue-deep: "#124ea6"
  live-blue-tint: "#e3edfb"
  lamp-yellow: "#ffc531"
typography:
  display:
    fontFamily: "Saira Semi Condensed"
    fontWeight: 800
    textTransform: uppercase
  display-hero:
    fontFamily: "Saira Semi Condensed"
    fontSize: "clamp(2.7rem, 5.6vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.92
  heading:
    fontFamily: "Saira Semi Condensed"
    fontSize: "clamp(1.55rem, 2.6vw, 2.3rem)"
    fontWeight: 800
  label:
    fontFamily: "Saira Semi Condensed"
    fontSize: "0.95rem"
    fontWeight: 700
    letterSpacing: "0.05em"
  body:
    fontFamily: "Hind Madurai"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  pipe: "999px"
  panel: "12px"
  plate: "14px"
  module: "8px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  bus-width: "72px"
  circuit-gap: "clamp(48px, 7vw, 88px)"
  wire: "8px"
components:
  button-primary:
    backgroundColor: "{colors.live-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.pipe}"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.live-blue-deep}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.pipe}"
    height: "52px"
  help-panel:
    backgroundColor: "{colors.live-blue}"
    textColor: "#ffffff"
    rounded: "18px"
  plate:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.plate}"
---

# Sri Ambica Electricals: design system

## Overview

The site is drawn as an electrician's single-line diagram on a cool white sheet. The shop's own mark, a blue pipe drawn as an "S" inside a house, sits at the top as a real WebGL model. Its dripping tap feeds one blue conductor, the busbar, that runs down the page. Every product family is a circuit hanging off that busbar through a breaker symbol, with a lamp that lights while the circuit is in view. The category navigation is a distribution board of MCB toggles. The world refuses the electrical-shop default of a banner carousel above a grid of product cards.

## Colors

Two inks on one sheet. Graphite draws every rule, symbol and word; the logo's PVC blue (`live-blue`) is the only live colour: the busbar, the energised branch, primary actions, links and the help panel. `lamp-yellow` appears only as a lit lamp's glass and the open-now dot. There are no gradients, no tinted cards and no other hues. Secondary text uses `graphite-soft`, never a light grey on white.

## Typography

Saira Semi Condensed, squared and heavy, echoes the logo's wordmark and sets the wordmark, circuit names, the board and printed readings (uppercase, tracked labels). Hind Madurai, designed for Tamil, sets all body copy in both languages, and Tamil runs fall back to it inside display settings. Product rows read like a rate card: bold name, dotted leader, spec, then the question.

## Layout

One grid runs the whole page: a side column for circuit names, a 72px bus column, and the content column. The hero, board and diagram share it so the busbar is one straight line from the logo's drop to the earth symbol at the visit circuit. On phones the side column collapses to zero, the bus moves to the left edge, and each circuit's name sits beside its breaker. Product rows stack below 520px.

## Elevation & Depth

Flat by default. Depth belongs to physical objects only: the 3D logo, the MCB levers and the riveted plate. Shadows appear only on primary-button hover, offset and soft.

## Shapes

Pipe-ended (fully rounded) buttons, like the logo's runs. Enclosures (the board, offers, plate, photo frame) use 2px graphite borders with 12–14px corners. Symbols use one 2px stroke on a 48 grid.

## Components

- **Busbar**: dashed graphite rail with an 8px live-blue conductor that fills with scroll progress; fully live under reduced motion.
- **Circuit**: breaker on the bus, a branch to a lamp, name and the other language's name on the left, note and rate-card rows on the right. Live state: blue breaker and branch, yellow lamp with a halo. Text never dims.
- **MCB toggle**: module body, lever down (grey) when off, up (blue) when its circuit is live; doubles as the in-page navigation.
- **Meter**: open/closed reading printed in caps inside a bordered strip; computed in Asia/Kolkata.
- **Help panel**: the single drenched live-blue block, inviting a WhatsApp photo.
- **Offers**: rows loaded from Firestore; dashed empty state with a WhatsApp action when none are active.
- **Plate**: riveted rating plate listing the shop's claims, rating and GSTIN.

## Do's and Don'ts

- Do keep blue for things that are live or actionable; never decorate with it.
- Do name every product's question in WhatsApp; never show an invented price, stock count or offer.
- Do keep both languages first-class: every label exists in English and Tamil.
- Don't add cards, gradients, glass or a second accent colour.
- Don't replace the 3D mark with a picture of it; the flat SVG is only the fallback.
