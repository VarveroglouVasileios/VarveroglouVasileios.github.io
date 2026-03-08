import type { Project } from '@/types'

/** Portfolio projects — customize with your real work */
export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack online store with Stripe, inventory, and real-time analytics.',
    url: 'https://example.com/project-1',
    techStack: ['Vue 3', 'Node.js', 'Stripe', 'PostgreSQL'],
    screenshot: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=640&h=400&fit=crop',
  },
  {
    id: '2',
    title: 'AI Dashboard',
    description: 'Real-time ML model monitoring and inference pipeline visualization.',
    url: 'https://example.com/project-2',
    techStack: ['React', 'Python', 'TensorFlow'],
    screenshot: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=400&fit=crop',
  },
  {
    id: '3',
    title: 'Design System',
    description: 'Component library and design tokens for cross-product consistency.',
    url: 'https://example.com/project-3',
    techStack: ['Vue 3', 'Tailwind', 'Storybook'],
    screenshot: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=640&h=400&fit=crop',
  },
  {
    id: '4',
    title: 'Real-Time Collab',
    description: 'Collaborative whiteboard with WebRTC and CRDT-based sync.',
    url: 'https://example.com/project-4',
    techStack: ['TypeScript', 'WebRTC', 'Yjs'],
    screenshot: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=640&h=400&fit=crop',
  },
]
