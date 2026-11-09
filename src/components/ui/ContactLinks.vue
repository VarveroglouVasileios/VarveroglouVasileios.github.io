<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { contactInfo, whatsappUrl } from '@/data/site'
import { trackEvent } from '@/lib/analytics'

withDefaults(defineProps<{ source?: string }>(), { source: 'page' })

const { t } = useI18n()

const phoneHref = computed(() => `tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`)
const whatsappHref = computed(() => whatsappUrl(t('contact.whatsappMessage')))
</script>

<template>
  <ul class="flex flex-wrap gap-3">
    <li>
      <a
        :href="`mailto:${contactInfo.email}`"
        class="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-200"
        @click="trackEvent('Contact click', { method: 'email', source })"
      >
        {{ t('cta.email') }}: {{ contactInfo.email }}
      </a>
    </li>
    <li v-if="contactInfo.whatsapp">
      <a
        :href="whatsappHref"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300 transition hover:bg-emerald-400/15"
        @click="trackEvent('Contact click', { method: 'whatsapp', source })"
      >
        {{ t('cta.whatsapp') }}
      </a>
    </li>
    <li v-if="contactInfo.phone">
      <a
        :href="phoneHref"
        class="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-200"
        @click="trackEvent('Contact click', { method: 'phone', source })"
      >
        {{ t('cta.call') }}: {{ contactInfo.phone }}
      </a>
    </li>
  </ul>
</template>
