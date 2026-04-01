<script setup lang="ts">
import { computed } from 'vue'
import type { SimpleIcon } from 'simple-icons'
import {
  siAngular,
  siExpress,
  siMongodb,
  siNodedotjs,
  siOwasp,
  siPhp,
  siPinia,
  siTailwindcss,
  siTypescript,
  siVuedotjs,
} from 'simple-icons'
import type { Skill, TechName } from '@/types/portfolio'

const props = defineProps<{
  skill: Skill
}>()

const techIcons: Record<TechName, SimpleIcon> = {
  'Vue 3': siVuedotjs,
  'Angular.js': siAngular,
  'Node.js': siNodedotjs,
  TypeScript: siTypescript,
  'Tailwind CSS': siTailwindcss,
  Express: siExpress,
  Pinia: siPinia,
  MongoDB: siMongodb,
  PHP: siPhp,
  'Application Security': siOwasp,
}

const icon = computed(() => techIcons[props.skill.name])
const iconFill = computed(() => `#${icon.value.hex}`)
</script>

<template>
  <div
    class="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-800/35 px-3 py-2.5 sm:px-4 sm:py-3"
  >
    <div
      class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-inner shadow-slate-900/15 sm:size-10"
      role="presentation"
    >
      <svg
        class="m-auto h-5 w-5 sm:h-6 sm:w-6"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path :d="icon.path" :fill="iconFill" />
      </svg>
    </div>
    <span class="min-w-0 text-xs font-medium leading-snug text-slate-100 sm:text-sm">
      {{ skill.name }}
    </span>
  </div>
</template>
