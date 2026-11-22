import type { ExperienceItem, Project, Skill, SocialLink, Insight } from '@/types/portfolio'

export const techSkills: Skill[] = [
  { name: 'Vue 3', accent: 'from-emerald-400 to-emerald-300' },
  { name: 'Angular.js', accent: 'from-rose-400 to-rose-300' },
  { name: 'Node.js', accent: 'from-lime-400 to-lime-300' },
  { name: 'TypeScript', accent: 'from-blue-400 to-blue-300' },
  { name: 'Tailwind CSS', accent: 'from-cyan-400 to-cyan-300' },
  { name: 'Express', accent: 'from-slate-400 to-slate-300' },
  { name: 'Pinia', accent: 'from-amber-400 to-amber-300' },
  { name: 'MongoDB', accent: 'from-green-400 to-green-300' },
  { name: 'PHP', accent: 'from-indigo-400 to-indigo-300' },
  { name: 'Application Security', accent: 'from-orange-400 to-orange-300' },
]

export const projects: Project[] = [
  {
    id: 5,
    slug: 'elia-bay-hotel-demo',
    title: 'Elia Bay, hotel booking demo',
    description:
      'Demo concept: boutique hotel website for Thasos with live availability, season pricing, booking flow and an admin dashboard. Greek and English.',
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vitest'],
    imageLabel: 'Elia Bay hotel demo',
    imageUrl: '/elia-bay-preview.webp',
    githubUrl: 'https://github.com/VarveroglouVasileios/HotelProject',
    liveUrl: 'https://varveroglouvasileios.github.io/HotelProject/',
    liveLabelKey: 'projects.tryDemo',
    breakdown: {
      architecture:
        'Booking rules live in pure, tested functions (dates, season pricing, overlap and availability). The UI is Vue 3 with hash routing so it runs on static hosting.',
      security:
        'Inputs are validated on blur and again on submit, and availability is re-checked at the last moment. In a real build the same checks run on the server, with a database.',
      challenges:
        'Several identical units per room type: a night is only sold out when the busiest overlapping night uses every unit, and a guest may arrive the day another leaves.',
    },
  },
  {
    id: 6,
    slug: 'taverna-meltemi-demo',
    title: 'Taverna Meltemi, menu and table booking demo',
    description:
      'Demo concept: a taverna website with a bilingual menu, photo gallery and table reservations that check seat capacity. Includes an admin dashboard.',
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vitest'],
    imageLabel: 'Taverna Meltemi demo',
    imageUrl: '/taverna-meltemi-preview.webp',
    githubUrl: 'https://github.com/VarveroglouVasileios/TavernaProject',
    liveUrl: 'https://varveroglouvasileios.github.io/TavernaProject/',
    liveLabelKey: 'projects.tryDemo',
    breakdown: {
      architecture:
        'Reservation rules live in pure, tested functions: 30-minute slots, a 90-minute table window and seat capacity computed in Athens time. The UI is Vue 3 with hash routing so it runs on static hosting.',
      security:
        'Inputs are validated on blur and again on submit (Greek mobile format, party size, past times), and availability is re-checked at the last moment. A real build repeats these checks on the server.',
      challenges:
        'Sold-out logic must consider overlapping 90-minute windows rather than single slots, and stay correct around the current time and across days.',
    },
  },
  {
    id: 7,
    slug: 'almyra-cafe-demo',
    title: 'Almyra Café, order-ahead pickup demo',
    description:
      'Demo concept: a café where customers order from their phone and pick up in a 15-minute slot, with a per-slot limit and a kitchen board.',
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vitest'],
    imageLabel: 'Almyra Café demo',
    imageUrl: '/almyra-cafe-preview.webp',
    githubUrl: 'https://github.com/VarveroglouVasileios/CafeProject',
    liveUrl: 'https://varveroglouvasileios.github.io/CafeProject/',
    liveLabelKey: 'projects.tryDemo',
    breakdown: {
      architecture:
        'Slot, capacity and cart rules live in pure, tested functions. The UI is Vue 3 with hash routing so it runs on static hosting.',
      security:
        'Inputs are validated on blur and on submit (Greek mobile format, past times), and capacity is re-checked at the last moment. A real build repeats this on the server.',
      challenges:
        'A big order must take more kitchen capacity than a small one, and a slot must close as soon as the last unit is taken, even when two people order together.',
    },
  },
  {
    id: 8,
    slug: 'eleon-pantry-demo',
    title: 'Eleon Pantry, local products shop demo',
    description:
      'Demo concept: an online shop for local products with live stock, cart, discount code, shipping rules and an orders admin.',
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vitest'],
    imageLabel: 'Eleon Pantry demo',
    imageUrl: '/eleon-pantry-preview.webp',
    githubUrl: 'https://github.com/VarveroglouVasileios/ShopProject',
    liveUrl: 'https://varveroglouvasileios.github.io/ShopProject/',
    liveLabelKey: 'projects.tryDemo',
    breakdown: {
      architecture:
        'Cart, stock, discount and shipping rules live in pure, tested functions. The UI is Vue 3 with hash routing so it runs on static hosting.',
      security:
        'Inputs are validated on submit (names, email, phone, postcode by region) and stock is re-checked when the order is placed. A real build adds a payment provider and repeats the checks on the server.',
      challenges:
        'A discount can push the cart below the free-shipping threshold, so the order of operations matters, and the same unit must not be sold twice.',
    },
  },
  {
    id: 9,
    slug: 'kalypso-studio-demo',
    title: 'Kalypso Studio, appointment booking demo',
    description:
      'Demo concept: a beauty studio where clients book by service and specialist, with times worked out from durations, working hours and cleaning buffers.',
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vitest'],
    imageLabel: 'Kalypso Studio demo',
    imageUrl: '/kalypso-studio-preview.webp',
    githubUrl: 'https://github.com/VarveroglouVasileios/SalonProject',
    liveUrl: 'https://varveroglouvasileios.github.io/SalonProject/',
    liveLabelKey: 'projects.tryDemo',
    breakdown: {
      architecture:
        'Working windows, durations, buffers and assignment live in pure, tested functions. The UI is Vue 3 with hash routing so it runs on static hosting.',
      security:
        'Inputs are validated on blur and on submit, and availability is re-checked at the last moment. A real build repeats this on the server and sends reminders.',
      challenges:
        'Appointments of different lengths must never overlap, back-to-back is allowed, and the cleaning buffer applies after an appointment but not before it.',
    },
  },
  {
    id: 10,
    slug: 'bluewake-rentals-demo',
    title: 'Bluewake Rentals, boat and scooter booking demo',
    description:
      'Demo concept: a rental business with per-vehicle availability, duration pricing, deposit and licence rules, and a fleet admin.',
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vitest'],
    imageLabel: 'Bluewake Rentals demo',
    imageUrl: '/bluewake-rentals-preview.webp',
    githubUrl: 'https://github.com/VarveroglouVasileios/RentalProject',
    liveUrl: 'https://varveroglouvasileios.github.io/RentalProject/',
    liveLabelKey: 'projects.tryDemo',
    breakdown: {
      architecture:
        'Pricing, opening hours and per-vehicle availability live in pure, tested functions. The UI is Vue 3 with hash routing so it runs on static hosting.',
      security:
        'Inputs are validated on blur and on submit, and availability is re-checked at the last moment. A real build repeats this on the server and handles payments and ID checks.',
      challenges:
        'A boat must stay blocked through its turnaround, a multi-day scooter rental spans midnight, and the last free unit must not be sold twice.',
    },
  },
  {
    id: 11,
    slug: 'vivliario-service-book-demo',
    title: 'Vivliario, digital service book demo',
    description:
      'Demo concept: a workshop service book with the work history, MOT and oil-change reminders computed from the data, and appointment booking.',
    stack: ['Vue 3', 'TypeScript', 'Vitest'],
    imageLabel: 'Vivliario demo',
    imageUrl: '/vivliario-service-book-preview.webp',
    githubUrl: 'https://github.com/VarveroglouVasileios/VivliarioProject',
    liveUrl: 'https://varveroglouvasileios.github.io/VivliarioProject/',
    liveLabelKey: 'projects.tryDemo',
    breakdown: {
      architecture:
        'Dates, reminders, plate normalisation, validation and appointment slots live in pure, tested functions. The UI is Vue 3 with hash routing so it runs on static hosting.',
      security:
        'Every form is validated on blur and submit, with Greek plate and mobile formats. Data is kept in sessionStorage only and the page ships a strict Content-Security-Policy.',
      challenges:
        'Reminders must stay correct across month and leap-day boundaries, and a half-filled form must never lose what the user typed.',
    },
  },
  {
    id: 12,
    slug: 'room-360-demo',
    title: 'Room 360, interactive room viewer demo',
    description:
      'Demo concept: a hotel room you can drag around, with numbered hotspots that explain the bed, terrace and fittings before booking.',
    stack: ['Vue 3', 'TypeScript', 'Vitest'],
    imageLabel: 'Room 360 demo',
    imageUrl: '/room-360-preview.webp',
    githubUrl: 'https://github.com/VarveroglouVasileios/DwmatioProject',
    liveUrl: 'https://varveroglouvasileios.github.io/DwmatioProject/',
    liveLabelKey: 'projects.tryDemo',
    breakdown: {
      architecture:
        'Pan limits, zoom and hotspot placement are pure, tested functions. Pointer events handle dragging and a ResizeObserver keeps the layout correct on any screen.',
      security:
        'There is no backend and nothing is stored. The external link to the booking demo uses rel=noopener and the page ships a strict Content-Security-Policy.',
      challenges:
        'A hotspot must stay glued to the right object while the photo moves and the window resizes, and the photo must never reveal an empty edge.',
    },
  },
  {
    id: 13,
    slug: 'metrisi-renovation-estimate-demo',
    title: 'Metrisi, renovation estimate demo',
    description:
      'Demo concept: four questions give an instant cost range for a renovation, split into materials, labour and extras, before asking for a visit.',
    stack: ['Vue 3', 'TypeScript', 'Vitest'],
    imageLabel: 'Metrisi demo',
    imageUrl: '/metrisi-renovation-preview.webp',
    githubUrl: 'https://github.com/VarveroglouVasileios/MetrisiProject',
    liveUrl: 'https://varveroglouvasileios.github.io/MetrisiProject/',
    liveLabelKey: 'projects.tryDemo',
    breakdown: {
      architecture:
        'All pricing is a pure function from the answers to a breakdown and range, so it is easy to test and to replace with a real price list.',
      security:
        'Area is clamped and inputs are validated before use. Phone numbers are checked against Greek formats and nothing is sent anywhere.',
      challenges:
        'The range has to stay ordered for every combination of room, level and extras, and the number a customer sees must match the breakdown to the euro.',
    },
  },
  {
    id: 14,
    slug: 'rythmos-class-waitlist-demo',
    title: 'Rythmos, class booking with a waitlist demo',
    description:
      'Demo concept: a studio timetable with limited places, a waitlist, and a 15-minute offer that passes to the next person if it is not accepted.',
    stack: ['Vue 3', 'TypeScript', 'Vitest'],
    imageLabel: 'Rythmos demo',
    imageUrl: '/rythmos-classes-preview.webp',
    githubUrl: 'https://github.com/VarveroglouVasileios/RythmosProject',
    liveUrl: 'https://varveroglouvasileios.github.io/RythmosProject/',
    liveLabelKey: 'projects.tryDemo',
    breakdown: {
      architecture:
        'Capacity, waitlist and offers are pure functions over plain data that return a new state, which makes every rule testable without a clock or a database.',
      security:
        'Inputs are validated, the class start time is checked on every action, and an expired offer can never be confirmed. A real build repeats these rules on the server.',
      challenges:
        'A held seat must not be taken by a newcomer, an expired offer must pass to the next person exactly once, and no offer may be made in the last minutes of a class.',
    },
  },
  {
    id: 15,
    slug: 'noumero-queue-demo',
    title: 'Noumero, digital queue demo',
    description:
      'Demo concept: customers take a number from their phone and watch their place move live, while the shop presses Next. Includes a QR code.',
    stack: ['Vue 3', 'TypeScript', 'QR code', 'Vitest'],
    imageLabel: 'Noumero demo',
    imageUrl: '/noumero-queue-preview.webp',
    githubUrl: 'https://github.com/VarveroglouVasileios/NoumeroProject',
    liveUrl: 'https://varveroglouvasileios.github.io/NoumeroProject/',
    liveLabelKey: 'projects.tryDemo',
    breakdown: {
      architecture:
        'Queue rules are pure functions that return a new state. Tabs share versioned state over a BroadcastChannel, and a late tab asks the others for the current queue.',
      security:
        'No personal data is required (the name is optional and capped at 40 characters), the QR is generated locally and the page ships a strict Content-Security-Policy.',
      challenges:
        'Numbers must never be reused, an estimate must learn from actual times, and tabs must converge without echoing each other\'s updates forever.',
    },
  },
  {
    id: 16,
    slug: 'peripatos-walk-demo',
    title: 'Peripatos, self-guided walk demo',
    description:
      'Demo concept: a five-stop walking tour of Kavala with a map, optional location, and an offline mode that works without a signal.',
    stack: ['Vue 3', 'TypeScript', 'Service Worker', 'Vitest'],
    imageLabel: 'Peripatos demo',
    imageUrl: '/peripatos-walk-preview.webp',
    githubUrl: 'https://github.com/VarveroglouVasileios/PeripatosProject',
    liveUrl: 'https://varveroglouvasileios.github.io/PeripatosProject/',
    liveLabelKey: 'projects.tryDemo',
    breakdown: {
      architecture:
        'Geometry (haversine distance, bearing, projection) is pure and tested. A small service worker caches the app and the views are bundled together so every page works offline.',
      security:
        'The location permission is requested only when the visitor asks for it, and the position stays on the device. The worker only caches same-origin files.',
      challenges:
        'Offline mode must include every route of the app, not only the home page, and the cache must still answer when the browser sends a different Vary header.',
    },
  },
  {
    id: 17,
    slug: 'ktima-seating-planner-demo',
    title: 'Ktima Dafni, event seating planner demo',
    description:
      'Demo concept: an event venue where the couple drags guests onto tables, sees overfull warnings, and downloads the final list for the venue.',
    stack: ['Vue 3', 'TypeScript', 'SVG', 'Vitest'],
    imageLabel: 'Ktima Dafni demo',
    imageUrl: '/ktima-seating-preview.webp',
    githubUrl: 'https://github.com/VarveroglouVasileios/KtimaProject',
    liveUrl: 'https://varveroglouvasileios.github.io/KtimaProject/',
    liveLabelKey: 'projects.tryDemo',
    breakdown: {
      architecture:
        'Seating rules are pure functions over a plan that is never mutated. The floor is SVG, with drag and drop plus an accessible click-to-assign path.',
      security:
        'CSV cells that start with =, +, - or @ are neutralised so a guest name cannot become a spreadsheet formula, and all text is rendered as text.',
      challenges:
        'Auto-seating has to relieve overfull tables first and keep groups together without ever exceeding capacity, and drag and drop must have a keyboard alternative.',
    },
  },
  {
    id: 18,
    slug: 'karpos-olive-oil-passport-demo',
    title: 'Karpos, olive oil batch passport demo',
    description:
      'Demo concept: a QR code on the bottle opens the journey of the batch, from harvest and pressing to the lab analysis and bottling.',
    stack: ['Vue 3', 'TypeScript', 'QR code', 'Vitest'],
    imageLabel: 'Karpos demo',
    imageUrl: '/karpos-olive-oil-preview.webp',
    githubUrl: 'https://github.com/VarveroglouVasileios/KarposProject',
    liveUrl: 'https://varveroglouvasileios.github.io/KarposProject/',
    liveLabelKey: 'projects.tryDemo',
    breakdown: {
      architecture:
        'The batch is encoded into the link itself (compact JSON plus a Fletcher-16 checksum), so the customer page needs no backend. Category rules are pure and tested.',
      security:
        'Decoded data is re-validated before display, so a hand-edited link cannot show invalid values, and nothing is inserted as HTML.',
      challenges:
        'A mistyped, truncated or edited link must be detected and explained instead of showing wrong data, and the QR must stay small enough to scan on a label.',
    },
  },
  {
    id: 19,
    slug: 'ena-ical-calendar-demo',
    title: 'ENA, unified booking calendar demo',
    description:
      'Demo concept: calendars from different booking channels (iCal) merged per property, with overlaps flagged before the guest arrives.',
    stack: ['Vue 3', 'TypeScript', 'iCalendar', 'Vitest'],
    imageLabel: 'ENA demo',
    imageUrl: '/ena-calendar-preview.webp',
    githubUrl: 'https://github.com/VarveroglouVasileios/EnaProject',
    liveUrl: 'https://varveroglouvasileios.github.io/EnaProject/',
    liveLabelKey: 'projects.tryDemo',
    breakdown: {
      architecture:
        'The iCal reader and writer, overlap detection and booking checks are pure functions. The check-out day is exclusive, so a same-day turnover is never a false alarm.',
      security:
        'Calendar text is only parsed as text, never executed or inserted as HTML, and exported text is escaped and folded as the format requires.',
      challenges:
        'Real feeds have folded lines, date-only and date-time values and cancelled events, and an overlap must be reported exactly once per pair of bookings.',
    },
  },
  {
    id: 20,
    slug: 'diafaneia-site-audit-demo',
    title: 'Diafaneia, website audit report demo',
    description:
      'Demo concept: paste a page\'s HTML and headers and get a report on third-party calls, likely cookies, missing security headers and basic SEO, with a plain sentence for the client.',
    stack: ['Vue 3', 'TypeScript', 'Vitest'],
    imageLabel: 'Diafaneia demo',
    imageUrl: '/diafaneia-audit-preview.webp',
    githubUrl: 'https://github.com/VarveroglouVasileios/DiafaneiaProject',
    liveUrl: 'https://varveroglouvasileios.github.io/DiafaneiaProject/',
    liveLabelKey: 'projects.tryDemo',
    breakdown: {
      architecture:
        'The audit is a pure function from HTML and header text to a report. Markup is scanned with a small tokenizer, never rendered, so pasted pages cannot run.',
      security:
        'Pasted code is parsed only as text and displayed with escaping. Size is capped and nothing leaves the device. An automated check does not replace legal advice and the page says so.',
      challenges:
        'Commented-out tags and script bodies must not be mistaken for real resources, and one noisy kind of finding must not zero the score.',
    },
  },
  {
    id: 21,
    slug: 'deltio-greek-id-validation-demo',
    title: 'Deltio, Greek identifier validation library demo',
    description:
      'Demo concept: a small TypeScript library that checks Greek tax numbers, social security numbers, IBANs, mobiles and postcodes locally, with a playground.',
    stack: ['TypeScript', 'Vue 3', 'Vitest'],
    imageLabel: 'Deltio demo',
    imageUrl: '/deltio-validation-preview.webp',
    githubUrl: 'https://github.com/VarveroglouVasileios/DeltioProject',
    liveUrl: 'https://varveroglouvasileios.github.io/DeltioProject/',
    liveLabelKey: 'projects.tryDemo',
    breakdown: {
      architecture:
        'A dependency-free module of pure functions that each return a result with a reason and, for check-digit schemes, the expected and found digit.',
      security:
        'Nothing is logged, stored or transmitted, and test data is fictional. IBAN checks use arithmetic without BigInt so they work on long strings everywhere.',
      challenges:
        'The IBAN checksum has to be computed without large-number types, and dates in a social security number must be valid in either century.',
    },
  },
  {
    id: 22,
    slug: 'slotlock-booking-api-demo',
    title: 'Slotlock, double-booking-proof booking API demo',
    description:
      'Demo concept: a booking API where two simultaneous requests for the same slot can never both succeed, because the database itself holds the lock. Runs on Render with PostgreSQL on Neon.',
    stack: ['Node.js', 'Express', 'TypeScript', 'Sequelize', 'PostgreSQL', 'Vue 3', 'Vitest'],
    imageLabel: 'Slotlock demo',
    imageUrl: '/slotlock-api-preview.webp',
    githubUrl: 'https://github.com/VarveroglouVasileios/SlotlockProject',
    liveUrl: 'https://varveroglouvasileios.github.io/SlotlockProject/',
    liveLabelKey: 'projects.tryDemo',
    breakdown: {
      architecture:
        'A pure rules module (slots, validation, alternatives) plus an Express API on Sequelize. The primary key on the slot table is the lock, so correctness does not depend on application code or on how many server instances run.',
      security:
        'Input is validated on the server, JSON size is capped, CORS allows only the portfolio origin, requests are rate limited, no cookies are used and no personal data is collected.',
      challenges:
        'Concurrent transactions, retried requests and partially overlapping windows all had to give exactly one winner, and the same rules had to behave the same in SQLite for tests and PostgreSQL in production.',
    },
  },
  {
    id: 4,
    slug: 'shadow-ai-firewall',
    title: 'Shadow AI Firewall',
    description:
      'Browser extension that masks PII, financial identifiers, and high-signal secrets in outbound requests to supported AI chat sites—redacting serialized payloads before they leave the browser while restoring readable text locally in the UI.',
    stack: ['TypeScript', 'WebExtensions', 'Chrome MV3'],
    imageLabel: 'Shadow AI Firewall',
    imageUrl: '/shadow-ai-preview.png',
    githubUrl: 'https://github.com/varveroglouvasileios',
    liveUrl: 'https://chromewebstore.google.com/detail/dobaajjnlgpbfkhlfldikmlfihnilajp',
    liveLabelKey: 'projects.chromeStore',
    embeddable: false,
    breakdown: {
      architecture:
        'Service worker and content coordination intercept outgoing fetch/XHR bodies on declared origins, walk JSON and embedded strings, and replace matches with stable placeholders. An in-memory mapping supports local restoration where the page renders responses.',
      security:
        'Heuristic detectors (email, IBAN, cards, Greek tax/social patterns, phone, money-like values, JWT-shaped tokens, etc.) run client-side; protection is scoped to host permissions so the extension does not run elsewhere. Settings stay local unless an enterprise key enables minimal metadata telemetry.',
      challenges:
        'Avoiding fragile DOM rewrites in SPAs by operating on the network layer, merging overlapping detections predictably, and tuning rules to limit false positives on real chat UIs without blocking normal usage.',
    },
  },
  {
    id: 3,
    slug: 'vibebites',
    title: 'VibeBites',
    description:
      'Greek-first social cooking platform: recipe discovery, shopping lists, meal planning, AI fridge assistant (ingredients to recipes with macros), cooking mode, and PWA install — built for sharing across social.',
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'GROQ', 'Vercel'],
    imageLabel: 'VibeBites',
    imageUrl: '/VibeBites.png',
    githubUrl: 'https://github.com/varveroglouvasileios',
    liveUrl: 'https://vibe-bites.vercel.app/',
    breakdown: {
      architecture: 'Micro-frontend inspired architecture with Vue 3 and Pinia for state management. Uses GROQ for highly efficient AI-driven recipe matching.',
      security: 'Implemented secure API authentication and rate limiting to protect AI endpoint usage. Sanity IO integration follows strict CORS policies.',
      challenges: 'Optimizing the AI assistant to handle varying Greek culinary terms and ensuring a smooth offline experience via PWA service workers.'
    }
  },
  {
    id: 2,
    slug: 'shadow-ai-dashboard',
    title: 'Shadow AI — Admin Dashboard',
    description:
      'Marketing and admin experience for Shadow AI: a security layer between teams and AI tools — zero-knowledge inspection, DLP-style policies, secret redaction, and live session visibility without storing prompts.',
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    imageLabel: 'Shadow AI — Admin Dashboard',
    imageUrl: '/shadow-ai-preview.png',
    githubUrl: 'https://github.com/varveroglouvasileios',
    liveUrl: 'https://shadow-ai-dashboard-topaz.vercel.app/',
    breakdown: {
      architecture: 'Modular dashboard design with real-time streaming components. Built with a focus on auditability and high-velocity data visualization.',
      security: 'Core focus: Zero-knowledge architecture. The dashboard visualizes redaction events without ever seeing the sensitive original data.',
      challenges: 'Designing a UI that can display high-frequency security events without overwhelming the user or sacrificing performance.'
    }
  },
  // Temporarily inactive — uncomment to restore in portfolio
  // {
  //   id: 1,
  //   title: 'BenefitPulse',
  //   description:
  //     'Platform that helps citizens quickly discover relevant Greek government benefits and allowances through a guided, user-friendly experience.',
  //   stack: ['Vue 3', 'TypeScript', 'Node.js', 'Tailwind'],
  //   imageLabel: 'BenefitPulse',
  //   imageUrl: '/benefitpulse-preview.png',
  //   githubUrl: 'https://github.com/VarveroglouVasileios',
  //   liveUrl: 'https://benefitpulse.me/',
  //   breakdown: {
  //     architecture: 'Full stack implementation with a Node.js API serving as an aggregator for various government benefit criteria.',
  //     security: 'Secure data ingestion from multiple public sources and local storage encryption for user preferences.',
  //     challenges: 'Normalizing complex and often changing government criteria into a simplified, deterministic logic engine.'
  //   }
  // },
]

