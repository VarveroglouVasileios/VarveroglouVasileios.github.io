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

/** Keeps <title>, description, canonical, hreflang and Open Graph in sync on client-side navigation. */
export const applyPageHead = (key: string, locale: Locale): void => {
  const page = getPage(key)
  if (!page || typeof document === 'undefined') return

  const meta = page[locale]
  document.title = meta.title
  document.documentElement.lang = locale

  setMeta('meta[name="description"]', 'name', 'description', meta.description)
  setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title)
  setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description)
  setMeta('meta[property="og:url"]', 'property', 'og:url', pageUrl(page.path, locale))
  setMeta('meta[property="og:locale"]', 'property', 'og:locale', locale === 'el' ? 'el_GR' : 'en_US')
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title)
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description)

  setLink('canonical', pageUrl(page.path, locale))
  setLink('alternate', pageUrl(page.path, 'el'), 'el')
  setLink('alternate', pageUrl(page.path, 'en'), 'en')
  setLink('alternate', pageUrl(page.path, 'el'), 'x-default')
}
