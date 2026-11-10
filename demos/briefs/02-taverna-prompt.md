# Prompt: Demo 02, Taverna with menu and table reservations

Paste everything below the line into a new Claude Code session (or Floot) opened on this repository.

---

You are building demo site #2 for my portfolio: a fictional Greek taverna with an online menu and a table reservation system. Read `demos/README.md` first and follow its rules. Use the `HotelProject` repository (Elia Bay hotel demo) as the reference implementation: same stack (Vue 3 + TypeScript + Tailwind, vue-i18n, vue-router, vitest), same project layout, same style of pure, tested logic in `src/lib`.

## Create
A **new, separate repository** `taverna-meltemi` (do not put it inside the portfolio repo). Use the `HotelProject` repository (Elia Bay hotel demo) as the reference implementation: copy its config (vite, vitest, tsconfig with `@types/node`, tailwind, postcss, `.github/workflows/deploy.yml`) and change the base path to `/taverna-meltemi/`. The repository is created by me on GitHub; ask me for it if it does not exist yet. It is hosted on its own GitHub Pages site (Source: GitHub Actions). The portfolio only links to it.

## The business (fictional, never imitate a real taverna)
"Taverna Meltemi" (Demo concept), a family taverna by the sea in Kavala. Greek home cooking, grilled fish and meat, local wine. Open daily 13:00 to 23:30. Seating: 14 tables, 56 seats in total (tables of 2, 4 and 6).

## Pages
1. **Home:** hero, reservation widget (date, time, party size), opening hours, address and map placeholder, short story, three signature dishes.
2. **Menu:** categories (Starters, Salads, Grill, Fish, Mains, Desserts, Drinks). Filters: Vegetarian, Fasting (νηστίσιμο), Gluten-free. Dish name, description, price. About 24 dishes, Greek and English. Include an allergen note.
3. **Reserve:** choose date, party size (1 to 10), then show available 30-minute time slots (13:00 to 22:30). Guest form: name, phone (required), email (optional), notes (e.g. high chair, allergies). Confirmation page with reference code and a message preview (SMS/email text).
4. **Admin** (`/admin`, demo password `demo`): today's reservations as a timeline, a per-slot seat usage grid for the next 7 days, cancel and "mark seated", reset demo data.
5. Banner "Demo concept", `noindex`, footer credit, same as the hotel demo. Greek first, English toggle.

## Reservation logic (put in `src/lib/reservations.ts`, with tests)
- A party occupies a table for 90 minutes (slot start + 90 min).
- Seats are the constraint: a slot is available if the seats already in use during its 90-minute window, plus the party size, do not exceed 56. Also reject a party of 7 or more at a single slot when no table of 6 or a combination is free (keep the table-fitting logic simple and documented).
- Block past times, closed hours, and parties over 10 (show "call us" message for larger groups).
- Last-moment availability re-check on submit.
- Phone validation for Greek numbers (mobile starts with 69, 10 digits, optional +30).
- Seed realistic bookings relative to today so some evening slots are full.

## Quality bar
- `yarn test` covers the reservation logic (overlap windows, boundary times, capacity, past times, cancellations).
- `yarn build` passes with `vue-tsc`.
- Verify the whole flow in a real browser (Playwright is installed): sold-out slot hidden, successful reservation, validation errors, admin cancel, language toggle. Report what you verified.
- Mobile first and responsive on every device (check 375, 768, 1280, 1920 px for horizontal overflow), visible labels, inline errors, keyboard focus.
- Photos: generate AI images of the interior, dishes and terrace (illustrative, labelled as AI-generated in the footer), optimised to webp.
- Design must feel human, not like a template: photography first, serif headings, hairline rules instead of cards, small radii, no gradients or decorative icons, short personal copy in Greek.

## Deliver
Write the new repository's `README.md` (what it shows, structure, what a real build adds, live URL), and in the portfolio repo add a design brief `demos/briefs/02-taverna.md` in the format of `demos/briefs/01-thasos-hotel.md` and update the table in `demos/README.md`. Commit and push. Do not open a pull request.