export const experience: ExperienceItem[] = [
  {
    id: 4,
    period: 'September 2017 – April 2022',
    title: 'BSc in Computer Science and Engineering',
    organization: 'University of Thessaly',
    description:
      'Undergraduate studies in computer science and engineering, covering algorithms, software engineering, networks, and distributed systems.',
    type: 'education',
  },
  {
    id: 3,
    period: 'April 2021 – April 2022',
    title: 'Junior Front-end Developer',
    organization: 'Epsilon Informatics',
    description:
      'Implemented front-end features and interfaces for web projects, collaborating closely with designers and backend teams to deliver maintainable and user-focused solutions.',
    type: 'work',
  },
  {
    id: 2,
    period: 'April 2023 – Present',
    title: 'Full Stack Developer',
    organization: 'FactSet',
    description:
      'Building and maintaining enterprise-scale web applications in a global environment using Vue.js, Node.js, TypeScript, PHP (Symfony), SQL, and Pinia with a strong focus on clean architecture, performance, and reliability.',
    type: 'work',
  },
  {
    id: 5,
    period: 'October 2023 – April 2024 · 7 mos · Remote',
    title: 'Front-end Developer',
    organization: 'StructWise',
    description: 'Delivered front-end features and UI for web products in a fully remote engagement, working with AngularJS and Tailwind CSS alongside designers and backend engineers.',
    type: 'work',
  },
  {
    id: 1,
    period: 'October 2024 – November 2026',
    title: 'MSc in Cybersecurity',
    organization: 'International Hellenic University',
    description:
      'Postgraduate studies focused on cybersecurity, secure software development, and application security, with an emphasis on secure-by-design systems.',
    type: 'education',
  },
]

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/varveroglouvasileios' },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/vasileios-varveroglou-769b52249',
  },
]

export const insights: Insight[] = [
  {
    id: 1,
    title: 'Secure by Design: Shifting Left',
    category: 'Security',
    content: 'Security should not be an after-thought. By integrating security checks early in the development lifecycle (SAST/DAST), we reduce long-term risk and technical debt.',
    date: 'March 2026'
  },
  {
    id: 2,
    title: 'Vue 3 Composition API at Scale',
    category: 'Architecture',
    content: 'Using composables effectively allows for high code reuse and cleaner components. In large enterprise apps, this is key to maintaining a sane codebase.',
    date: 'February 2026'
  },
  {
    id: 3,
    title: 'The Zero-Trust Frontend',
    category: 'Cybersecurity',
    content: 'Never trust user input, even on the client side. Robust validation and sanitization are the first lines of defense against common attacks like XSS.',
    date: 'January 2026'
  }
]
