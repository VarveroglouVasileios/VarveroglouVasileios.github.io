<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageHeader from '@/components/ui/PageHeader.vue'
import QuoteCta from '@/components/ui/QuoteCta.vue'
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
    <PageHeader :tag="t('securityPage.tag')" :title="h1()" :lead="t('securityPage.lead')" />

    <section class="mx-auto max-w-6xl px-4 sm:px-6">
      <h2 class="mb-6 text-2xl font-bold text-white sm:text-3xl">{{ t('securityPage.whatTitle') }}</h2>
      <div class="grid gap-5 md:grid-cols-2">
        <article
          v-for="check in auditChecks"
          :key="check.title.en"
          class="rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl"
        >
          <h3 class="mb-2 text-lg font-semibold text-white">{{ pick(check.title, locale) }}</h3>
          <p class="text-sm leading-relaxed text-slate-300">{{ pick(check.description, locale) }}</p>
        </article>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <h2 class="mb-6 text-2xl font-bold text-white sm:text-3xl">{{ t('securityPage.stepsTitle') }}</h2>
      <ol class="grid gap-5 md:grid-cols-4">
        <li
          v-for="step in auditSteps"
          :key="step.title.en"
          class="rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl"
        >
          <h3 class="mb-2 text-base font-semibold text-white">{{ pick(step.title, locale) }}</h3>
          <p class="text-sm leading-relaxed text-slate-300">{{ pick(step.description, locale) }}</p>
        </li>
      </ol>
    </section>

    <section class="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 md:grid-cols-2">
      <div class="rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl md:p-8">
        <h2 class="mb-4 text-xl font-bold text-white">{{ t('securityPage.outputTitle') }}</h2>
        <ul class="space-y-2 text-slate-300">
          <li v-for="key in ['output1', 'output2', 'output3', 'output4']" :key="key" class="flex gap-2">
            <span class="text-cyan-400" aria-hidden="true">✓</span>
            <span>{{ t(`securityPage.${key}`) }}</span>
          </li>
        </ul>
        <p class="mt-6 border-t border-white/10 pt-4 text-sm font-semibold text-white">
          <template v-if="audit && audit.priceFrom !== null">{{ t('servicesPage.from') }} {{ audit.priceFrom }}€</template>
          <template v-else>{{ t('servicesPage.onRequest') }}</template>
        </p>
      </div>
      <div class="space-y-6 rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl md:p-8">
        <div>
          <h2 class="mb-2 text-xl font-bold text-white">{{ t('securityPage.forTitle') }}</h2>
          <p class="text-slate-300">{{ t('securityPage.forText') }}</p>
        </div>
        <div>
          <h2 class="mb-2 text-xl font-bold text-white">{{ t('securityPage.whyTitle') }}</h2>
          <p class="text-slate-300">{{ t('securityPage.whyText') }}</p>
        </div>
        <div>
          <h2 class="mb-2 text-xl font-bold text-white">{{ t('securityPage.scopeTitle') }}</h2>
          <p class="text-sm text-slate-400">{{ t('securityPage.scopeText') }}</p>
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
