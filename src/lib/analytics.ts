/**
 * Privacy-friendly, cookieless analytics (Plausible). Active only when
 * VITE_PLAUSIBLE_DOMAIN is set at build time, so there is no tracking by default
 * and no cookie banner is needed for it.
 */
type PlausibleFn = (event: string, options?: { props?: Record<string, string> }) => void

declare global {
  interface Window {
    plausible?: PlausibleFn
  }
}

const domain = (import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined)?.trim()

export const initAnalytics = (): void => {
  if (!domain || typeof document === 'undefined') return
  // Queue calls made before the script has loaded (first route's pageview).
  type Queued = PlausibleFn & { q?: unknown[] }
  const stub: Queued = (...args: unknown[]) => {
    ;(stub.q = stub.q || []).push(args)
  }
  window.plausible = window.plausible || (stub as unknown as PlausibleFn)
  const script = document.createElement('script')
  script.defer = true
  script.dataset.domain = domain
  script.src = 'https://plausible.io/js/script.manual.js'
  document.head.appendChild(script)
}

/** Manual script variant: we fire pageviews ourselves from the router (SPA). */
export const trackPageview = (): void => {
  window.plausible?.('pageview')
}

export const trackEvent = (event: string, props?: Record<string, string>): void => {
  window.plausible?.(event, props ? { props } : undefined)
}
