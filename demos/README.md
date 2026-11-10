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
| 1 | Elia Bay, boutique hotel in Thasos with booking system | `thasos-hotel/` | Built, responsive, in the portfolio. Live after merge to `main` |
| 2 | Taverna with menu and table reservations | `briefs/02-taverna-prompt.md` | Prompt ready |
| 3 | Café / brunch | not started | |
| 4 | Local products e-shop | not started | |
| 5 | Appointments (beauty / physio) | not started | |
| 6 | Boat / scooter rental with booking | not started | |

Design briefs and prompts: `briefs/`.

## Hosting: GitHub Pages (chosen)

Demos are built and published with the portfolio by `.github/workflows/deploy.yml`:
each demo is built with `VITE_BASE=/demos/<name>/` and copied into `dist/demos/<name>`.
Live URL pattern: `https://varveroglouvasileios.github.io/demos/<name>/`.

- Demos use **hash routing** (`/#/rooms`) so deep links and reloads work on GitHub Pages with no server fallback.
- `robots.txt` disallows `/demos/` and every demo has `noindex`, so demos do not compete with the portfolio in search.
- To add a demo: create `demos/<name>/`, add one build and copy step to the workflow, and add a case study in `src/data/caseStudies.ts`.
- Floot was considered and rejected: it hosts React apps in its own format, and these demos are Vue 3.
- Static demos can also be hosted on Vercel or Netlify (root directory `demos/<name>`, build `yarn build`, output `dist`).

Photos: AI-generated (illustrative), labelled in each demo footer. Replace with real photography for a real client.
