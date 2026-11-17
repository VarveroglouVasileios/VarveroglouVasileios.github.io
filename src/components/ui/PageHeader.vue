<script setup lang="ts">
defineProps<{
  /** Kept for callers; the page title already says where you are, so it is not rendered. */
  tag?: string
  title: string
  lead?: string
}>()
</script>

<template>
  <header class="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 md:pb-16">
    <h1 class="max-w-4xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
      {{ title }}
    </h1>
    <p v-if="lead" class="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">{{ lead }}</p>
  </header>
</template>
