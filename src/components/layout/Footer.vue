<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '@/composables/useLocalePath'
import { contactInfo } from '@/data/site'

const { t } = useI18n()
const { to } = useLocalePath()

const footerLinks = [
  { key: 'footer.services', route: 'services' },
  { key: 'footer.projects', route: 'projects' },
  { key: 'footer.security', route: 'security-audit' },
  { key: 'footer.about', route: 'about' },
  { key: 'footer.contact', route: 'contact' },
  { key: 'footer.privacy', route: 'privacy' },
]

const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="relative z-[5] border-t border-white/5 bg-slate-950 px-4 py-12 sm:px-6">
    <div class="mx-auto max-w-7xl">
      <div class="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div class="flex items-center gap-4">
          <router-link :to="to('home')" class="text-xl font-bold tracking-tighter text-white uppercase">
            VASILEIOS <span class="text-cyan-400">VARVEROGLOU</span>
          </router-link>
          <span class="text-slate-700">·</span>
          <p class="text-sm text-slate-400">{{ t('footer.rights') }}</p>
        </div>

        <nav class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Footer">
          <router-link
            v-for="link in footerLinks"
            :key="link.key"
            :to="to(link.route)"
            class="text-xs font-semibold tracking-wider text-slate-400 transition hover:text-white"
          >
            {{ t(link.key) }}
          </router-link>
          <a :href="`mailto:${contactInfo.email}`" class="text-xs font-semibold tracking-wider text-slate-400 transition hover:text-white">
            {{ contactInfo.email }}
          </a>
        </nav>

        <div class="flex items-center gap-8">
          <a
            href="https://github.com/varveroglouvasileios"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs font-bold tracking-[0.2em] text-slate-400 transition hover:text-white"
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/vasileios-varveroglou-769b52249"
            target="_blank"
            rel="noopener noreferrer"
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
