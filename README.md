# OrbitFolio

Portfolio website built with Vue 3, TypeScript, Tailwind CSS, TresJS (3D), and GSAP.

## Features

- **3D background** – Cursor-reactive wireframe scene with TresJS
- **Scroll animations** – GSAP ScrollTrigger reveals and parallax
- **Responsive** – Mobile-first, scroll-snap sections
- **Dark theme** – Cyan & purple accents

## Tech Stack

- Vue 3 + TypeScript
- Vite
- Tailwind CSS
- TresJS (Three.js for Vue)
- GSAP + ScrollTrigger
- Vue Router

## Setup

```bash
# Install dependencies
yarn install

# Optional: copy .env.example to .env and add your Formspree ID for the contact form
cp .env.example .env

# Development (port 8989)
yarn dev

# Build
yarn build

# Preview production build
yarn preview
```

### Contact Form (Formspree)

To receive contact messages at your email:

1. Go to [formspree.io](https://formspree.io) and create an account
2. Create a new form and set your email (varveroglou@hotmail.gr) as recipient
3. Copy the form ID from the endpoint URL (e.g. `mnopqrst` from `https://formspree.io/f/mnopqrst`)
4. Add to `.env`: `VITE_FORMSPREE_ID=mnopqrst`

Without `VITE_FORMSPREE_ID`, the form falls back to opening the user's email client with a pre-filled mailto link.

## Deploy to GitHub Pages

1. **Push to GitHub** – Create a repo and push this project
2. **Enable Pages** – Settings → Pages → Source: GitHub Actions
3. **Auto-deploy** – On push to `main`, the workflow builds and deploys

The included `.github/workflows/deploy.yml` handles build and deploy. The base path is set automatically from your repo name.

### Manual build with custom base path

```bash
VITE_BASE='/your-repo-name/' yarn build
```

### Other hosts (Vercel, Netlify)

Deploy the `dist` folder. No base path needed for custom domains.
