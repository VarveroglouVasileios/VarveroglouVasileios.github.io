/**
 * Post-build step: writes one static HTML file per page and language so that
 * crawlers (and link previews) get the right <title>, description, canonical,
 * hreflang and a text summary without executing JavaScript.
 * The app still mounts on top of this markup as a normal SPA.
 *
 * Also generates sitemap.xml with hreflang alternates.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const DEFAULT_URL = 'https://varveroglouvasileios.github.io'
const siteUrl = (process.env.VITE_SITE_URL || DEFAULT_URL).replace(/\/$/, '')

const { pages } = JSON.parse(await readFile(join(root, 'src/seo/pages.json'), 'utf8'))
const template = (await readFile(join(dist, 'index.html'), 'utf8')).replaceAll(DEFAULT_URL, siteUrl)

const esc = (v) => v.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const urlFor = (path, locale) => {
  const full = `${locale === 'en' ? '/en' : ''}/${path}`.replace(/\/+$/, '')
  return `${siteUrl}${full}/`
}
const replaceTag = (html, regex, replacement) => {
  if (!regex.test(html)) throw new Error(`prerender: template is missing ${regex}`)
  return html.replace(regex, replacement)
}

const navLabels = {
  el: { home: 'Αρχική', services: 'Υπηρεσίες', projects: 'Έργα', 'security-audit': 'Έλεγχος ασφάλειας', about: 'Σχετικά', contact: 'Επικοινωνία' },
  en: { home: 'Home', services: 'Services', projects: 'Projects', 'security-audit': 'Security audit', about: 'About', contact: 'Contact' },
}

const render = (page, locale) => {
  const meta = page[locale]
  const url = urlFor(page.path, locale)
  let html = template

  html = html.replace(/<html lang="[^"]*"/, `<html lang="${locale}"`)
  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
  html = replaceTag(html, /<meta name="description" content="[^"]*" ?\/?>/, `<meta name="description" content="${esc(meta.description)}" />`)
  html = replaceTag(html, /<link rel="canonical" href="[^"]*" ?\/?>/, `<link rel="canonical" href="${url}" />`)
  html = html.replace(/<meta property="og:url" content="[^"]*" ?\/?>/, `<meta property="og:url" content="${url}" />`)
  html = html.replace(/<meta property="og:title" content="[^"]*" ?\/?>/, `<meta property="og:title" content="${esc(meta.title)}" />`)
  html = html.replace(/<meta property="og:description" content="[^"]*" ?\/?>/, `<meta property="og:description" content="${esc(meta.description)}" />`)
  html = html.replace(/<meta property="og:locale" content="[^"]*" ?\/?>/, `<meta property="og:locale" content="${locale === 'el' ? 'el_GR' : 'en_US'}" />`)
  html = html.replace(/<meta name="twitter:title" content="[^"]*" ?\/?>/, `<meta name="twitter:title" content="${esc(meta.title)}" />`)
  html = html.replace(/<meta name="twitter:description" content="[^"]*" ?\/?>/, `<meta name="twitter:description" content="${esc(meta.description)}" />`)

  const alternates = [
    `<link rel="alternate" hreflang="el" href="${urlFor(page.path, 'el')}" />`,
    `<link rel="alternate" hreflang="en" href="${urlFor(page.path, 'en')}" />`,
    `<link rel="alternate" hreflang="x-default" href="${urlFor(page.path, 'el')}" />`,
  ].join('\n  ')
  html = html.replace('</head>', `  ${alternates}\n</head>`)

  const links = ['home', 'services', 'projects', 'security-audit', 'about', 'contact']
    .map((key) => {
      const target = pages.find((p) => p.key === key)
      return `<a href="${urlFor(target.path, locale)}" style="color:#67e8f9;margin-right:16px">${esc(navLabels[locale][key])}</a>`
    })
    .join('')

  // Replaced by the Vue app on mount; visible to crawlers and no-JS clients.
  const fallback = `<main style="max-width:48rem;margin:0 auto;padding:6rem 1.5rem;font-family:system-ui,sans-serif;color:#e2e8f0"><h1 style="font-size:2rem;line-height:1.2;color:#fff">${esc(meta.h1)}</h1><p style="margin-top:1rem;font-size:1.1rem;color:#cbd5e1">${esc(meta.summary)}</p><nav style="margin-top:1.5rem">${links}</nav></main>`
  return replaceTag(html, /<div id="app"><\/div>/, `<div id="app">${fallback}</div>`)
}

const written = []
for (const page of pages) {
  for (const locale of ['el', 'en']) {
    const segments = [locale === 'en' ? 'en' : '', page.path].filter(Boolean)
    const dir = join(dist, ...segments)
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, 'index.html'), render(page, locale))
    written.push(urlFor(page.path, locale))
  }
}

const today = new Date().toISOString().slice(0, 10)
const entries = pages
  .flatMap((page) =>
    ['el', 'en'].map((locale) => {
      const alt = [
        `    <xhtml:link rel="alternate" hreflang="el" href="${urlFor(page.path, 'el')}" />`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${urlFor(page.path, 'en')}" />`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(page.path, 'el')}" />`,
      ].join('\n')
      return `  <url>\n    <loc>${urlFor(page.path, locale)}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${page.priority.toFixed(1)}</priority>\n${alt}\n  </url>`
    }),
  )
  .join('\n')

await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>\n`,
)
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /demos/\nSitemap: ${siteUrl}/sitemap.xml\n`)

console.log(`prerender: wrote ${written.length} pages + sitemap.xml for ${siteUrl}`)
