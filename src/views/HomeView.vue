<script setup lang="ts">
import { defineAsyncComponent, nextTick, onBeforeUnmount, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero3D = defineAsyncComponent(() => import('@/components/Hero3D.vue'))
const ServicesSection = defineAsyncComponent(() => import('@/components/sections/ServicesSection.vue'))
const AboutSection = defineAsyncComponent(() => import('@/components/sections/AboutSection.vue'))
const ProjectsSection = defineAsyncComponent(() => import('@/components/sections/ProjectsSection.vue'))
const ExperienceSection = defineAsyncComponent(() => import('@/components/sections/ExperienceSection.vue'))
const InsightsSection = defineAsyncComponent(() => import('@/components/sections/InsightsSection.vue'))
const ContactSection = defineAsyncComponent(() => import('@/components/sections/ContactSection.vue'))

let revealContext: gsap.Context | undefined

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Light once-reveals for section titles / leads marked with [data-reveal]. */
const setupReveals = (): void => {
  revealContext?.revert()
  revealContext = undefined
  if (prefersReducedMotion()) return

  revealContext = gsap.context(() => {
    const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]')
    if (!targets.length) return
    gsap.set(targets, { opacity: 0, y: 12 })
    ScrollTrigger.batch(targets, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
          overwrite: true,
        })
      },
    })
  })
}

const refreshScroll = (): void => {
  nextTick(() => {
    setTimeout(() => {
      setupReveals()
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
  revealContext?.revert()
})
</script>

<template>
  <div>
    <Hero3D />
    <ServicesSection />
    <AboutSection />
    <ProjectsSection />
    <InsightsSection />
    <ExperienceSection />
    <ContactSection />
  </div>
</template>
