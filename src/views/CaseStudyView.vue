<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import QuoteCta from '@/components/ui/QuoteCta.vue'
import ProjectStage from '@/components/showcase/ProjectStage.vue'
import { getCaseStudy } from '@/data/caseStudies'
import { projects } from '@/data/portfolio'
import { useLocalePath } from '@/composables/useLocalePath'
import { pick } from '@/lib/l10n'

const route = useRoute()
const { t, locale } = useI18n()
const { to } = useLocalePath()

const study = computed(() => getCaseStudy(String(route.params.slug)))
/** The matching project, titled like the case study, drives the interactive stage. */
const project = computed(() => {
  const match = projects.find((p) => p.id === study.value?.projectId)
  return match && study.value ? { ...match, title: study.value.title } : undefined
})
</script>

<template>
  <div v-if="study">
    <article class="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <router-link :to="to('projects')" class="text-link mb-8 inline-block text-sm font-medium text-slate-400">
        {{ t('caseStudy.back') }}
      </router-link>

      <header class="mb-10 max-w-4xl">
        <p v-if="study.kind !== 'client'" class="mb-3 text-base text-cyan-300">
          {{ study.kind === 'demo' ? t('projectsPage.demoConcept') : t('projectsPage.ownProduct') }}
        </p>
        <h1 class="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
          {{ study.title }}
        </h1>
        <p class="mt-5 text-lg leading-relaxed text-slate-300 sm:text-xl">{{ pick(study.tagline, locale) }}</p>
        <p v-if="study.kind === 'demo'" class="mt-3 text-slate-400">{{ t('caseStudy.demoNote') }}</p>
      </header>

      <ProjectStage v-if="project" :project="project" class="mb-16 max-w-5xl" />
      <img
        v-else
        :src="study.imageUrl"
        :alt="study.title"
        width="1920"
        height="1080"
        class="mb-16 w-full max-w-5xl rounded-xl border border-white/10 object-cover"
      />

      <div class="grid gap-x-16 gap-y-12 lg:grid-cols-12">
        <div class="space-y-12 lg:col-span-8">
          <section>
            <h2 class="mb-3 text-2xl font-semibold tracking-tight text-white">{{ t('caseStudy.context') }}</h2>
            <p class="max-w-prose text-lg leading-relaxed text-slate-300">{{ pick(study.context, locale) }}</p>
          </section>

          <section>
            <h2 class="mb-3 text-2xl font-semibold tracking-tight text-white">{{ t('caseStudy.problem') }}</h2>
            <p class="max-w-prose text-lg leading-relaxed text-slate-300">{{ pick(study.problem, locale) }}</p>
          </section>

          <section>
            <h2 class="mb-4 text-2xl font-semibold tracking-tight text-white">{{ t('caseStudy.solution') }}</h2>
            <ul class="max-w-prose space-y-3 text-lg leading-relaxed text-slate-300">
              <li v-for="item in pick(study.solution, locale)" :key="item" class="border-l-2 border-cyan-400/60 pl-4">
                {{ item }}
              </li>
            </ul>
          </section>

          <section>
            <h2 class="mb-4 text-2xl font-semibold tracking-tight text-white">{{ t('caseStudy.result') }}</h2>
            <ul class="max-w-prose space-y-3 text-lg leading-relaxed text-slate-300">
              <li v-for="item in pick(study.result, locale)" :key="item" class="flex gap-3">
                <svg class="mt-2 shrink-0 text-emerald-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>
                <span>{{ item }}</span>
              </li>
            </ul>
          </section>
        </div>

        <aside class="space-y-8 lg:col-span-4">
          <section class="rounded-2xl border border-cyan-300/25 bg-slate-900/70 p-6">
            <h2 class="mb-2 text-xl font-semibold text-white">{{ t('caseStudy.forYou') }}</h2>
            <p class="leading-relaxed text-slate-300">{{ pick(study.forYourBusiness, locale) }}</p>
          </section>

          <section>
            <h2 class="mb-2 font-semibold text-white">{{ t('caseStudy.stack') }}</h2>
            <p class="text-slate-400">{{ study.stack.join(', ') }}</p>
          </section>

          <a :href="study.liveUrl" target="_blank" rel="noopener noreferrer" class="btn-primary clickable">
            {{ pick(study.liveLabel, locale) }}
          </a>
        </aside>
      </div>
    </article>

    <QuoteCta :title="t('caseStudy.ctaTitle')" :text="t('caseStudy.ctaText')" source="case-study" />
  </div>
  <p v-else class="mx-auto max-w-7xl px-4 text-slate-300 sm:px-6">{{ t('caseStudy.notFound') }}</p>
</template>
