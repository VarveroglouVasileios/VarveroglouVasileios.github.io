export type ProjectId = 'atlas-runtime' | 'nebula-console' | 'prism-labs'

export interface PortfolioProject {
  id: ProjectId
  title: string
  sector: string
  tagline: string
  description: string
  stack: string[]
  impact: string
  position: [number, number, number]
  accentHex: string
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'atlas-runtime',
    title: 'Atlas Runtime',
    sector: 'Orbital Compute Sector',
    tagline: 'Distributed rendering orchestration for realtime teams.',
    description:
      'A resilient render orchestration layer that dynamically balances GPU jobs across edge clusters and live production workloads.',
    stack: ['Vue 3', 'Babylon.js', 'Rust', 'Kubernetes'],
    impact: 'Decreased render queue latency by 43% across burst traffic windows.',
    position: [-14, 4.8, 8],
    accentHex: '#7dd3fc',
  },
  {
    id: 'nebula-console',
    title: 'Nebula Console',
    sector: 'Security Intelligence Sector',
    tagline: 'Security observability with cinematic interaction design.',
    description:
      'An operations cockpit that fuses telemetry, anomaly detection, and incident timeline playback into a single high-trust interface.',
    stack: ['TypeScript', 'GraphQL', 'PostgreSQL', 'WebGL'],
    impact: 'Reduced triage-to-resolution cycle time from 41 to 18 minutes.',
    position: [0, 5.2, -6],
    accentHex: '#a78bfa',
  },
  {
    id: 'prism-labs',
    title: 'Prism Labs',
    sector: 'Immersive Commerce Sector',
    tagline: 'Immersive product visualization for enterprise launches.',
    description:
      'A 3D storytelling toolkit that lets go-to-market teams compose product launch exhibitions with programmable camera choreography.',
    stack: ['Vue 3', 'Babylon.js', 'Node.js', 'Sentry'],
    impact: 'Improved engagement in launch demos by 2.4x over static showcases.',
    position: [14, 5, 9],
    accentHex: '#34d399',
  },
]
