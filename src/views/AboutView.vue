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
    <PageHeader :tag="t('aboutPage.tag')" :title="h1()" />
    <AboutSection hide-heading />

    <section class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div class="grid gap-5 md:grid-cols-2">
        <div class="rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl md:p-8">
          <h2 class="mb-3 text-xl font-bold text-white">{{ t('aboutPage.localTitle') }}</h2>
          <p class="text-slate-300">{{ t('aboutPage.localText') }}</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl md:p-8">
          <h2 class="mb-3 text-xl font-bold text-white">{{ t('aboutPage.whyTitle') }}</h2>
          <ul class="space-y-2 text-slate-300">
            <li v-for="key in ['why1', 'why2', 'why3']" :key="key" class="flex gap-2">
              <span class="text-cyan-400" aria-hidden="true">✓</span>
              <span>{{ t(`aboutPage.${key}`) }}</span>
            </li>
          </ul>
          <a
            href="/VasileiosVarveroglouCV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="VasileiosVarveroglouCV.pdf"
            class="mt-6 inline-block text-xs font-bold uppercase tracking-[0.18em] text-emerald-300 transition hover:text-emerald-200"
          >
            {{ t('aboutPage.cv') }} →
          </a>
        </div>
      </div>
    </section>

    <ExperienceSection />
    <QuoteCta :title="t('servicesPage.ctaTitle')" :text="t('servicesPage.ctaText')" source="about" />
  </div>
</template>
