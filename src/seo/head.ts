import pagesData from './pages.json'
import type { Locale } from '@/lib/l10n'
import { siteUrl } from '@/data/site'

export interface PageMeta {
  title: string
  description: string
  h1: string
  summary: string
}

interface PageEntry {
  key: string
  path: string
  priority: number
  el: PageMeta
  en: PageMeta
}

const pages = pagesData.pages as PageEntry[]

export const ogImageUrl = `${siteUrl}/og-image.png`

export const getPage = (key: string): PageEntry | undefined => pages.find((p) => p.key === key)

/** Absolute URL for a page in a locale. Greek lives at the root, English under /en. */
export const pageUrl = (path: string, locale: Locale): string => {
  // GitHub Pages serves every page as a folder, so the canonical form has a trailing slash.
  const full = `${locale === 'en' ? '/en' : ''}/${path}`.replace(/\/+$/, '')
  return `${siteUrl}${full}/`
}

const setMeta = (selector: string, attr: 'name' | 'property', key: string, value: string): void => {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

const setLink = (rel: string, href: string, hreflang?: string): void => {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`
  let el = document.head.querySelector<HTMLLinkElement>(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (hreflang) el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

const SERVICE_DESC: Record<Locale, string> = {
  el: 'Ιστοσελίδες, e-shop, κρατήσεις, εσωτερικά εργαλεία και έλεγχος ασφάλειας για επιχειρήσεις.',
  en: 'Websites, e-shops, booking systems, internal tools and website security audits for businesses.',
}

/** Keep home JSON-LD Person / ProfessionalService URLs aligned with the active locale. */
const syncJsonLd = (locale: Locale): void => {
  const home = pageUrl('', locale)
  const scripts = document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')
  scripts.forEach((script) => {
    try {
      const data = JSON.parse(script.textContent || '') as Record<string, unknown>
      if (data['@type'] === 'ProfessionalService' || data['@type'] === 'Person') {
        data.url = home
        if (data['@type'] === 'ProfessionalService') {
          data.description = SERVICE_DESC[locale]
        }
        script.textContent = JSON.stringify(data)
      }
    } catch {
      // Leave malformed blocks untouched.
    }
  })
}

/** Keeps <title>, description, canonical, hreflang and Open Graph in sync on client-side navigation. */
export const applyPageHead = (key: string, locale: Locale): void => {
  const page = getPage(key)
  if (!page || typeof document === 'undefined') return

  const meta = page[locale]
  const url = pageUrl(page.path, locale)
  document.title = meta.title
  document.documentElement.lang = locale

  setMeta('meta[name="description"]', 'name', 'description', meta.description)
  setMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
  setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title)
  setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description)
  setMeta('meta[property="og:url"]', 'property', 'og:url', url)
  setMeta('meta[property="og:locale"]', 'property', 'og:locale', locale === 'el' ? 'el_GR' : 'en_US')
  setMeta(
    'meta[property="og:locale:alternate"]',
    'property',
    'og:locale:alternate',
    locale === 'el' ? 'en_US' : 'el_GR',
  )
  setMeta('meta[property="og:image"]', 'property', 'og:image', ogImageUrl)
  setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title)
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description)
  setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImageUrl)

  setLink('canonical', url)
  setLink('alternate', pageUrl(page.path, 'el'), 'el')
  setLink('alternate', pageUrl(page.path, 'en'), 'en')
  setLink('alternate', pageUrl(page.path, 'el'), 'x-default')

  syncJsonLd(locale)
}
