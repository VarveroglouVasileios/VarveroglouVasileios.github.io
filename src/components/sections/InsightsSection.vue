<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { insights } from '@/data/portfolio'

const { t } = useI18n()
</script>

<template>
  <section id="insights" class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
    <h2 class="section-title mb-12">{{ t('insights.title') }}</h2>

    <div class="grid gap-x-10 gap-y-10 md:grid-cols-3">
      <article v-for="item in insights" :key="item.id" class="border-t border-white/15 pt-6">
        <p class="mb-3 text-sm text-cyan-300">{{ item.category }}</p>
        <h3 class="mb-3 text-xl font-semibold tracking-tight text-white">{{ item.title }}</h3>
        <p class="mb-4 leading-relaxed text-slate-400">{{ item.content }}</p>
        <time class="text-sm text-slate-500">{{ item.date }}</time>
      </article>
    </div>
  </section>
</template>
