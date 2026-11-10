# Demo sites

Fictional businesses used as live examples for the portfolio. **Each demo lives in its own GitHub repository and its own GitHub Pages site.** The portfolio only links to them (case study in `src/data/caseStudies.ts` and card in `src/data/portfolio.ts`).

## Rules for every demo

1. **Fictional business, clearly labelled.** A visible "Demo concept" banner on every page, `noindex` meta, and "Designed and built by Vasileios Varveroglou" in the footer. Never imitate a real, existing business.
2. **Greek first, English second**, with a language toggle.
3. **Stack:** Vue 3 + TypeScript + Tailwind, vue-i18n, vue-router (hash history), vitest. Same as the portfolio, so the code is reusable for real clients.
4. **Photos:** AI-generated, labelled "illustrative" in the footer. Replace with real photography for a real client.
5. **Business logic in `src/lib` as pure functions with tests** (`yarn test`).
6. **Simulated data** in `localStorage` with a "Reset demo data" action. A real build adds an API and database.
7. **Mobile first**, accessible forms (visible labels, inline errors, keyboard focus).
8. **Design:** human, editorial, not a template. Photography first, serif headings, hairline rules instead of cards, small radii, no gradients or decorative icons, short personal copy.

## Own repository, own Pages site

- Repo name = Pages path: repo `HotelProject` is served at `https://varveroglouvasileios.github.io/HotelProject/`.
- Each repo has `.github/workflows/deploy.yml` (test, build with `VITE_BASE=/<repo>/`, deploy to Pages) and `vite.config.ts` default base `/<repo>/`.
- Settings, Pages, Source: **GitHub Actions**.
- Include `@types/node` in devDependencies (the config uses `process` and `node:url`).

## Index

| # | Demo | Repository | Live | Status |
|---|---|---|---|---|
| 1 | Elia Bay, boutique hotel in Thasos with booking system | `VarveroglouVasileios/HotelProject` | `/HotelProject/` | Built and pushed. Needs Pages enabled (Source: GitHub Actions) |
| 2 | Taverna Meltemi, Kavala taverna with menu and table reservations | [OrbitFolio / taverna-meltemi](taverna-meltemi/) | | Built, hosting pending |
| 3 | Café / brunch | not started | | |
| 4 | Local products e-shop | not started | | |
| 5 | Appointments (beauty / physio) | not started | | |
| 6 | Boat / scooter rental with booking | not started | | |

Design briefs and prompts: `briefs/`.
