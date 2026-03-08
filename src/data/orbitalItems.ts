import type { OrbitalItem } from '../types'

/**
 * Orbital items: 2 project cards + 2 social link cards.
 * Positions are set dynamically per-frame from the orbit angle,
 * but we seed each item with initial angle/radius values here.
 */
export const orbitalItems: OrbitalItem[] = [
  {
    id: 'project-1',
    title: 'NebulaChat',
    description:
      'A real-time chat application built with Vue 3, WebSockets, and a Node.js backend. Features end-to-end encryption and a glassmorphic UI.',
    tags: ['Vue 3', 'Node.js', 'WebSockets', 'TypeScript'],
    liveUrl: 'https://example.com/nebulachat',
    repoUrl: 'https://github.com',
    color: '#6366f1',
    position: [3, 0, 0],
    angle: 0,
    radius: 3,
  },
  {
    id: 'project-2',
    title: 'AstroShop',
    description:
      'An e-commerce platform with 3D product previews powered by Three.js and a headless CMS backend. Fully responsive and optimised.',
    tags: ['Three.js', 'Nuxt 3', 'Stripe', 'Tailwind'],
    liveUrl: 'https://example.com/astroshop',
    repoUrl: 'https://github.com',
    color: '#ec4899',
    position: [-3, 0, 0],
    angle: Math.PI,
    radius: 3,
  },
  {
    id: 'social-github',
    label: 'GitHub',
    url: 'https://github.com',
    icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
    color: '#f0f6fc',
    position: [0, 0, 3],
    angle: Math.PI / 2,
    radius: 3,
  },
  {
    id: 'social-linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    color: '#0a66c2',
    position: [0, 0, -3],
    angle: (3 * Math.PI) / 2,
    radius: 3,
  },
]
