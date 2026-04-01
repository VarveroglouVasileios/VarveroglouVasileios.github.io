<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="relative z-[5] border-t border-white/5 bg-slate-950 px-4 py-12 sm:px-6">
    <div class="mx-auto max-w-7xl">
      <div class="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div class="flex items-center gap-4">
          <router-link to="/" class="text-xl font-bold tracking-tighter text-white uppercase">
            VASILEIOS <span class="text-cyan-400">VARVEROGLOU</span>
          </router-link>
          <span class="text-slate-700">·</span>
          <p class="text-sm text-slate-400">{{ t('footer.rights') }}</p>
        </div>

        <div class="flex items-center gap-8">
          <a
            href="https://github.com/varveroglouvasileios"
            target="_blank"
            class="text-xs font-bold tracking-[0.2em] text-slate-400 transition hover:text-white"
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/vasileios-varveroglou-769b52249"
            target="_blank"
            class="text-xs font-bold tracking-[0.2em] text-slate-400 transition hover:text-white"
          >
            LINKEDIN
          </a>
          <button
            type="button"
            @click="scrollToTop"
            class="group flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-cyan-400"
          >
            {{ t('footer.backToTop') }}
            <span class="transition-transform group-hover:-translate-y-1">↑</span>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>
