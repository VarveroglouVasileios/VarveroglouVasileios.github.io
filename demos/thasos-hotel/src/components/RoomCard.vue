<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Room } from '@/lib/types'

const props = defineProps<{
  room: Room
  /** Alternate image side on wide screens. */
  flip?: boolean
  /** Present only when dates were searched. */
  nights?: number
  total?: number
  left?: number
  bookTo?: { name: string; params: Record<string, string>; query: Record<string, string> }
}>()

const { t, locale } = useI18n()
const lang = computed(() => (locale.value === 'en' ? 'en' : 'el'))
const base = import.meta.env.BASE_URL
const searched = computed(() => props.total !== undefined && props.nights !== undefined)
</script>

<template>
  <article class="grid items-center gap-6 md:grid-cols-12 md:gap-10">
    <div class="overflow-hidden bg-paper-dark md:col-span-7" :class="flip ? 'md:order-2' : ''">
      <img
        :src="`${base}images/${room.image}.webp`"
        :alt="room.name[lang]"
        width="1024"
        height="768"
        loading="lazy"
        class="aspect-[4/3] w-full object-cover"
      />
    </div>
    <div class="md:col-span-5" :class="flip ? 'md:order-1' : ''">
      <h3 class="text-3xl">{{ room.name[lang] }}</h3>
      <p class="mt-1 text-sm text-ink-soft">
        {{ t('rooms.sqm', { n: room.size }) }} · {{ t('rooms.upTo', { n: room.capacity }) }}
      </p>
      <p class="mt-4">{{ room.description[lang] }}</p>
      <p class="mt-3 text-ink-soft">{{ room.features.map((f) => f[lang]).join(' · ') }}</p>

      <div class="mt-6 border-t border-rule pt-5">
        <p v-if="searched" class="font-serif text-2xl tabular-nums">
          {{ total }}€ <span class="font-sans text-base text-ink-soft">{{ t('rooms.forNights', { nights }) }}</span>
        </p>
        <p v-else class="font-serif text-2xl tabular-nums">{{ t('rooms.perNight', { price: room.basePrice }) }}</p>
        <p v-if="left !== undefined && left <= 2" class="mt-1 text-sm font-medium text-clay-600">
          {{ left === 1 ? t('rooms.lastOne') : t('rooms.left', { n: left }) }}
        </p>
        <router-link v-if="bookTo" :to="bookTo" class="btn mt-4">{{ t('rooms.book') }}</router-link>
      </div>
    </div>
  </article>
</template>
