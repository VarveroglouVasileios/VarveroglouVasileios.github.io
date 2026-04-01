<script setup lang="ts">
import DeferredBackground3D from '@/components/DeferredBackground3D.vue'
import Footer from '@/components/layout/Footer.vue'
import TopNav from '@/components/layout/TopNav.vue'
</script>

<template>
  <div class="relative min-h-screen text-slate-100 bg-slate-950">
    <DeferredBackground3D />
    <TopNav />
    <main class="relative z-[5] pt-40 sm:pt-36 md:pt-40">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </main>
    <Footer />
  </div>
</template>

<style>
/* Global resets */
* {
  box-sizing: border-box;
}

html {
  background: #020617;
  scroll-behavior: smooth;
}

.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(14px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
