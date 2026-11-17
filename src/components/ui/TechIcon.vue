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
  <div class="flex items-center gap-3">
    <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white" role="presentation">
      <svg class="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path :d="icon.path" :fill="iconFill" />
      </svg>
    </div>
    <span class="min-w-0 text-sm font-medium leading-snug text-slate-200">{{ skill.name }}</span>
  </div>
</template>
