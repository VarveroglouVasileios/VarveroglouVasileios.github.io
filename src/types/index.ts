import type { Vector3Tuple } from 'three'

/** A developer project card shown as a 3D portal */
export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  liveUrl?: string
  repoUrl?: string
  /** Color used for the card's emissive glow (hex string, e.g. '#6366f1') */
  color: string
}

/** A social / external link card */
export interface SocialLink {
  id: string
  label: string
  url: string
  icon: string // SVG path data or icon name
  color: string
}

/** Union type for anything that can occupy an orbital slot */
export type OrbitalItem = (Project | SocialLink) & {
  /** World-space position [x, y, z] */
  position: Vector3Tuple
  /** Starting orbit angle in radians */
  angle: number
  /** Orbit radius */
  radius: number
}

/** Camera target info used when a card is clicked */
export interface CameraTarget {
  position: Vector3Tuple
  lookAt: Vector3Tuple
}

/** Type guard: check if an OrbitalItem is a Project */
export function isProject(item: OrbitalItem): item is Project & {
  position: Vector3Tuple
  angle: number
  radius: number
} {
  return 'title' in item && 'description' in item
}
