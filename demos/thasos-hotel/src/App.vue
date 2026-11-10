<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/i18n'

const { t, locale } = useI18n()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <p class="bg-ink px-5 py-1.5 text-center text-xs text-paper" role="note">{{ t('demo.banner') }}</p>

    <header class="border-b border-rule">
      <div class="wrap flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-5">
        <router-link to="/" class="font-serif text-2xl text-ink">
          Elia Bay <span class="text-base italic text-ink-soft">Θάσος</span>
        </router-link>
        <nav class="flex items-baseline gap-5 text-base" aria-label="Main">
          <router-link to="/rooms" class="hover:text-sea-600" active-class="font-medium text-sea-600">{{ t('nav.rooms') }}</router-link>
          <router-link to="/admin" class="hover:text-sea-600" active-class="font-medium text-sea-600">{{ t('nav.admin') }}</router-link>
          <span class="text-ink-soft" aria-label="Language">
            <button type="button" class="px-1" :class="locale === 'el' ? 'font-semibold text-ink' : 'hover:text-ink'" :aria-pressed="locale === 'el'" @click="setLocale('el')">ΕΛ</button>/<button type="button" class="px-1" :class="locale === 'en' ? 'font-semibold text-ink' : 'hover:text-ink'" :aria-pressed="locale === 'en'" @click="setLocale('en')">EN</button>
          </span>
        </nav>
      </div>
    </header>

    <main class="flex-1"><router-view /></main>

    <footer class="mt-20 border-t border-rule bg-paper-dark">
      <div class="wrap grid gap-8 py-10 text-base sm:grid-cols-3">
        <div>
          <p class="font-serif text-xl">Elia Bay</p>
          <p class="mt-2 text-ink-soft">{{ t('footer.address') }}</p>
        </div>
        <div>
          <p class="font-medium">{{ t('footer.reception') }}</p>
          <p class="mt-2 text-ink-soft">{{ t('footer.hours') }}</p>
        </div>
        <div class="text-sm text-ink-soft">
          <p>{{ t('demo.by') }}</p>
          <p class="mt-1">{{ t('demo.ai') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>
