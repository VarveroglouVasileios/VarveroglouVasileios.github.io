<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/i18n'

const { t, locale } = useI18n()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a href="#content" class="skip">{{ t('nav.skip') }}</a>
    <p class="demo-banner">{{ t('demo') }}</p>
    <header class="site-header">
      <div class="shell header-inner">
        <RouterLink to="/" class="brand">
          <svg aria-hidden="true" viewBox="0 0 40 40" width="38" height="38" fill="none">
            <circle cx="20" cy="20" r="18.5" stroke="currentColor" />
            <path d="M8 18q3-4 6 0t6 0t6 0t6 0M8 24q3-4 6 0t6 0t6 0t6 0" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <span><small>Taverna</small>Meltemi</span>
        </RouterLink>
        <nav class="site-nav" :aria-label="t('nav.label')">
          <RouterLink to="/">{{ t('nav.home') }}</RouterLink>
          <RouterLink to="/menu">{{ t('nav.menu') }}</RouterLink>
          <RouterLink to="/book" class="nav-book">{{ t('nav.book') }}</RouterLink>
        </nav>
        <button class="language" type="button" :aria-label="t('nav.language')" @click="setLocale(locale === 'el' ? 'en' : 'el')">
          {{ locale === 'el' ? 'EN' : 'ΕΛ' }}
        </button>
      </div>
    </header>
    <main id="content" class="flex-1" tabindex="-1"><RouterView /></main>
    <footer class="site-footer">
      <div class="shell footer-inner">
        <span class="footer-brand">Taverna Meltemi</span>
        <p>Designed and built by Vasileios Varveroglou</p>
        <RouterLink to="/admin">{{ t('nav.admin') }}</RouterLink>
      </div>
    </footer>
  </div>
</template>
