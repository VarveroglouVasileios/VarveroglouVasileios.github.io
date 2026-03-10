<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { socialLinks } from '@/data/portfolio'

const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer
  id="footer"
  class="border-t border-white/10 bg-slate-950/80 py-10 backdrop-blur-sm"
>
    <div class="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-4 sm:px-6">
      <div class="flex items-center gap-4">
        <RouterLink to="/" class="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          OrbitFolio
        </RouterLink>
        <span class="text-slate-600">·</span>
        <p class="text-sm text-slate-400">© {{ new Date().getFullYear() }} Vasileios Varveroglou</p>
      </div>
      <div class="flex items-center gap-3">
        <a
          v-for="social in socialLinks"
          :key="social.label"
          :href="social.url"
          target="_blank"
          rel="noreferrer"
          class="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.14em] text-slate-300 transition hover:border-cyan-300/60 hover:text-cyan-200"
        >
          {{ social.label }}
        </a>
        <button
          type="button"
          class="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.14em] text-slate-300 transition hover:border-cyan-300/60 hover:text-cyan-200"
          @click="scrollToTop"
        >
          Back to top
        </button>
      </div>
    </div>
  </footer>
</template>
