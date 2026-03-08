<script setup lang="ts">
import type { Project, SocialLink } from '@/types'

const { card } = defineProps<{
  card: Project | SocialLink
}>()

const emit = defineEmits<{
  close: []
}>()

/** Type guard: is this a project (has description)? */
const isProject = (c: Project | SocialLink): c is Project =>
  'description' in c
</script>

<template>
  <div
    class="absolute inset-0 flex items-center justify-center p-6 pointer-events-auto"
    @click.self="emit('close')"
  >
    <!-- Backdrop -->
    <div
      class="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
      aria-hidden="true"
    />

    <!-- Glassmorphism card -->
    <div
      class="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl"
      @click.stop
    >
      <button
        class="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
        aria-label="Close"
        @click="emit('close')"
      >
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 class="mb-4 pr-10 text-2xl font-semibold text-white">
        {{ card.title }}
      </h2>

      <p v-if="isProject(card)" class="mb-6 text-slate-300">
        {{ card.description }}
      </p>

      <div v-if="isProject(card) && card.techStack?.length" class="mb-6 flex flex-wrap gap-2">
        <span
          v-for="tech in card.techStack"
          :key="tech"
          class="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300"
        >
          {{ tech }}
        </span>
      </div>

      <a
        v-if="'url' in card && card.url"
        :href="card.url"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 rounded-lg bg-cyan-500/20 px-4 py-2 text-cyan-400 transition hover:bg-cyan-500/30"
      >
        View
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  </div>
</template>
