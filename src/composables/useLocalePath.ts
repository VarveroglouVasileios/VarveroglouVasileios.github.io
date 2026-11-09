import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { RouteLocationRaw } from 'vue-router'

/** Builds locale-aware router locations: Greek at `/…`, English at `/en/…`. */
export const useLocalePath = () => {
  const { locale } = useI18n()
  const localeParam = computed(() => (locale.value === 'en' ? 'en' : undefined))

  const to = (
    name: string,
    params: Record<string, string> = {},
    hash?: string,
    query?: Record<string, string>,
  ): RouteLocationRaw => ({
    name,
    params: { locale: localeParam.value, ...params },
    ...(hash ? { hash } : {}),
    ...(query ? { query } : {}),
  })

  return { to, localeParam }
}
