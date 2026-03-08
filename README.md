# OrbitFolio

A stunning, interactive 3D portfolio built with Vue 3, TypeScript, and TresJS. It combines Vite's speed with Three.js magic, creating an immersive 3D universe where projects and social links float, reacting to user interactions with smooth GSAP animations.

## ✨ Features

- 🌌 **Immersive Star Field** — 4000-particle star system via `@tresjs/cientos` `<Stars>`
- 💎 **Glassmorphic Icosahedron** — A slowly-rotating, pulsing central hero element with wireframe overlay
- �� **Orbital Cards** — 4 floating 3D cards (2 projects + 2 social links) orbiting the centre
- 🖱️ **Hover interactions** — Cards scale up and glow on hover (GSAP + emissive material)
- 🎥 **Click-to-zoom** — Camera performs a smooth GSAP zoom toward the clicked card
- 📋 **Detail Overlay** — A glassmorphic Tailwind panel fades in with project details
- 🖱️ **Scroll to rotate** — Mouse wheel rotates the entire orbital ring

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vue 3 (Composition API, `<script setup lang="ts">`) |
| 3D Engine | TresJS (`@tresjs/core` v5, `@tresjs/cientos` v5) |
| 3D Renderer | Three.js |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| Animations | GSAP 3 |
| State | Pinia |
| Language | TypeScript (strict) |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Type-check
npx vue-tsc --noEmit

# Build for production
npm run build

# Preview the production build
npm run preview
```

## 📁 Project Structure

```
src/
├── types/
│   └── index.ts          # TypeScript interfaces (Project, SocialLink, OrbitalItem…)
├── stores/
│   └── sceneStore.ts     # Pinia store (active card, overlay, camera, orbit)
├── data/
│   └── orbitalItems.ts   # Orbital card data (2 projects + 2 social links)
├── components/
│   ├── Experience.vue    # Core 3D scene (lights, camera, icosahedron, cards)
│   └── ProjectCard.vue   # Reusable 3D card with hover/click interactions
├── App.vue               # Root layout: TresCanvas + HTML overlays
├── main.ts               # App entry point
└── style.css             # Tailwind CSS v4 + global resets
```

## 🎨 Customisation

Edit `src/data/orbitalItems.ts` to add your own projects and social links. Each item accepts:

```ts
{
  id: 'my-project',
  title: 'My Project',
  description: 'What it does.',
  tags: ['Vue', 'TypeScript'],
  liveUrl: 'https://…',
  repoUrl: 'https://github.com/…',
  color: '#6366f1',   // card accent colour (hex)
  position: [3, 0, 0],
  angle: 0,
  radius: 3,
}
```

## 📝 License

MIT
