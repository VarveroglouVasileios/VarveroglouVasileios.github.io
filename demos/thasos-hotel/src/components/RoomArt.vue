<script setup lang="ts">
import { computed } from 'vue'
import type { Hue } from '@/lib/types'

/** Illustrative placeholder so the demo ships with no stock photos. A designer replaces it with real photography. */
const props = defineProps<{ hue: Hue; label: string }>()

const palette = computed(
  () =>
    ({
      olive: ['#dfe6cf', '#8fa66f', '#566a3f'],
      sea: ['#d7ebf2', '#6fb1c9', '#1f6482'],
      clay: ['#f5dfd2', '#e0a280', '#b05a38'],
    })[props.hue],
)
</script>

<template>
  <svg viewBox="0 0 400 240" role="img" :aria-label="label" class="h-full w-full">
    <rect width="400" height="240" :fill="palette[0]" />
    <circle cx="310" cy="60" r="28" fill="#fff" opacity="0.7" />
    <path d="M0 150 Q100 120 200 150 T400 150 V240 H0 Z" :fill="palette[1]" />
    <path d="M0 185 Q120 160 240 185 T400 180 V240 H0 Z" :fill="palette[2]" />
  </svg>
</template>
