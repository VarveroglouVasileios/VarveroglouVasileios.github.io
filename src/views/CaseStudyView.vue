<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import QuoteCta from '@/components/ui/QuoteCta.vue'
import { getCaseStudy } from '@/data/caseStudies'
import { projects } from '@/data/portfolio'
import { useLocalePath } from '@/composables/useLocalePath'
import { pick } from '@/lib/l10n'

const route = useRoute()
const { t, locale } = useI18n()
const { to } = useLocalePath()

const study = computed(() => getCaseStudy(String(route.params.slug)))
const breakdown = computed(() => projects.find((p) => p.id === study.value?.projectId)?.breakdown)
</script>

<template>
  <div v-if="study">
    <article class="mx-auto max-w-4xl px-4 sm:px-6">
      <router-link
        :to="to('projects')"
        class="mb-6 inline-block text-xs font-bold uppercase tracking-[0.2em] text-slate-400 transition hover:text-white"
      >
        ← {{ t('caseStudy.back') }}
      </router-link>

      <header class="mb-8">
        <span
          v-if="study.kind === 'own-product'"
          class="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-300"
        >
          {{ t('projectsPage.ownProduct') }}
        </span>
        <h1 class="mb-3 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">{{ study.title }}</h1>
        <p class="text-lg text-slate-300">{{ pick(study.tagline, locale) }}</p>
      </header>

      <img
        :src="study.imageUrl"
        :alt="study.title"
        width="1920"
        height="1080"
        class="mb-10 w-full rounded-3xl border border-white/10 object-cover"
      />

      <div class="space-y-10">
        <section>
          <h2 class="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">{{ t('caseStudy.context') }}</h2>
          <p class="text-slate-300">{{ pick(study.context, locale) }}</p>
        </section>

        <section>
          <h2 class="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-rose-300">{{ t('caseStudy.problem') }}</h2>
          <p class="text-slate-300">{{ pick(study.problem, locale) }}</p>
        </section>

        <section>
          <h2 class="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-amber-300">{{ t('caseStudy.solution') }}</h2>
          <ul class="space-y-2 text-slate-300">
            <li v-for="item in pick(study.solution, locale)" :key="item" class="flex gap-2">
              <span class="text-amber-300" aria-hidden="true">→</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">{{ t('caseStudy.result') }}</h2>
          <ul class="space-y-2 text-slate-300">
            <li v-for="item in pick(study.result, locale)" :key="item" class="flex gap-2">
              <span class="text-emerald-300" aria-hidden="true">✓</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </section>

        <section class="rounded-2xl border border-cyan-300/20 bg-slate-900/50 p-6">
          <h2 class="mb-2 text-lg font-bold text-white">{{ t('caseStudy.forYou') }}</h2>
          <p class="text-slate-300">{{ pick(study.forYourBusiness, locale) }}</p>
        </section>

        <section v-if="breakdown">
          <h2 class="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-violet-300">{{ t('projects.breakdown.cta') }}</h2>
          <dl class="space-y-4 text-sm text-slate-300">
            <div>
              <dt class="font-semibold text-white">{{ t('projects.breakdown.architecture') }}</dt>
              <dd>{{ breakdown.architecture }}</dd>
            </div>
            <div>
              <dt class="font-semibold text-white">{{ t('projects.breakdown.security') }}</dt>
              <dd>{{ breakdown.security }}</dd>
            </div>
            <div>
              <dt class="font-semibold text-white">{{ t('projects.breakdown.challenges') }}</dt>
              <dd>{{ breakdown.challenges }}</dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 class="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">{{ t('caseStudy.stack') }}</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in study.stack"
              :key="tech"
              class="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-300"
            >
              {{ tech }}
            </span>
          </div>
        </section>

        <div class="flex flex-wrap items-center gap-6">
          <a
            :href="study.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-full bg-cyan-400 px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-950 transition hover:bg-cyan-300"
          >
            {{ pick(study.liveLabel, locale) }} →
          </a>
        </div>
      </div>
    </article>

    <QuoteCta :title="t('caseStudy.ctaTitle')" :text="t('caseStudy.ctaText')" source="case-study" />
  </div>
  <p v-else class="mx-auto max-w-4xl px-4 text-slate-300 sm:px-6">{{ t('caseStudy.notFound') }}</p>
</template>
