# Elia Bay Suites (demo)

Fictional boutique hotel in Thasos with a working availability and booking flow.
Vue 3 + TypeScript + Tailwind + vue-i18n (Greek default, English). No backend: bookings live in `localStorage`. Photos are AI-generated. Hash routing, so it runs on GitHub Pages.

```bash
yarn install
yarn dev        # http://localhost:8991
yarn test       # booking logic
yarn build
```

## What it shows

- Date and guest search with validation (past dates, order, minimum stay, guests).
- Live availability per room type (a type has several units; a sold-out night hides the room).
- Season pricing: shoulder June, September and early July; peak 15 Jul to 31 Aug (3-night minimum).
- Booking form with blur validation, last-moment availability re-check, reference code, confirmation page with an email preview.
- Admin (`/admin`, demo password `demo`): 28-day occupancy grid, bookings table, cancel, reset demo data.

## Structure

```
src/lib/booking.ts   pure logic: dates, pricing, availability, validation (tested)
src/lib/store.ts     localStorage-backed bookings + seed data
src/data/rooms.ts    fictional rooms and prices
src/i18n.ts          Greek and English copy
src/views/           Home, Rooms, Book, Confirmation, Admin
```

## What a real client build adds

- API + database (Postgres/MongoDB) instead of `localStorage`, with server-side availability checks (the client-side check is only for UX).
- Real email (confirmation to guest and hotel) and an admin with proper authentication.
- Payment/deposit provider, if wanted, and channel-manager/iCal sync with Booking.com/Airbnb.
- Real photography, real copy, privacy policy and cookie notice reviewed for the client.

## Hosting

GitHub Pages via the root workflow, see `../README.md`. Live at `/demos/thasos-hotel/`.
