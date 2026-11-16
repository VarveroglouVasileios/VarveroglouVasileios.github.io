<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageHeader from '@/components/ui/PageHeader.vue'
import QuoteCta from '@/components/ui/QuoteCta.vue'
import StepList from '@/components/ui/StepList.vue'
import { auditChecks, auditSteps } from '@/data/securityAudit'
import { services } from '@/data/services'
import { getPage } from '@/seo/head'
import { pick } from '@/lib/l10n'

const { t, locale } = useI18n()
const h1 = () => getPage('security-audit')?.[locale.value === 'en' ? 'en' : 'el'].h1 ?? ''
const audit = services.find((s) => s.id === 'security')
</script>

<template>
  <div>
    <PageHeader :title="h1()" :lead="t('securityPage.lead')" />

    <section class="mx-auto max-w-7xl px-4 sm:px-6">
      <h2 class="section-title mb-10">{{ t('securityPage.whatTitle') }}</h2>
      <div class="grid gap-x-12 md:grid-cols-2">
        <article v-for="check in auditChecks" :key="check.title.en" class="border-t border-white/15 py-6">
          <h3 class="mb-2 text-xl font-semibold tracking-tight text-white">{{ pick(check.title, locale) }}</h3>
          <p class="leading-relaxed text-slate-400">{{ pick(check.description, locale) }}</p>
        </article>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
      <h2 class="section-title mb-10">{{ t('securityPage.stepsTitle') }}</h2>
      <StepList :steps="auditSteps" />
    </section>

    <section class="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12">
      <div class="rounded-2xl border border-white/10 bg-slate-900/70 p-6 sm:p-8 lg:col-span-5">
        <h2 class="mb-5 text-2xl font-semibold tracking-tight text-white">{{ t('securityPage.outputTitle') }}</h2>
        <ul class="space-y-3 text-slate-300">
          <li v-for="key in ['output1', 'output2', 'output3', 'output4']" :key="key" class="flex gap-2.5">
            <svg class="mt-1.5 shrink-0 text-cyan-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>
            <span>{{ t(`securityPage.${key}`) }}</span>
          </li>
        </ul>
        <p class="mt-6 border-t border-white/10 pt-5 text-lg font-semibold text-cyan-300">
          <template v-if="audit && audit.priceFrom !== null">{{ t('servicesPage.from') }} {{ audit.priceFrom }}€</template>
          <template v-else>{{ t('servicesPage.onRequest') }}</template>
        </p>
      </div>
      <div class="space-y-8 lg:col-span-7">
        <div>
          <h2 class="mb-2 text-2xl font-semibold tracking-tight text-white">{{ t('securityPage.forTitle') }}</h2>
          <p class="max-w-prose leading-relaxed text-slate-300">{{ t('securityPage.forText') }}</p>
        </div>
        <div>
          <h2 class="mb-2 text-2xl font-semibold tracking-tight text-white">{{ t('securityPage.whyTitle') }}</h2>
          <p class="max-w-prose leading-relaxed text-slate-300">{{ t('securityPage.whyText') }}</p>
        </div>
        <div>
          <h2 class="mb-2 text-2xl font-semibold tracking-tight text-white">{{ t('securityPage.scopeTitle') }}</h2>
          <p class="max-w-prose leading-relaxed text-slate-400">{{ t('securityPage.scopeText') }}</p>
        </div>
      </div>
    </section>

    <QuoteCta
      :title="t('securityPage.ctaTitle')"
      :text="t('securityPage.ctaText')"
      service="security"
      source="security-audit"
    />
  </div>
</template>
