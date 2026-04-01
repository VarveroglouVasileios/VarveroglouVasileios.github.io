import type { ExperienceItem, Project, Skill, SocialLink } from '@/types/portfolio'

export const techSkills: Skill[] = [
  { name: 'Vue 3', accent: 'from-emerald-400 to-emerald-300' },
  { name: 'Angular.js', accent: 'from-rose-400 to-red-300' },
  { name: 'Node.js', accent: 'from-lime-400 to-green-300' },
  { name: 'TypeScript', accent: 'from-blue-400 to-cyan-300' },
  { name: 'Tailwind CSS', accent: 'from-teal-400 to-cyan-300' },
  { name: 'Express', accent: 'from-indigo-400 to-violet-300' },
  { name: 'Pinia', accent: 'from-yellow-300 to-amber-300' },
  { name: 'MongoDB', accent: 'from-sky-400 to-blue-300' },
  { name: 'PHP', accent: 'from-violet-400 to-purple-300' },
  { name: 'Application Security', accent: 'from-rose-400 to-red-300' },
]

export const projects: Project[] = [
  {
    id: 3,
    title: 'VibeBites',
    description:
      'Greek-first social cooking platform: recipe discovery, shopping lists, meal planning, AI fridge assistant (ingredients to recipes with macros), cooking mode, and PWA install — built for sharing across social.',
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Groq', 'Vercel'],
    imageLabel: 'VibeBites landing — recipes, planner, and AI fridge assistant',
    imageUrl: '/VibeBites.png',
    githubUrl: 'https://github.com/varveroglouvasileios',
    liveUrl: 'https://vibe-bites.vercel.app/',
  },
  {
    id: 2,
    title: 'Shadow AI — Admin Dashboard',
    description:
      'Marketing and admin experience for Shadow AI: a security layer between teams and AI tools — zero-knowledge inspection, DLP-style policies, secret redaction, and live session visibility without storing prompts.',
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    imageLabel: 'Shadow AI admin dashboard and product landing',
    imageUrl: '/shadow-ai-preview.png',
    githubUrl: 'https://github.com/varveroglouvasileios',
    liveUrl: 'https://shadow-ai-dashboard-topaz.vercel.app/',
  },
  {
    id: 1,
    title: 'BenefitPulse',
    description:
      'Platform that helps citizens quickly discover relevant Greek government benefits and allowances through a guided, user-friendly experience.',
    stack: ['Vue 3', 'TypeScript', 'Node.js', 'Tailwind'],
    imageLabel: 'BenefitPulse landing and search experience',
    imageUrl: '/benefitpulse-preview.png',
    githubUrl: 'https://github.com/VarveroglouVasileios',
    liveUrl: 'https://benefitpulse.me/',
  },
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
    description:
      'Delivered front-end features and UI for web products in a fully remote engagement, working with AngularJS and Tailwind CSS alongside designers and backend engineers.',
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
