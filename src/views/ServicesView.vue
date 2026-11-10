<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageHeader from '@/components/ui/PageHeader.vue'
import ServiceCard from '@/components/ui/ServiceCard.vue'
import QuoteCta from '@/components/ui/QuoteCta.vue'
import { services } from '@/data/services'
import { serviceSteps } from '@/data/securityAudit'
import { getPage } from '@/seo/head'
import { faqs } from '@/data/faq'
import { pick } from '@/lib/l10n'

const { t, locale } = useI18n()
const h1 = () => getPage('services')?.[locale.value === 'en' ? 'en' : 'el'].h1 ?? ''
</script>

<template>
  <div>
    <PageHeader :tag="t('servicesPage.tag')" :title="h1()" :lead="t('servicesPage.lead')" />

    <section class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="grid auto-rows-fr gap-5 md:grid-cols-2">
        <ServiceCard v-for="service in services" :key="service.id" :service="service" detailed />
      </div>
      <p class="mt-6 text-xs text-slate-400">{{ t('servicesPage.priceNote') }}</p>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <h2 class="mb-8 text-2xl font-bold text-white sm:text-3xl">{{ t('servicesPage.processTitle') }}</h2>
      <ol class="grid gap-5 md:grid-cols-4">
        <li
          v-for="step in serviceSteps"
          :key="step.title.en"
          class="rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl"
        >
          <h3 class="mb-2 text-base font-semibold text-white">{{ pick(step.title, locale) }}</h3>
          <p class="text-sm leading-relaxed text-slate-300">{{ pick(step.description, locale) }}</p>
        </li>
      </ol>
    </section>

    <section class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl md:p-8">
        <h2 class="mb-2 text-xl font-bold text-white">{{ t('servicesPage.localTitle') }}</h2>
        <p class="text-slate-300">{{ t('servicesPage.localText') }}</p>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
      <h2 class="mb-6 text-2xl font-bold text-white sm:text-3xl">{{ t('servicesPage.faqTitle') }}</h2>
      <div class="space-y-3">
        <details
          v-for="item in faqs"
          :key="item.q.en"
          class="rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-xl"
        >
          <summary class="cursor-pointer font-semibold text-white">{{ pick(item.q, locale) }}</summary>
          <p class="mt-3 text-sm leading-relaxed text-slate-300">{{ pick(item.a, locale) }}</p>
        </details>
      </div>
    </section>

    <QuoteCta :title="t('servicesPage.ctaTitle')" :text="t('servicesPage.ctaText')" source="services" />
  </div>
</template>
