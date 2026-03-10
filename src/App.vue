<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import ScrollTrigger from 'gsap/ScrollTrigger'
import gsap from 'gsap'

import CustomCursor from './components/CustomCursor.vue'
import Background3D from './components/Background3D.vue'
import Hero from './components/Hero.vue'
import AboutMe from './components/AboutMe.vue'
import ProjectsGrid from './components/ProjectsGrid.vue'
import Timeline from './components/Timeline.vue'
import ContactForm from './components/ContactForm.vue'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis

onMounted(() => {
  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1.2,
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
})

onUnmounted(() => {
  if (lenis) lenis.destroy()
  gsap.ticker.remove(lenis.raf)
})
</script>

<template>
  <CustomCursor />

  <!-- Fixed Global WebGL Canvas Background -->
  <div class="fixed inset-0 z-0 pointer-events-auto">
    <Background3D />
    <!-- Global Vignette for Readability -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%),rgba(0,0,0,0.4)] pointer-events-none"></div>
  </div>
  
  <main class="relative w-full overflow-hidden bg-transparent z-10 selection:bg-[var(--color-quantum-neon)] selection:text-[var(--color-quantum-bg)] text-[var(--color-quantum-text)]">
    
    <section id="hero" class="relative w-full h-[120vh]">
      <Hero />
    </section>

    <section id="about" class="relative w-full py-32 md:py-64 px-4 md:px-12 lg:px-24">
      <AboutMe />
    </section>

    <section id="projects" class="relative w-full py-32 px-4 md:px-12 lg:px-24">
      <ProjectsGrid />
    </section>

    <section id="experience" class="relative w-full py-32 px-4 md:px-12 lg:px-24 pb-64">
      <Timeline />
    </section>

    <section id="contact" class="relative w-full pt-32 pb-12 px-4 md:px-12 lg:px-24">
      <ContactForm />
    </section>

  </main>
</template>

<style>
#app {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  text-align: left;
}
</style>
