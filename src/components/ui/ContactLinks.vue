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
        class="btn-outline clickable"
        @click="trackEvent('Contact click', { method: 'email', source })"
      >
        {{ contactInfo.email }}
      </a>
    </li>
    <li v-if="contactInfo.whatsapp">
      <a
        :href="whatsappHref"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-outline clickable !border-emerald-400/50 !text-emerald-300 hover:!border-emerald-300"
        @click="trackEvent('Contact click', { method: 'whatsapp', source })"
      >
        {{ t('cta.whatsapp') }}
      </a>
    </li>
    <li v-if="contactInfo.phone">
      <a
        :href="phoneHref"
        class="btn-outline clickable"
        @click="trackEvent('Contact click', { method: 'phone', source })"
      >
        {{ contactInfo.phone }}
      </a>
    </li>
  </ul>
</template>
