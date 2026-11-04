---
name: design-md
description: Library of 84 ready-made DESIGN.md design-system specs (colour tokens, type scale, spacing, radii, component and layout rules) analysed from real sites such as Apple, Airbnb, Stripe, Linear, Nike, Shopify, Tesla and Spotify. Use when the user asks for a page or component "in the style of" or "like" a named site or brand, wants to choose a visual direction from known sites, or wants a DESIGN.md for this project.
---

# DESIGN.md library

Each `designs/<site>/DESIGN.md` is a design system written for agents: YAML frontmatter with tokens
(`colors`, `typography`, `rounded`, `spacing` and so on), then prose on layout, components and rules.

## How to use

1. **Find the file.** Match the site the user named to a folder in the list below. If none matches, say
   so and suggest the closest ones by feel. Never invent a DESIGN.md for a site that isn't here.
2. **Read all of it before writing UI.** Turn its tokens into the project's own mechanism (CSS custom
   properties, Tailwind theme, etc.) and follow its component, layout and do/don't rules.
3. **Borrow the design language, not the brand.** This project keeps its own name, logo, copy, products
   and imagery. Take the palette relationships, type scale, spacing, radii and component shapes; never
   copy the source site's logos, trademarks, product names or wording. When the spec names a
   proprietary typeface (for example Airbnb Cereal or SF Pro), use the closest freely licensed font and
   tell the user which one you chose.
4. **A project DESIGN.md wins.** If the project root already has a `DESIGN.md`, follow it, and use this
   library only when the user asks to restyle or compare directions.
5. **Making it permanent.** If the user wants one style for the whole project, offer to copy that file
   to the project root as `DESIGN.md`, adapted per rule 3. Ask first: it shapes all later UI work.

## Available designs

`1win`, `airbnb`, `airtable`, `aljazeera`, `apple`, `binance`, `bmw`, `bmw-m`, `bugatti`, `cal`, `claude`, `clay`, `clickhouse`, `cohere`, `coinbase`, `composio`, `cursor`, `dell-1996`, `dji`, `elevenlabs`, `expo`, `ferrari`, `figma`, `framer`, `hashicorp`, `hp`, `ibm`, `intercom`, `jobright`, `kraken`, `lamborghini`, `linear.app`, `lovable`, `mastercard`, `mercury`, `meta`, `minimax`, `mintlify`, `miro`, `mistral.ai`, `mongodb`, `mydealz`, `nerdwallet`, `nike`, `nintendo-2001`, `notion`, `nvidia`, `ollama`, `opencode.ai`, `oracle`, `oura`, `pinterest`, `playstation`, `posthog`, `raycast`, `renault`, `replicate`, `resend`, `revolut`, `runwayml`, `sanity`, `sap`, `sentry`, `shopify`, `slack`, `spacex`, `spotify`, `starbucks`, `stripe`, `supabase`, `superhuman`, `tesla`, `theverge`, `together.ai`, `uber`, `vercel`, `vodafone`, `voltagent`, `warp`, `webflow`, `wired`, `wise`, `x.ai`, `zapier`
