<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHeader from '@/components/ui/PageHeader.vue'
import QuoteCta from '@/components/ui/QuoteCta.vue'
import { getPage } from '@/seo/head'

const AboutSection = defineAsyncComponent(() => import('@/components/sections/AboutSection.vue'))
const ExperienceSection = defineAsyncComponent(() => import('@/components/sections/ExperienceSection.vue'))

const { t, locale } = useI18n()
const h1 = () => getPage('about')?.[locale.value === 'en' ? 'en' : 'el'].h1 ?? ''
</script>

<template>
  <div>
    <PageHeader :title="h1()" />
    <AboutSection hide-heading />

    <section class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div class="grid gap-12 md:grid-cols-2">
        <div class="border-t border-white/15 pt-6">
          <h2 class="mb-3 text-2xl font-semibold tracking-tight text-white">{{ t('aboutPage.localTitle') }}</h2>
          <p class="leading-relaxed text-slate-300">{{ t('aboutPage.localText') }}</p>
        </div>
        <div class="border-t border-white/15 pt-6">
          <h2 class="mb-3 text-2xl font-semibold tracking-tight text-white">{{ t('aboutPage.whyTitle') }}</h2>
          <ul class="space-y-3 text-slate-300">
            <li v-for="key in ['why1', 'why2', 'why3']" :key="key" class="flex gap-2.5">
              <svg class="mt-1.5 shrink-0 text-cyan-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>
              <span>{{ t(`aboutPage.${key}`) }}</span>
            </li>
          </ul>
          <a
            href="/VasileiosVarveroglouCV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="VasileiosVarveroglouCV.pdf"
            class="btn-outline clickable mt-6"
          >
            {{ t('aboutPage.cv') }}
          </a>
        </div>
      </div>
    </section>

    <ExperienceSection />
    <QuoteCta :title="t('servicesPage.ctaTitle')" :text="t('servicesPage.ctaText')" source="about" />
  </div>
</template>
