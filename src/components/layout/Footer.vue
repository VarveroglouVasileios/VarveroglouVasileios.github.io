<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '@/composables/useLocalePath'
import { contactInfo } from '@/data/site'
import { scrollBehavior } from '@/lib/scrollBehavior'

const { t } = useI18n()
const { to } = useLocalePath()

const footerLinks = [
  { key: 'footer.services', route: 'services' },
  { key: 'footer.projects', route: 'projects' },
  { key: 'footer.security', route: 'security-audit' },
  { key: 'footer.about', route: 'about' },
  { key: 'footer.contact', route: 'contact' },
  { key: 'footer.privacy', route: 'privacy' },
  { key: 'footer.accessibility', route: 'accessibility' },
]

const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: scrollBehavior() })
}
</script>

<template>
  <footer class="relative z-[5] border-t border-white/5 bg-slate-950 px-4 py-12 sm:px-6">
    <div class="mx-auto max-w-7xl">
      <div class="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div class="flex items-center gap-4">
          <router-link :to="to('home')" class="whitespace-nowrap text-lg font-semibold tracking-tight text-white">
            Vasileios Varveroglou
          </router-link>
          <span class="text-slate-700">·</span>
          <p class="text-sm text-slate-400">{{ t('footer.rights') }}</p>
        </div>

        <nav class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Footer">
          <router-link
            v-for="link in footerLinks"
            :key="link.key"
            :to="to(link.route)"
            class="text-sm text-slate-400 transition hover:text-white"
          >
            {{ t(link.key) }}
          </router-link>
          <a :href="`mailto:${contactInfo.email}`" class="text-sm text-slate-400 transition hover:text-white">
            {{ contactInfo.email }}
          </a>
        </nav>

        <div class="flex items-center gap-8">
          <a
            href="https://github.com/varveroglouvasileios"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-slate-400 transition hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/vasileios-varveroglou-769b52249"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-slate-400 transition hover:text-white"
          >
            LinkedIn
          </a>
          <button
            type="button"
            @click="scrollToTop"
            class="text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
          >
            {{ t('footer.backToTop') }}
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>
