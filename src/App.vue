<script setup lang="ts">
import gsap from 'gsap'
import Background3D from '@/components/Background3D.vue'
import Footer from '@/components/layout/Footer.vue'
import TopNav from '@/components/layout/TopNav.vue'

const onBeforeEnter = (element: Element): void => {
  gsap.set(element, { opacity: 0, y: 18 })
}

const onEnter = (element: Element, done: () => void): void => {
  gsap.to(element, {
    opacity: 1,
    y: 0,
    duration: 0.65,
    ease: 'power3.out',
    onComplete: done,
  })
}

const onLeave = (element: Element, done: () => void): void => {
  gsap.to(element, {
    opacity: 0,
    y: -16,
    duration: 0.35,
    ease: 'power2.inOut',
    onComplete: done,
  })
}
</script>

<template>
  <div class="relative min-h-screen text-slate-100">
    <Background3D />
    <TopNav />
    <main class="relative z-[5] pt-40 sm:snap-y sm:snap-proximity sm:pt-36 md:pt-40">
      <RouterView v-slot="{ Component, route }">
        <Transition mode="out-in" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </main>
    <Footer />
  </div>
</template>
