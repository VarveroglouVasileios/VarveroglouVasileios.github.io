<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Project } from '@/types/portfolio'

const { t } = useI18n()

defineProps<{
  project: Project
}>()

const imgLoaded = ref(false)
const showBreakdown = ref(false)
const panelRef = ref<HTMLElement | null>(null)

const onKeydown = (e: KeyboardEvent): void => {
  if (e.key === 'Escape') showBreakdown.value = false
}

watch(showBreakdown, async (open) => {
  if (open) {
    document.addEventListener('keydown', onKeydown)
    await nextTick()
    panelRef.value?.focus()
  } else {
    document.removeEventListener('keydown', onKeydown)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <article
    data-cursor="lg"
    class="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/40 backdrop-blur-xl transition-all duration-500 hover:border-cyan-300/40 hover:bg-slate-900/60"
  >
    <div class="relative aspect-video overflow-hidden">
      <div
        v-if="project.imageUrl && !imgLoaded"
        class="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700/40 to-slate-800 bg-[length:200%_100%] animate-shimmer"
        aria-hidden="true"
      />
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
        :class="{ 'opacity-0': !imgLoaded, 'opacity-100': imgLoaded }"
        @load="imgLoaded = true"
      />
      <div v-else class="flex h-full w-full items-center justify-center bg-slate-800">
        <span class="text-4xl">🚀</span>
      </div>
      <div
        class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"
      />
    </div>

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
      <p class="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-400">
        {{ project.description }}
      </p>

      <div class="mt-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          v-if="project.breakdown"
          type="button"
          class="clickable w-fit rounded-full border border-cyan-400/35 bg-cyan-400/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-200 transition hover:border-cyan-300/60 hover:bg-cyan-400/20"
          @click="showBreakdown = true"
        >
          {{ t('projects.breakdown.cta') }}
        </button>
        <div class="flex flex-wrap items-center gap-6">
          <a
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="clickable text-xs font-bold uppercase tracking-[0.2em] text-slate-400 transition hover:text-white"
          >
            {{ t('projects.github') }}
          </a>
          <a
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="clickable group/live flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 transition hover:text-cyan-300"
          >
            {{ t('projects.live') }}
            <span class="transition-transform group-hover/live:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="showBreakdown && project.breakdown"
        class="fixed inset-0 z-[20000] flex items-end justify-center p-4 sm:items-center sm:p-6"
        role="dialog"
        aria-modal="true"
        :aria-label="t('projects.breakdown.cta')"
      >
        <div
          class="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
          @click="showBreakdown = false"
        />
        <div
          ref="panelRef"
          tabindex="-1"
          class="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl sm:p-8"
        >
          <div class="mb-6 flex items-start justify-between gap-4">
            <h4 class="font-mono text-xs font-bold uppercase tracking-[0.2em] text-emerald-400/90">
              {{ t('projects.breakdown.title') }}
            </h4>
            <button
              type="button"
              class="clickable text-slate-500 hover:text-white"
              @click="showBreakdown = false"
            >
              {{ t('projects.breakdown.close') }}
            </button>
          </div>
          <p class="mb-2 font-mono text-[10px] uppercase tracking-widest text-cyan-500/80">
            {{ t('projects.breakdown.architecture') }}
          </p>
          <p class="mb-6 text-sm leading-relaxed text-slate-300">
            {{ project.breakdown.architecture }}
          </p>
          <p class="mb-2 font-mono text-[10px] uppercase tracking-widest text-amber-400/80">
            {{ t('projects.breakdown.security') }}
          </p>
          <p class="mb-6 text-sm leading-relaxed text-slate-300">
            {{ project.breakdown.security }}
          </p>
          <p class="mb-2 font-mono text-[10px] uppercase tracking-widest text-violet-400/80">
            {{ t('projects.breakdown.challenges') }}
          </p>
          <p class="text-sm leading-relaxed text-slate-300">
            {{ project.breakdown.challenges }}
          </p>
        </div>
      </div>
    </Teleport>
  </article>
</template>
