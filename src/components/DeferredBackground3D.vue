<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue'

const show = ref(false)

const Background3D = defineAsyncComponent(() => import('@/components/Background3D.vue'))

onMounted(() => {
  const enable = (): void => {
    show.value = true
  }
  // Two rAFs: μετά το πρώτο paint, όχι μπλοκάρισμα από idle / reduced-motion
  requestAnimationFrame(() => {
    requestAnimationFrame(enable)
  })
})
</script>

<template>
  <Background3D v-if="show" />
</template>
