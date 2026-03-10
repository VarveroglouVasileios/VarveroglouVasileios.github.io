export type TechName =
  | 'Vue 3'
  | 'Node.js'
  | 'TypeScript'
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
