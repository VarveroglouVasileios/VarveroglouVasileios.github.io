/**
 * Type definitions for OrbitFolio
 */

/** 3D coordinates [x, y, z] */
export type Coordinates = [number, number, number]

/** Project card data (GitHub, portfolio projects, etc.) */
export interface Project {
  id: string
  title: string
  description: string
  url?: string
  techStack?: string[]
  /** Screenshot or preview image URL for 3D device screen */
  screenshot?: string
  /** Live URL for iframe preview (optional, falls back to screenshot) */
  previewUrl?: string
}

/** Social link card (LinkedIn, GitHub, etc.) */
export interface SocialLink {
  id: string
  title: string
  url: string
  icon?: string
}

/** Union type for orbital cards (projects or social links) */
export type OrbitalCard = (Project | SocialLink) & {
  /** Orbital angle in radians (position on the orbit) */
  orbitAngle: number
  /** Orbital radius from center */
  orbitRadius: number
}
