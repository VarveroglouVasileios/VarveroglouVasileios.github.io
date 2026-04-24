<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { insights } from '@/data/portfolio'

const { t } = useI18n()
</script>

<template>
  <section
    id="insights"
    class="relative mx-auto max-w-6xl px-4 py-20 sm:snap-start sm:px-6 md:py-28"
  >
    <div class="mb-12 text-center">
      <p class="mb-3 text-sm uppercase tracking-[0.22em] text-cyan-400">
        {{ t('insights.tag') }}
      </p>
      <h2 class="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
        {{ t('insights.title') }}
      </h2>
    </div>

    <div class="grid gap-5 md:grid-cols-3">
      <article
        v-for="item in insights"
        :key="item.id"
        class="group flex flex-col rounded-2xl border border-white/10 bg-slate-900/35 p-6 backdrop-blur-xl transition hover:border-cyan-400/25 hover:bg-slate-900/50"
      >
        <span
          class="mb-3 inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-cyan-300/90"
        >
          {{ item.category }}
        </span>
        <h3 class="mb-2 text-lg font-semibold text-white group-hover:text-cyan-200">
          {{ item.title }}
        </h3>
        <p class="mb-4 flex-1 text-sm leading-relaxed text-slate-400">
          {{ item.content }}
        </p>
        <time class="text-[10px] font-mono uppercase tracking-wider text-slate-400">
          {{ item.date }}
        </time>
      </article>
    </div>
  </section>
</template>
