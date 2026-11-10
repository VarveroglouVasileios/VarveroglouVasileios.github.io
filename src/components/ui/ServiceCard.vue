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
    class="flex h-full flex-col rounded-[2rem] border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-slate-900/60 sm:p-8"
  >
    <h3 class="mb-3 text-xl font-bold text-white sm:text-2xl">{{ pick(service.title, locale) }}</h3>
    <p class="mb-5 text-sm leading-relaxed text-slate-300">{{ pick(service.summary, locale) }}</p>

    <template v-if="detailed">
      <p class="mb-1 text-[10px] font-bold uppercase tracking-widest text-cyan-400/90">{{ t('servicesPage.idealFor') }}</p>
      <p class="mb-5 text-sm text-slate-400">{{ pick(service.idealFor, locale) }}</p>
      <p class="mb-2 text-[10px] font-bold uppercase tracking-widest text-cyan-400/90">{{ t('servicesPage.includes') }}</p>
      <ul class="mb-6 space-y-2 text-sm text-slate-300">
        <li v-for="item in pick(service.includes, locale)" :key="item" class="flex gap-2">
          <span class="text-cyan-400" aria-hidden="true">✓</span>
          <span>{{ item }}</span>
        </li>
      </ul>
    </template>

    <div class="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
      <p class="text-sm font-semibold text-white">
        <template v-if="service.priceFrom !== null">
          {{ t('servicesPage.from') }} {{ service.priceFrom }}€
        </template>
        <template v-else>{{ t('servicesPage.onRequest') }}</template>
      </p>
      <div class="flex flex-wrap items-center gap-4">
        <router-link
          v-if="service.demoSlug"
          :to="to('project', { slug: service.demoSlug })"
          class="text-xs font-bold uppercase tracking-[0.16em] text-slate-400 transition hover:text-white"
        >
          {{ t('cta.seeDemo') }}
        </router-link>
        <router-link
          v-if="service.page"
          :to="to(service.page)"
          class="text-xs font-bold uppercase tracking-[0.16em] text-slate-400 transition hover:text-white"
        >
          {{ t('cta.learnMore') }}
        </router-link>
        <router-link
          :to="quoteTo()"
          class="rounded-full border border-cyan-300/50 bg-cyan-400/15 px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cyan-200 transition hover:bg-cyan-300/25"
          @click="trackEvent('Service quote', { service: service.id })"
        >
          {{ t('cta.quote') }}
        </router-link>
      </div>
    </div>
  </article>
</template>
