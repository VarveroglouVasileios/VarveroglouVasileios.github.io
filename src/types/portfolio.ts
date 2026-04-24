export type TechName =
  | 'Vue 3'
  | 'Angular.js'
  | 'Node.js'
  | 'TypeScript'
  | 'Tailwind CSS'
  | 'Express'
  | 'Pinia'
  | 'MongoDB'
  | 'PHP'
  | 'Application Security'

export interface Skill {
  name: TechName
  accent: string
}

export interface Project {
  id: number
  title: string
  description: string
  stack: string[]
  imageLabel: string
  imageUrl?: string
  githubUrl: string
  liveUrl: string
  /** When set, used as i18n key for the primary outbound link (default: projects.live). */
  liveLabelKey?: string
  breakdown?: {
    architecture: string
    security: string
    challenges: string
  }
}

export interface ExperienceItem {
  id: number
  period: string
  title: string
  organization: string
  description: string
  type: 'work' | 'education'
}

export interface SocialLink {
  label: string
  url: string
}

export interface Insight {
  id: number
  title: string
  category: string
  content: string
  date: string
}
