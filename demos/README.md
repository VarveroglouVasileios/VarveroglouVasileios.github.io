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
| 1 | Elia Bay, boutique hotel in Thasos with booking system | `VarveroglouVasileios/HotelProject` | `/HotelProject/` | Built and live on GitHub Pages |
| 2 | Taverna Meltemi, Kavala taverna with menu and table reservations | [VarveroglouVasileios/TavernaProject](https://github.com/VarveroglouVasileios/TavernaProject) | `/TavernaProject/` | Built and live on GitHub Pages |
| 3 | Almyra Café, order-ahead pickup with slot capacity | [VarveroglouVasileios/CafeProject](https://github.com/VarveroglouVasileios/CafeProject) | `/CafeProject/` | Built and live on GitHub Pages |
| 4 | Eleon Pantry, local products e-shop with stock and cart | [VarveroglouVasileios/ShopProject](https://github.com/VarveroglouVasileios/ShopProject) | `/ShopProject/` | Built and live on GitHub Pages |
| 5 | Kalypso Studio, appointments by service and specialist | [VarveroglouVasileios/SalonProject](https://github.com/VarveroglouVasileios/SalonProject) | `/SalonProject/` | Built and live on GitHub Pages |
| 6 | Bluewake Rentals, boat and scooter rental with availability | [VarveroglouVasileios/RentalProject](https://github.com/VarveroglouVasileios/RentalProject) | `/RentalProject/` | Built and live on GitHub Pages |
| 7 | Vivliario, digital service book demo | [VarveroglouVasileios/VivliarioProject](https://github.com/VarveroglouVasileios/VivliarioProject) | `/VivliarioProject/` | Built and live on GitHub Pages |
| 8 | Room 360, interactive room viewer demo | [VarveroglouVasileios/DwmatioProject](https://github.com/VarveroglouVasileios/DwmatioProject) | `/DwmatioProject/` | Built and live on GitHub Pages |
| 9 | Metrisi, renovation estimate demo | [VarveroglouVasileios/MetrisiProject](https://github.com/VarveroglouVasileios/MetrisiProject) | `/MetrisiProject/` | Built and live on GitHub Pages |
| 10 | Rythmos, class booking with a waitlist demo | [VarveroglouVasileios/RythmosProject](https://github.com/VarveroglouVasileios/RythmosProject) | `/RythmosProject/` | Built and live on GitHub Pages |
| 11 | Noumero, digital queue demo | [VarveroglouVasileios/NoumeroProject](https://github.com/VarveroglouVasileios/NoumeroProject) | `/NoumeroProject/` | Built and live on GitHub Pages |
| 12 | Peripatos, self-guided walk demo | [VarveroglouVasileios/PeripatosProject](https://github.com/VarveroglouVasileios/PeripatosProject) | `/PeripatosProject/` | Built and live on GitHub Pages |
| 13 | Ktima Dafni, event seating planner demo | [VarveroglouVasileios/KtimaProject](https://github.com/VarveroglouVasileios/KtimaProject) | `/KtimaProject/` | Built and live on GitHub Pages |
| 14 | Karpos, olive oil batch passport demo | [VarveroglouVasileios/KarposProject](https://github.com/VarveroglouVasileios/KarposProject) | `/KarposProject/` | Built and live on GitHub Pages |
| 15 | ENA, unified booking calendar demo | [VarveroglouVasileios/EnaProject](https://github.com/VarveroglouVasileios/EnaProject) | `/EnaProject/` | Built and live on GitHub Pages |
| 16 | Diafaneia, website audit report demo | [VarveroglouVasileios/DiafaneiaProject](https://github.com/VarveroglouVasileios/DiafaneiaProject) | `/DiafaneiaProject/` | Built and live on GitHub Pages |
| 17 | Deltio, Greek identifier validation library demo | [VarveroglouVasileios/DeltioProject](https://github.com/VarveroglouVasileios/DeltioProject) | `/DeltioProject/` | Built and live on GitHub Pages |
| 18 | Slotlock, double-booking-proof booking API demo | [VarveroglouVasileios/SlotlockProject](https://github.com/VarveroglouVasileios/SlotlockProject) | `/SlotlockProject/` | Built and live on GitHub Pages |

Design briefs and prompts: `briefs/`.
