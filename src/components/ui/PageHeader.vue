<script setup lang="ts">
defineProps<{
  tag: string
  title: string
  lead?: string
}>()
</script>

<template>
  <header class="mx-auto max-w-6xl px-4 pb-10 sm:px-6 md:pb-14">
    <p class="mb-3 text-sm uppercase tracking-[0.22em] text-cyan-400">{{ tag }}</p>
    <h1 class="text-balance text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
      {{ title }}
    </h1>
    <p v-if="lead" class="mt-5 max-w-3xl text-base text-slate-300 sm:text-lg">{{ lead }}</p>
  </header>
</template>
