<script setup lang="ts">
import { defineAsyncComponent, nextTick, onBeforeUnmount, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero3D = defineAsyncComponent(() => import('@/components/Hero3D.vue'))
const AboutSection = defineAsyncComponent(() => import('@/components/sections/AboutSection.vue'))
const ProjectsSection = defineAsyncComponent(() => import('@/components/sections/ProjectsSection.vue'))
const ExperienceSection = defineAsyncComponent(() => import('@/components/sections/ExperienceSection.vue'))
const InsightsSection = defineAsyncComponent(() => import('@/components/sections/InsightsSection.vue'))
const ContactSection = defineAsyncComponent(() => import('@/components/sections/ContactSection.vue'))

const refreshScroll = (): void => {
  nextTick(() => {
    setTimeout(() => {
      ScrollTrigger.refresh()
      if (!window.location.hash) window.scrollTo(0, 0)
    }, 400)
  })
}

onMounted(() => {
  if (!window.location.hash) window.scrollTo(0, 0)
  refreshScroll()
  window.addEventListener('load', refreshScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('load', refreshScroll)
})
</script>

<template>
  <div>
    <Hero3D />
    <AboutSection />
    <ProjectsSection />
    <InsightsSection />
    <ExperienceSection />
    <ContactSection />
  </div>
</template>
