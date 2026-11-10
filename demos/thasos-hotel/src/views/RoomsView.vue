<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import RoomCard from '@/components/RoomCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import { rooms } from '@/data/rooms'
import { nightsBetween, totalPrice, unitsLeft, validateStay } from '@/lib/booking'
import { useBookings } from '@/lib/store'
import type { Stay } from '@/lib/types'

const { t } = useI18n()
const route = useRoute()
const { bookings } = useBookings()

const stay = computed<Stay>(() => ({
  checkIn: String(route.query.in ?? ''),
  checkOut: String(route.query.out ?? ''),
  guests: Number(route.query.g ?? 2),
}))
const searched = computed(() => validateStay(stay.value) === null)

const results = computed(() =>
  rooms.map((room) => {
    if (!searched.value) return { room }
    const { checkIn, checkOut, guests } = stay.value
    const left = unitsLeft(room, bookings.value, checkIn, checkOut)
    const fits = room.capacity >= guests && left > 0
    return {
      room,
      fits,
      left,
      nights: nightsBetween(checkIn, checkOut),
      total: totalPrice(room, checkIn, checkOut),
    }
  }),
)

const visible = computed(() => (searched.value ? results.value.filter((r) => r.fits) : results.value))
const nights = computed(() => (searched.value ? nightsBetween(stay.value.checkIn, stay.value.checkOut) : 0))
</script>

<template>
  <div class="wrap pt-10">
    <h1 class="mb-6 text-4xl">{{ t('rooms.title') }}</h1>
    <SearchBar :key="route.fullPath" :check-in="route.query.in as string" :check-out="route.query.out as string" :guests="Number(route.query.g) || 2" />
    <p class="mt-3 text-sm text-ink-soft">{{ t('rooms.peakNote') }}</p>

    <p v-if="searched" class="mt-10 border-b border-rule pb-3 font-serif text-xl">
      {{ t('rooms.resultsFor', { nights, guests: stay.guests }) }}
    </p>

    <p v-if="searched && visible.length === 0" class="mt-8 border border-rule bg-white p-6" role="status">
      {{ t('rooms.none') }}
    </p>

    <div class="mt-10 space-y-14 md:space-y-20">
      <RoomCard
        v-for="(r, i) in visible"
        :key="r.room.id"
        :room="r.room"
        :flip="i % 2 === 1"
        :nights="r.nights"
        :total="r.total"
        :left="r.left"
        :book-to="
          searched
            ? { name: 'book', params: { roomId: r.room.id }, query: { in: stay.checkIn, out: stay.checkOut, g: String(stay.guests) } }
            : undefined
        "
      />
    </div>
  </div>
</template>
