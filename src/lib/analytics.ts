/**
 * Analytics.
 *
 * - Plausible: privacy-friendly and cookieless. Active only when VITE_PLAUSIBLE_DOMAIN is set.
 * - Google Analytics 4 (also what Google Ads reads for conversions): active only when VITE_GA_ID is
 *   set. It runs in Consent Mode v2 with every storage type denied by default; cookies and
 *   identifiers are enabled only after the visitor accepts the consent banner.
 */
type PlausibleFn = (event: string, options?: { props?: Record<string, string> }) => void
type GtagFn = (...args: unknown[]) => void

declare global {
  interface Window {
    plausible?: PlausibleFn
    dataLayer?: unknown[]
    gtag?: GtagFn
  }
}

export type ConsentChoice = 'granted' | 'denied'

const CONSENT_KEY = 'consent.analytics.v1'
const plausibleDomain = (import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined)?.trim()
const gaId = (import.meta.env.VITE_GA_ID as string | undefined)?.trim()

/** True when a Google tag is configured, so the consent banner has something to ask about. */
export const gaEnabled = Boolean(gaId)

export const getStoredConsent = (): ConsentChoice | null => {
  try {
    const value = localStorage.getItem(CONSENT_KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    return null
  }
}

const applyConsent = (choice: ConsentChoice): void => {
  window.gtag?.('consent', 'update', {
    analytics_storage: choice,
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
  })
}

/** Saves the visitor's choice and forwards it to Google. Pass null to forget it (re-opens the banner). */
export const setConsent = (choice: ConsentChoice | null): void => {
  try {
    if (choice) localStorage.setItem(CONSENT_KEY, choice)
    else localStorage.removeItem(CONSENT_KEY)
  } catch {
    // Storage blocked: the choice only lasts for this page view.
  }
  if (choice) applyConsent(choice)
}

const initPlausible = (): void => {
  if (!plausibleDomain) return
  // Queue calls made before the script has loaded (first route's pageview).
  type Queued = PlausibleFn & { q?: unknown[] }
  const stub: Queued = (...args: unknown[]) => {
    ;(stub.q = stub.q || []).push(args)
  }
  window.plausible = window.plausible || (stub as unknown as PlausibleFn)
  const script = document.createElement('script')
  script.defer = true
  script.dataset.domain = plausibleDomain
  script.src = 'https://plausible.io/js/script.manual.js'
  document.head.appendChild(script)
}

const initGoogleAnalytics = (): void => {
  if (!gaId) return
  window.dataLayer = window.dataLayer || []
  // gtag must push the `arguments` object itself, not an array.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  // Consent defaults must be set before the tag is configured.
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  })
  const stored = getStoredConsent()
  if (stored) applyConsent(stored)
  window.gtag('js', new Date())
  // Pageviews are sent from the router (SPA), so the automatic one is off.
  window.gtag('config', gaId, { send_page_view: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
  document.head.appendChild(script)
}

export const initAnalytics = (): void => {
  if (typeof document === 'undefined') return
  initPlausible()
  initGoogleAnalytics()
}

/** Manual pageviews: fired from the router after every navigation (SPA). */
export const trackPageview = (): void => {
  window.plausible?.('pageview')
  window.gtag?.('event', 'page_view', {
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
  })
}

const gaEventName = (event: string): string => event.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_')

export const trackEvent = (event: string, props?: Record<string, string>): void => {
  window.plausible?.(event, props ? { props } : undefined)
  window.gtag?.('event', gaEventName(event), props)
}
