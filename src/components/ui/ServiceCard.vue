<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ServicePackage } from '@/data/services'
import { pick } from '@/lib/l10n'
import { useLocalePath } from '@/composables/useLocalePath'
import { trackEvent } from '@/lib/analytics'

const props = defineProps<{ service: ServicePackage; detailed?: boolean }>()

const { t, locale } = useI18n()
const { to } = useLocalePath()

const quoteTo = () => to('contact', {}, undefined, { service: props.service.id })
</script>

<template>
  <article
    :id="service.id"
    class="flex h-full scroll-mt-28 flex-col rounded-2xl border border-white/10 bg-slate-900/70 p-6 sm:p-8"
  >
    <div class="mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <h3 class="text-2xl font-semibold tracking-tight text-white">{{ pick(service.title, locale) }}</h3>
      <p class="text-base font-medium text-cyan-300">
        <template v-if="service.priceFrom !== null">{{ t('servicesPage.from') }} {{ service.priceFrom }}€</template>
        <template v-else>{{ t('servicesPage.onRequest') }}</template>
      </p>
    </div>
    <p class="mb-6 leading-relaxed text-slate-300">{{ pick(service.summary, locale) }}</p>

    <template v-if="detailed">
      <h4 class="mb-1 text-sm font-semibold text-white">{{ t('servicesPage.idealFor') }}</h4>
      <p class="mb-5 text-sm leading-relaxed text-slate-400">{{ pick(service.idealFor, locale) }}</p>
      <h4 class="mb-2 text-sm font-semibold text-white">{{ t('servicesPage.includes') }}</h4>
      <ul class="mb-7 space-y-2 text-sm text-slate-300">
        <li v-for="item in pick(service.includes, locale)" :key="item" class="flex gap-2.5">
          <svg class="mt-1 shrink-0 text-cyan-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>
          <span>{{ item }}</span>
        </li>
      </ul>
    </template>

    <div class="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-5">
      <router-link
        :to="quoteTo()"
        class="btn-outline clickable"
        @click="trackEvent('Service quote', { service: service.id })"
      >
        {{ t('cta.quote') }}
      </router-link>
      <router-link
        v-if="service.demoSlug"
        :to="to('project', { slug: service.demoSlug })"
        class="text-link clickable text-sm font-medium text-slate-300"
      >
        {{ t('cta.seeDemo') }}
      </router-link>
      <router-link
        v-if="service.page"
        :to="to(service.page)"
        class="text-link clickable text-sm font-medium text-slate-300"
      >
        {{ t('cta.learnMore') }}
      </router-link>
    </div>
  </article>
</template>
