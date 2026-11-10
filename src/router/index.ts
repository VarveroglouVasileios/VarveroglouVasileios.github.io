import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '@/i18n'
import { applyPageHead } from '@/seo/head'
import { trackPageview } from '@/lib/analytics'
import type { Locale } from '@/lib/l10n'

/**
 * Greek is the default language and lives at the root (`/services`).
 * English lives under `/en` (`/en/services`). The optional `locale` param encodes that.
 */
const L = '/:locale(en)?'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: L, name: 'home', component: () => import('@/views/HomeView.vue'), meta: { page: 'home' } },
    { path: `${L}/about`, name: 'about', component: () => import('@/views/AboutView.vue'), meta: { page: 'about' } },
    { path: `${L}/services`, name: 'services', component: () => import('@/views/ServicesView.vue'), meta: { page: 'services' } },
    {
      path: `${L}/security-audit`,
      name: 'security-audit',
      component: () => import('@/views/SecurityAuditView.vue'),
      meta: { page: 'security-audit' },
    },
    { path: `${L}/projects`, name: 'projects', component: () => import('@/views/ProjectsView.vue'), meta: { page: 'projects' } },
    {
      path: `${L}/projects/:slug`,
      name: 'project',
      component: () => import('@/views/CaseStudyView.vue'),
    },
    { path: `${L}/privacy`, name: 'privacy', component: () => import('@/views/PrivacyView.vue'), meta: { page: 'privacy' } },
    { path: `${L}/contact`, name: 'contact', component: () => import('@/views/ContactView.vue'), meta: { page: 'contact' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  async scrollBehavior(to) {
    const navOffset = window.innerWidth < 640 ? 180 : 140

    if (to.hash) {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 60)
      })

      return {
        el: to.hash,
        top: navOffset,
        behavior: 'smooth',
      }
    }

    return { top: 0, left: 0 }
  },
})

const localeOf = (params: Record<string, unknown>): Locale => (params.locale === 'en' ? 'en' : 'el')

router.beforeEach((to) => {
  i18n.global.locale.value = localeOf(to.params)
})

router.afterEach((to) => {
  const locale = localeOf(to.params)
  const key = to.name === 'project' ? `project-${String(to.params.slug)}` : (to.meta.page as string | undefined)
  if (key) applyPageHead(key, locale)
  trackPageview()
})

export default router
