<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageHeader from '@/components/ui/PageHeader.vue'
import ServiceCard from '@/components/ui/ServiceCard.vue'
import QuoteCta from '@/components/ui/QuoteCta.vue'
import StepList from '@/components/ui/StepList.vue'
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
    <PageHeader :title="h1()" :lead="t('servicesPage.lead')" />

    <section class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="grid auto-rows-fr gap-5 md:grid-cols-2">
        <ServiceCard v-for="service in services" :key="service.id" :service="service" detailed />
      </div>
      <p class="mt-6 text-sm text-slate-400">{{ t('servicesPage.priceNote') }}</p>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
      <h2 class="section-title mb-10">{{ t('servicesPage.processTitle') }}</h2>
      <StepList :steps="serviceSteps" />
    </section>

    <section class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="max-w-3xl border-l-2 border-cyan-400 pl-6">
        <h2 class="mb-3 text-2xl font-semibold tracking-tight text-white">{{ t('servicesPage.localTitle') }}</h2>
        <p class="text-lg leading-relaxed text-slate-300">{{ t('servicesPage.localText') }}</p>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 pt-20 sm:px-6 md:pt-28">
      <h2 class="section-title mb-8">{{ t('servicesPage.faqTitle') }}</h2>
      <div class="max-w-3xl border-b border-white/10">
        <details v-for="item in faqs" :key="item.q.en" class="faq border-t border-white/10">
          <summary class="clickable flex cursor-pointer items-center justify-between gap-6 py-5 text-lg font-medium text-white">
            {{ pick(item.q, locale) }}
            <span class="faq__mark" aria-hidden="true" />
          </summary>
          <p class="pb-6 leading-relaxed text-slate-300">{{ pick(item.a, locale) }}</p>
        </details>
      </div>
    </section>

    <QuoteCta :title="t('servicesPage.ctaTitle')" :text="t('servicesPage.ctaText')" source="services" />
  </div>
</template>

<style scoped>
.faq summary {
  list-style: none;
}

.faq summary::-webkit-details-marker {
  display: none;
}

/* Plus that turns into a minus when the answer is open */
.faq__mark {
  position: relative;
  width: 0.875rem;
  height: 0.875rem;
  flex-shrink: 0;
}

.faq__mark::before,
.faq__mark::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 2px;
  margin-top: -1px;
  background: #67e8f9;
  transition: transform 0.25s ease;
}

.faq__mark::after {
  transform: rotate(90deg);
}

.faq[open] .faq__mark::after {
  transform: rotate(0deg);
}
</style>
