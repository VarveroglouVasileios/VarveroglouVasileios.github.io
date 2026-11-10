<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import DishArt from '@/components/DishArt.vue'
import HarborArt from '@/components/HarborArt.vue'
import SearchBar from '@/components/SearchBar.vue'
import { signature } from '@/data/menu'

const { t, locale } = useI18n()
</script>

<template>
  <section class="home-hero">
    <div class="shell hero-layout">
      <div class="hero-copy">
        <p class="hero-location"><span aria-hidden="true">✦</span> {{ t('home.location') }}</p>
        <h1>{{ t('home.title') }}</h1>
        <p class="hero-intro">{{ t('home.intro') }}</p>
        <SearchBar />
      </div>
      <HarborArt />
    </div>
  </section>
  <section class="visit-band" :aria-label="t('home.info')">
    <dl class="shell visit-grid">
      <div>
        <svg aria-hidden="true" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
          <circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>
        </svg>
        <dt>{{ t('home.hoursLabel') }}</dt><dd>{{ t('home.hours') }}</dd>
      </div>
      <div>
        <svg aria-hidden="true" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
          <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2.3"/>
        </svg>
        <dt>{{ t('home.addressLabel') }}</dt><dd>{{ t('home.address') }}</dd>
      </div>
    </dl>
  </section>
  <section class="shell signatures">
    <div class="section-heading">
      <h2>{{ t('home.signature') }}</h2>
      <RouterLink class="text-link" to="/menu">{{ t('home.fullMenu') }}</RouterLink>
    </div>
    <div class="dish-grid">
      <article v-for="dish in signature" :key="dish.id" class="signature">
        <DishArt :dish="dish.id" />
        <h3>{{ dish[locale === 'en' ? 'en' : 'el'][0] }}</h3>
        <p>{{ dish[locale === 'en' ? 'en' : 'el'][1] }}</p>
      </article>
    </div>
  </section>
</template>
