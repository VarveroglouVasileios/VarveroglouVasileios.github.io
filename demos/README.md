# Demo sites

Fictional businesses used as live examples for the portfolio (Services page and case studies).
Each demo is a standalone app with its own `package.json`, so it can be hosted separately.

## Rules for every demo

1. **Fictional business, clearly labelled.** A visible "Demo concept" banner on every page, `noindex` meta, and "Designed and built by Vasileios Varveroglou" in the footer. Never imitate a real, existing business.
2. **Greek first, English second**, with a language toggle.
3. **Stack:** Vue 3 + TypeScript + Tailwind, vue-i18n, vue-router. Same as the portfolio, so the code is reusable for real clients.
4. **No stock photos** unless licensed. Use the illustrative placeholders and note that real photography replaces them.
5. **Business logic lives in `src/lib` as pure functions with tests** (`yarn test`).
6. **Demo data resets**: persistence is `localStorage` only, with a "Reset demo data" action. A real build replaces the store with an API and database.
7. **Mobile first**, accessible forms (visible labels, error messages, keyboard focus).

## Index

| # | Demo | Folder | Status |
|---|---|---|---|
| 1 | Elia Bay Suites, boutique hotel in Thasos with booking system | `thasos-hotel/` | Built, needs design polish + hosting |
| 2 | Taverna with menu and table reservations | `briefs/02-taverna-prompt.md` | Prompt ready |
| 3 | Café / brunch | not started | |
| 4 | Local products e-shop | not started | |
| 5 | Appointments (beauty / physio) | not started | |
| 6 | Boat / scooter rental with booking | not started | |

Design briefs and prompts: `briefs/`.

## Hosting

| Option | When | How |
|---|---|---|
| Vercel (recommended) | These demos are static (no server), so any static host works | Import the repo, set **Root Directory** to `demos/<name>`, build command `yarn build`, output `dist` |
| Netlify / Cloudflare Pages | Same | Same settings |
| GitHub Pages | Only if you want everything under one domain | Build with `VITE_BASE=/demos/<name>/` and publish the `dist` folder under that path |
| Floot | If a demo needs a real backend (database, emails) | Rebuild the store layer as endpoints. Floot is React, so this means porting the UI |

Recommended URLs once a domain exists: `hotel.demo.<your-domain>`, `taverna.demo.<your-domain>`.
Link each live demo from its case study in the portfolio (`src/data/caseStudies.ts`).
