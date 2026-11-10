<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { getRoom } from '@/data/rooms'
import { nightsBetween } from '@/lib/booking'
import { useBookings } from '@/lib/store'

const { t, locale } = useI18n()
const route = useRoute()
const { find } = useBookings()

const lang = computed(() => (locale.value === 'en' ? 'en' : 'el'))
const booking = computed(() => find(String(route.params.ref)))
const room = computed(() => (booking.value ? getRoom(booking.value.roomId) : undefined))
const nights = computed(() => (booking.value ? nightsBetween(booking.value.checkIn, booking.value.checkOut) : 0))
</script>

<template>
  <div class="wrap max-w-2xl pt-10">
    <p v-if="!booking || !room" class="border border-rule bg-white p-6">
      {{ t('done.notFound') }}
      <router-link to="/" class="link">{{ t('done.home') }}</router-link>
    </p>

    <template v-else>
      <h1 class="text-4xl">{{ t('done.title') }}</h1>
      <p class="mt-4 text-ink">
        {{ t('done.ref') }}: <strong class="rounded bg-paper-dark px-2 py-1 font-mono">{{ booking.ref }}</strong>
      </p>

      <section class="mt-8 border border-dashed border-rule bg-white p-6">
        <h2 class="text-xs font-bold uppercase tracking-wide text-ink-soft">{{ t('done.emailTitle') }}</h2>
        <p class="mt-3 font-semibold">{{ t('done.subject', { ref: booking.ref }) }}</p>
        <p class="mt-3 text-sm">{{ t('done.greeting', { name: booking.name }) }}</p>
        <p class="mt-2 text-sm">
          {{ t('done.body', { checkIn: booking.checkIn, checkOut: booking.checkOut, nights, room: room.name[lang] }) }}
        </p>
        <p class="mt-2 text-sm font-semibold">{{ t('done.total', { total: booking.total }) }}</p>
      </section>
      <p class="mt-3 text-xs text-ink-soft">{{ t('done.emailNote') }}</p>

      <router-link to="/" class="btn mt-8">{{ t('done.home') }}</router-link>
    </template>
  </div>
</template>
