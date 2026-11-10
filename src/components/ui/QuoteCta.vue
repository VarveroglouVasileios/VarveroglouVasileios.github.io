<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ContactLinks from '@/components/ui/ContactLinks.vue'
import { useLocalePath } from '@/composables/useLocalePath'
import { trackEvent } from '@/lib/analytics'

const props = defineProps<{
  title: string
  text: string
  /** Pre-selects the service in the contact form. */
  service?: string
  source: string
}>()

const { t } = useI18n()
const { to } = useLocalePath()

const quoteTo = () => to('contact', {}, undefined, props.service ? { service: props.service } : undefined)
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
    <div class="rounded-[2rem] border border-cyan-300/20 bg-slate-900/50 p-8 backdrop-blur-xl md:p-12">
      <h2 class="mb-3 text-2xl font-bold text-white sm:text-3xl">{{ title }}</h2>
      <p class="mb-8 max-w-2xl text-slate-300">{{ text }}</p>
      <div class="flex flex-wrap items-center gap-4">
        <router-link
          :to="quoteTo()"
          class="rounded-full bg-cyan-400 px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-950 transition hover:bg-cyan-300 sm:text-sm"
          @click="trackEvent('Quote CTA', { source })"
        >
          {{ t('cta.quote') }}
        </router-link>
      </div>
      <div class="mt-6">
        <ContactLinks :source="source" />
      </div>
    </div>
  </section>
</template>
