/**
 * Central site facts. Edit here — everything else reads from this file.
 *
 * phone / whatsapp: leave empty until you want them public. They only render
 * when set. Use international format without "+" or spaces for WhatsApp
 * (e.g. "306900000000"), and a readable number for phone (e.g. "+30 690 000 0000").
 */
export const siteUrl: string = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || 'https://varveroglouvasileios.github.io'

export const contactInfo = {
  email: 'varveroglouvas@gmail.com',
  phone: '+30 694 823 6772',
  whatsapp: '306948236772',
  location: 'Kavala, Greece',
} as const

/**
 * Professional years of experience, single source of truth.
 * CV: Epsilon Informatics (Apr 2021 – Apr 2022, ~1y) + FactSet (Apr 2023 – today, ~3.5y) ≈ 4.5y.
 */
export const yearsOfExperience = 4

export const whatsappUrl = (message: string): string =>
  `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(message)}`
