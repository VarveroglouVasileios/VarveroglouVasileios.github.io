<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import RoomArt from './RoomArt.vue'
import type { Room } from '@/lib/types'

const props = defineProps<{
  room: Room
  /** Present only when dates were searched. */
  nights?: number
  total?: number
  left?: number
  bookTo?: { name: string; params: Record<string, string>; query: Record<string, string> }
}>()

const { t, locale } = useI18n()
const lang = computed(() => (locale.value === 'en' ? 'en' : 'el'))
const searched = computed(() => props.total !== undefined && props.nights !== undefined)
</script>

<template>
  <article class="flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm">
    <div class="aspect-[5/3]"><RoomArt :hue="room.hue" :label="room.name[lang]" /></div>
    <div class="flex flex-1 flex-col p-5">
      <h3 class="font-serif text-xl font-bold text-olive-800">{{ room.name[lang] }}</h3>
      <p class="mt-1 text-xs text-slate-500">
        {{ t('rooms.sqm', { n: room.size }) }} · {{ t('rooms.upTo', { n: room.capacity }) }}
      </p>
      <p class="mt-3 text-sm text-slate-700">{{ room.description[lang] }}</p>
      <ul class="mt-3 flex flex-wrap gap-2">
        <li v-for="f in room.features" :key="f.en" class="rounded-full bg-sand-100 px-3 py-1 text-xs text-slate-700">
          {{ f[lang] }}
        </li>
      </ul>
      <div class="mt-auto flex flex-wrap items-end justify-between gap-3 pt-5">
        <div>
          <p v-if="searched" class="font-semibold text-slate-900">
            {{ t('rooms.total', { total, nights }) }}
          </p>
          <p v-else class="font-semibold text-slate-900">{{ t('rooms.perNight', { price: room.basePrice }) }}</p>
          <p v-if="left !== undefined && left <= 2" class="text-xs font-semibold text-clay-600">
            {{ left === 1 ? t('rooms.lastOne') : t('rooms.left', { n: left }) }}
          </p>
        </div>
        <router-link v-if="bookTo" :to="bookTo" class="btn">{{ t('rooms.book') }}</router-link>
      </div>
    </div>
  </article>
</template>
