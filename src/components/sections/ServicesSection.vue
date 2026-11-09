<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ServiceCard from '@/components/ui/ServiceCard.vue'
import { services } from '@/data/services'
import { useLocalePath } from '@/composables/useLocalePath'

const { t } = useI18n()
const { to } = useLocalePath()
</script>

<template>
  <section id="services" class="relative mx-auto w-full max-w-6xl px-4 py-20 sm:snap-start sm:px-6 md:py-28">
    <div class="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="mb-3 text-sm uppercase tracking-[0.18em] text-cyan-300">{{ t('servicesPage.teaserTag') }}</p>
        <h2 class="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">{{ t('servicesPage.teaserTitle') }}</h2>
      </div>
      <router-link
        :to="to('services')"
        class="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 transition hover:text-cyan-300"
      >
        {{ t('cta.allServices') }} →
      </router-link>
    </div>

    <div class="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
      <ServiceCard v-for="service in services" :key="service.id" :service="service" />
    </div>
  </section>
</template>
