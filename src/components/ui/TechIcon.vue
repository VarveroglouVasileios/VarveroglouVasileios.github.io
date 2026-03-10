<script setup lang="ts">
import { computed } from 'vue'

type SupportedTechName =
  | 'Vue 3'
  | 'Node.js'
  | 'TypeScript'
  | 'Express'
  | 'Pinia'
  | 'MongoDB'
  | 'PHP'
  | 'Application Security'

const { name, className = '' } = defineProps<{
  name: SupportedTechName
  className?: string
}>()

const iconPaths = computed<Record<SupportedTechName, string>>(() => ({
  'Vue 3': 'M2 3h5l5 8 5-8h5L12 21 2 3z M7 3h3l2 3 2-3h3l-5 8-5-8z',
  'Node.js': 'M12 2 20 6.6v10.8L12 22l-8-4.6V6.6L12 2zm3.8 11.6V9.3l-3.8-2.2-3.8 2.2v4.3l3.8 2.2 3.8-2.2z',
  TypeScript: 'M3 3h18v18H3V3zm4 5h10v2h-4v8h-2v-8H7V8z',
  Express: 'M4 12c2.5-3 5.5-3 8 0s5.5 3 8 0 M4 8h16 M4 16h16',
  Pinia: 'M12 3c2.5 2.4 5.2 3.5 7 7-1.2 5.3-5.2 8.5-7 11-1.8-2.5-5.8-5.7-7-11 1.8-3.5 4.5-4.6 7-7z',
  MongoDB: 'M12 2L8 6v12l4 4 4-4V6l-4-4zm0 2.5l2 2v9l-2 2-2-2v-9l2-2z',
  PHP: 'M6 4h2l2 6 2-6h2l-2 12h-2l2-8-2 8H6L4 4z M14 10h4l2-6-2 12h-2l1.5-6z',
  'Application Security': 'M12 2L4 6v6c0 4.4 3.6 8 8 8s8-3.6 8-8V6l-8-4zm0 2.2l6 3v4.8c0 3.3-2.7 6-6 6s-6-2.7-6-6V7.2l6-3z M12 8v4m0 4h.01',
}))

const viewBox = '0 0 24 24'
</script>

<template>
  <svg
    :class="className"
    :viewBox="viewBox"
    fill="currentColor"
    aria-hidden="true"
  >
    <path :d="iconPaths[name]" />
  </svg>
</template>
