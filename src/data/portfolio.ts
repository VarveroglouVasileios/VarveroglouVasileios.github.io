import type { ExperienceItem, Project, Skill, SocialLink, Insight } from '@/types/portfolio'

export const techSkills: Skill[] = [
  { name: 'Vue 3', accent: 'from-emerald-400 to-emerald-300' },
  { name: 'Angular.js', accent: 'from-rose-400 to-rose-300' },
  { name: 'Node.js', accent: 'from-lime-400 to-lime-300' },
  { name: 'TypeScript', accent: 'from-blue-400 to-blue-300' },
  { name: 'Tailwind CSS', accent: 'from-cyan-400 to-cyan-300' },
  { name: 'Express', accent: 'from-slate-400 to-slate-300' },
  { name: 'Pinia', accent: 'from-amber-400 to-amber-300' },
  { name: 'MongoDB', accent: 'from-green-400 to-green-300' },
  { name: 'PHP', accent: 'from-indigo-400 to-indigo-300' },
  { name: 'Application Security', accent: 'from-orange-400 to-orange-300' },
]

export const projects: Project[] = [
  {
    id: 4,
    title: 'Shadow AI Firewall',
    description:
      'Browser extension that masks PII, financial identifiers, and high-signal secrets in outbound requests to supported AI chat sites—redacting serialized payloads before they leave the browser while restoring readable text locally in the UI.',
    stack: ['TypeScript', 'WebExtensions', 'Chrome MV3'],
    imageLabel: 'Shadow AI Firewall',
    imageUrl: '/shadow-ai-preview.png',
    githubUrl: 'https://github.com/varveroglouvasileios',
    liveUrl: 'https://chromewebstore.google.com/detail/dobaajjnlgpbfkhlfldikmlfihnilajp',
    liveLabelKey: 'projects.chromeStore',
    breakdown: {
      architecture:
        'Service worker and content coordination intercept outgoing fetch/XHR bodies on declared origins, walk JSON and embedded strings, and replace matches with stable placeholders. An in-memory mapping supports local restoration where the page renders responses.',
      security:
        'Heuristic detectors (email, IBAN, cards, Greek tax/social patterns, phone, money-like values, JWT-shaped tokens, etc.) run client-side; protection is scoped to host permissions so the extension does not run elsewhere. Settings stay local unless an enterprise key enables minimal metadata telemetry.',
      challenges:
        'Avoiding fragile DOM rewrites in SPAs by operating on the network layer, merging overlapping detections predictably, and tuning rules to limit false positives on real chat UIs without blocking normal usage.',
    },
  },
  {
    id: 3,
    title: 'VibeBites',
    description:
      'Greek-first social cooking platform: recipe discovery, shopping lists, meal planning, AI fridge assistant (ingredients to recipes with macros), cooking mode, and PWA install — built for sharing across social.',
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'GROQ', 'Vercel'],
    imageLabel: 'VibeBites',
    imageUrl: '/VibeBites.png',
    githubUrl: 'https://github.com/varveroglouvasileios',
    liveUrl: 'https://vibe-bites.vercel.app/',
    breakdown: {
      architecture: 'Micro-frontend inspired architecture with Vue 3 and Pinia for state management. Uses GROQ for highly efficient AI-driven recipe matching.',
      security: 'Implemented secure API authentication and rate limiting to protect AI endpoint usage. Sanity IO integration follows strict CORS policies.',
      challenges: 'Optimizing the AI assistant to handle varying Greek culinary terms and ensuring a smooth offline experience via PWA service workers.'
    }
  },
  {
    id: 2,
    title: 'Shadow AI — Admin Dashboard',
    description:
      'Marketing and admin experience for Shadow AI: a security layer between teams and AI tools — zero-knowledge inspection, DLP-style policies, secret redaction, and live session visibility without storing prompts.',
    stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    imageLabel: 'Shadow AI — Admin Dashboard',
    imageUrl: '/shadow-ai-preview.png',
    githubUrl: 'https://github.com/varveroglouvasileios',
    liveUrl: 'https://shadow-ai-dashboard-topaz.vercel.app/',
    breakdown: {
      architecture: 'Modular dashboard design with real-time streaming components. Built with a focus on auditability and high-velocity data visualization.',
      security: 'Core focus: Zero-knowledge architecture. The dashboard visualizes redaction events without ever seeing the sensitive original data.',
      challenges: 'Designing a UI that can display high-frequency security events without overwhelming the user or sacrificing performance.'
    }
  },
  {
    id: 1,
    title: 'BenefitPulse',
    description:
      'Platform that helps citizens quickly discover relevant Greek government benefits and allowances through a guided, user-friendly experience.',
    stack: ['Vue 3', 'TypeScript', 'Node.js', 'Tailwind'],
    imageLabel: 'BenefitPulse',
    imageUrl: '/benefitpulse-preview.png',
    githubUrl: 'https://github.com/VarveroglouVasileios',
    liveUrl: 'https://benefitpulse.me/',
    breakdown: {
      architecture: 'Full stack implementation with a Node.js API serving as an aggregator for various government benefit criteria.',
      security: 'Secure data ingestion from multiple public sources and local storage encryption for user preferences.',
      challenges: 'Normalizing complex and often changing government criteria into a simplified, deterministic logic engine.'
    }
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
    description: 'Delivered front-end features and UI for web products in a fully remote engagement, working with AngularJS and Tailwind CSS alongside designers and backend engineers.',
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

export const insights: Insight[] = [
  {
    id: 1,
    title: 'Secure by Design: Shifting Left',
    category: 'Security',
    content: 'Security should not be an after-thought. By integrating security checks early in the development lifecycle (SAST/DAST), we reduce long-term risk and technical debt.',
    date: 'March 2026'
  },
  {
    id: 2,
    title: 'Vue 3 Composition API at Scale',
    category: 'Architecture',
    content: 'Using composables effectively allows for high code reuse and cleaner components. In large enterprise apps, this is key to maintaining a sane codebase.',
    date: 'February 2026'
  },
  {
    id: 3,
    title: 'The Zero-Trust Frontend',
    category: 'Cybersecurity',
    content: 'Never trust user input, even on the client side. Robust validation and sanitization are the first lines of defense against common attacks like XSS.',
    date: 'January 2026'
  }
]
