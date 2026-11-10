<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SearchBar from '@/components/SearchBar.vue'
import RoomCard from '@/components/RoomCard.vue'
import { rooms } from '@/data/rooms'

const { t } = useI18n()
const base = import.meta.env.BASE_URL
</script>

<template>
  <div>
    <img
      :src="`${base}images/hero-bay.webp`"
      alt=""
      width="1024"
      height="576"
      class="h-[42vh] min-h-[220px] w-full object-cover sm:h-[56vh]"
    />

    <div class="wrap mt-10 grid gap-6 md:mt-14 md:grid-cols-12 md:gap-12">
      <h1 class="text-4xl leading-tight sm:text-5xl md:col-span-7">{{ t('home.title') }}</h1>
      <p class="text-lg text-ink-soft md:col-span-5 md:pt-3">{{ t('home.lead') }}</p>
    </div>

    <section class="wrap mt-10 md:mt-14">
      <h2 class="mb-4 text-2xl">{{ t('home.searchTitle') }}</h2>
      <SearchBar />
    </section>

    <section class="wrap mt-16 md:mt-24">
      <p class="max-w-2xl font-serif text-2xl leading-snug sm:text-3xl">{{ t('home.intro') }}</p>
    </section>

    <section class="wrap mt-16 md:mt-24">
      <div class="mb-8 flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-3">
        <h2 class="text-3xl">{{ t('home.roomsTitle') }}</h2>
        <router-link to="/rooms" class="link">{{ t('home.allRooms') }}</router-link>
      </div>
      <div class="space-y-14 md:space-y-20">
        <RoomCard v-for="(room, i) in rooms" :key="room.id" :room="room" :flip="i % 2 === 1" />
      </div>
    </section>

    <section class="wrap mt-16 md:mt-24">
      <h2 class="mb-8 border-b border-rule pb-3 text-3xl">{{ t('home.dailyTitle') }}</h2>
      <div class="grid gap-8 md:grid-cols-3 md:gap-10">
        <div v-for="k in ['d1', 'd2', 'd3']" :key="k">
          <h3 class="text-xl">{{ t(`home.${k}t`) }}</h3>
          <p class="mt-2 text-ink-soft">{{ t(`home.${k}`) }}</p>
        </div>
      </div>
    </section>

    <section class="wrap mt-16 md:mt-24">
      <h2 class="mb-3 text-3xl">{{ t('home.locationTitle') }}</h2>
      <p class="max-w-xl text-ink-soft">{{ t('home.locationText') }}</p>
    </section>
  </div>
</template>
