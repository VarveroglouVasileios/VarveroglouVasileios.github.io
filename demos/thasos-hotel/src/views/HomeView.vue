<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SearchBar from '@/components/SearchBar.vue'
import RoomCard from '@/components/RoomCard.vue'
import { rooms } from '@/data/rooms'

const { t } = useI18n()
</script>

<template>
  <div>
    <section class="bg-gradient-to-b from-sea-700 to-sea-500 px-4 pb-24 pt-16 text-white sm:px-6">
      <div class="mx-auto max-w-6xl">
        <p class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-100">{{ t('home.tag') }}</p>
        <h1 class="max-w-3xl text-balance font-serif text-4xl font-bold leading-tight sm:text-6xl">{{ t('home.title') }}</h1>
        <p class="mt-5 max-w-2xl text-lg text-sky-50">{{ t('home.lead') }}</p>
      </div>
    </section>

    <div class="mx-auto -mt-12 max-w-6xl px-4 sm:px-6"><SearchBar /></div>

    <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div class="mb-8 flex flex-wrap items-end justify-between gap-3">
        <h2 class="font-serif text-3xl font-bold text-olive-800">{{ t('home.roomsTitle') }}</h2>
        <router-link to="/rooms" class="btn-ghost">{{ t('home.allRooms') }}</router-link>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <RoomCard v-for="room in rooms" :key="room.id" :room="room" />
      </div>
    </section>

    <section class="bg-sand-100 px-4 py-16 sm:px-6">
      <div class="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div>
          <h2 class="mb-4 font-serif text-3xl font-bold text-olive-800">{{ t('home.whyTitle') }}</h2>
          <ul class="space-y-2 text-slate-700">
            <li v-for="k in ['why1', 'why2', 'why3']" :key="k" class="flex gap-2">
              <span class="text-olive-600" aria-hidden="true">✓</span>{{ t(`home.${k}`) }}
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-4 font-serif text-3xl font-bold text-olive-800">{{ t('home.locationTitle') }}</h2>
          <p class="text-slate-700">{{ t('home.locationText') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
