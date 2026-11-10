<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/i18n'

const { t, locale } = useI18n()
const toggle = (): void => setLocale(locale.value === 'el' ? 'en' : 'el')
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div class="bg-slate-900 px-4 py-2 text-center text-xs text-slate-100" role="note">
      {{ t('demo.banner') }}
    </div>

    <header class="border-b border-sand-200 bg-sand-50/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <router-link to="/" class="font-serif text-xl font-bold text-olive-800">{{ t('brand') }}</router-link>
        <nav class="flex items-center gap-5 text-sm font-medium" aria-label="Main">
          <router-link to="/" class="hover:text-sea-600">{{ t('nav.home') }}</router-link>
          <router-link to="/rooms" class="hover:text-sea-600">{{ t('nav.rooms') }}</router-link>
          <router-link to="/admin" class="hover:text-sea-600">{{ t('nav.admin') }}</router-link>
          <button type="button" class="rounded-full border border-slate-300 px-3 py-1 text-xs font-bold" @click="toggle">
            {{ locale === 'el' ? 'EN' : 'ΕΛ' }}
          </button>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <router-view />
    </main>

    <footer class="border-t border-sand-200 bg-sand-100 px-4 py-8 text-center text-sm text-slate-600">
      <p>{{ t('footer.rights') }}</p>
      <p class="mt-1">{{ t('demo.by') }}</p>
    </footer>
  </div>
</template>
