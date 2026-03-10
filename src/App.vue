<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import ScrollTrigger from 'gsap/ScrollTrigger'
import gsap from 'gsap'

import CustomCursor from './components/CustomCursor.vue'
import Hero3D from './components/Hero3D.vue'
import AboutMe from './components/AboutMe.vue'
import SkillsEcosystem from './components/SkillsEcosystem.vue'
import ProjectsGrid from './components/ProjectsGrid.vue'
import Timeline from './components/Timeline.vue'
import ContactForm from './components/ContactForm.vue'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis

onMounted(() => {
  lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
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
  
  <main class="relative w-full overflow-hidden">
    
    <!-- Hero / Orbit System -->
    <section id="hero" class="relative w-full h-[150vh]"> <!-- Extra height for scroll scrub -->
      <Hero3D />
    </section>

    <!-- Floating About Cards -->
    <section id="about" class="relative w-full py-32 px-4 md:px-12 lg:px-24">
      <AboutMe />
    </section>

    <!-- NEW: Orbital Skills Marquee -->
    <section id="skills" class="relative w-full py-24 overflow-hidden border-y border-white/5 bg-orbit-core/30">
      <SkillsEcosystem />
    </section>

    <!-- Overlapping Project Cards -->
    <section id="projects" class="relative w-full py-32 px-4 md:px-12 lg:px-24">
      <ProjectsGrid />
    </section>

    <!-- Launch Sequence CV -->
    <section id="experience" class="relative w-full py-32 px-4 md:px-12 lg:px-24 pb-64">
      <Timeline />
    </section>

    <!-- Command Center Contact -->
    <section id="contact" class="relative w-full bg-orbit-core/50 pt-32 pb-12 px-4 md:px-12 lg:px-24 border-t border-white/5">
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
