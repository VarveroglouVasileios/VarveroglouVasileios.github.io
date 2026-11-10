<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { formatDate } from '@/lib/reservations'
import { useReservations } from '@/lib/store'

const route = useRoute()
const { t, locale } = useI18n()
const store = useReservations()
const booking = computed(() => store.find(String(route.params.ref)))
const date = computed(() => booking.value ? formatDate(booking.value.date, locale.value) : '')
</script>

<template>
  <div class="shell page">
    <div v-if="booking" class="confirmation">
      <p class="confirmation-mark" aria-hidden="true">{{ booking.status === 'cancelled' ? '×' : '✓' }}</p>
      <header class="page-intro">
        <h1>{{ t(booking.status === 'cancelled' ? 'confirmation.cancelled' : 'confirmation.title') }}</h1>
        <p>{{ date }} · {{ booking.time }} · {{ t('book.party') }} {{ booking.party }}</p>
      </header>
      <div class="reference">
        <span>{{ t('confirmation.reference') }}</span><strong>{{ booking.ref }}</strong>
      </div>
      <section v-if="booking.status !== 'cancelled'" class="panel message-preview">
        <h2>{{ t('confirmation.preview') }}</h2>
        <p>{{ t('confirmation.message', { ...booking, date }) }}</p>
        <p class="hint">{{ t('confirmation.previewHint') }}</p>
      </section>
    </div>
    <h1 v-else class="missing-heading">{{ t('confirmation.missing') }}</h1>
    <RouterLink class="text-link" to="/">{{ t('confirmation.back') }}</RouterLink>
  </div>
</template>
