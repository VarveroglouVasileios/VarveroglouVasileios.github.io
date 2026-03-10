<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const scrollY = ref(0)

const onScroll = (): void => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  scrollY.value = window.scrollY
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="fixed inset-0 -z-10 overflow-hidden">
    <!-- Base gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950"
    />

    <!-- Parallax glow layers (scroll-driven) -->
    <div
      class="absolute -left-1/4 -top-1/4 h-[150%] w-[150%] opacity-30 transition-opacity duration-300"
      :style="{
        transform: `translateY(${scrollY * 0.15}px)`,
        background: 'radial-gradient(circle at 30% 20%, rgba(34, 211, 238, 0.2) 0%, transparent 50%)',
      }"
    />
    <div
      class="absolute -right-1/4 -bottom-1/4 h-[150%] w-[150%] opacity-25 transition-opacity duration-300"
      :style="{
        transform: `translateY(${-scrollY * 0.12}px)`,
        background: 'radial-gradient(circle at 70% 80%, rgba(167, 139, 250, 0.25) 0%, transparent 50%)',
      }"
    />

    <!-- Subtle vignette -->
    <div
      class="pointer-events-none absolute inset-0"
      style="
        background: radial-gradient(
          ellipse 80% 50% at 50% 0%,
          transparent 0%,
          transparent 60%,
          rgba(2, 6, 23, 0.4) 100%
        );
      "
    />
  </div>
</template>
