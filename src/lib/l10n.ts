export type Locale = 'el' | 'en'

/** Bilingual text used by structured content (services, case studies). */
export interface L10n {
  el: string
  en: string
}

export interface L10nList {
  el: string[]
  en: string[]
}

export const pick = <T extends L10n | L10nList>(value: T, locale: string): T[Locale] =>
  value[locale === 'en' ? 'en' : 'el'] as T[Locale]
