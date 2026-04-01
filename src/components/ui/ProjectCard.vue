<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  project: {
    id: number
    title: string
    description: string
    stack: string[]
    imageUrl?: string
    githubUrl: string
    liveUrl: string
  }
}>()
</script>

<template>
  <article
    class="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/40 backdrop-blur-xl transition-all duration-500 hover:border-cyan-300/40 hover:bg-slate-900/60"
  >
    <!-- Image Wrapper with optimized loading -->
    <div class="relative aspect-video overflow-hidden">
      <img
        v-if="project.imageUrl"
        :src="project.imageUrl"
        :alt="project.title"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
        width="1920"
        height="1080"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div v-else class="flex h-full w-full items-center justify-center bg-slate-800">
        <span class="text-4xl">🚀</span>
      </div>
      <!-- Overlay Gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"
      />
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col p-6 sm:p-8">
      <div class="mb-4 flex flex-wrap gap-2">
        <span
          v-for="tech in project.stack"
          :key="tech"
          class="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400"
        >
          {{ tech }}
        </span>
      </div>

      <h3 class="mb-3 text-xl font-bold text-white sm:text-2xl">{{ project.title }}</h3>
      <p class="mb-8 line-clamp-3 text-sm leading-relaxed text-slate-400">
        {{ project.description }}
      </p>

      <!-- Links -->
      <div class="mt-auto flex items-center gap-6">
        <a
          :href="project.githubUrl"
          target="_blank"
          class="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 transition hover:text-white"
        >
          {{ t('projects.github') }}
        </a>
        <a
          :href="project.liveUrl"
          target="_blank"
          class="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 transition hover:text-cyan-300"
        >
          {{ t('projects.live') }}
          <span class="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </div>
  </article>
</template>
