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

const SECTION_IDS = ['hero', 'services', 'about', 'projects', 'insights', 'experience', 'contact'] as const

let revealContext: gsap.Context | undefined
let cancelled = false

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const sectionsReady = (): boolean => SECTION_IDS.every((id) => document.getElementById(id))

/** Wait until async home sections have mounted so ScrollTrigger measures real positions. */
const waitForSections = async (): Promise<void> => {
  for (let attempt = 0; attempt < 50 && !cancelled; attempt += 1) {
    if (sectionsReady()) return
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 100)
    })
  }
}

/** Once-reveals for [data-reveal] headings/leads as the user scrolls into them. */
const setupReveals = (): void => {
  revealContext?.revert()
  revealContext = undefined
  if (prefersReducedMotion()) return

  const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]')
  if (!targets.length) return

  revealContext = gsap.context(() => {
    targets.forEach((el) => {
      // Hide first, then play only when the trigger is actually crossed.
      gsap.set(el, { opacity: 0, y: 20 })
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
          toggleActions: 'play none none none',
        },
      })
    })
  })
}

const bootScrollMotion = async (): Promise<void> => {
  await nextTick()
  await waitForSections()
  if (cancelled) return
  // One more frame so layout from images/fonts can settle.
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve())
  })
  if (cancelled) return
  setupReveals()
  ScrollTrigger.refresh()
}

const onWindowLoad = (): void => {
  void bootScrollMotion()
}

onMounted(() => {
  if (!window.location.hash) window.scrollTo(0, 0)
  void bootScrollMotion()
  window.addEventListener('load', onWindowLoad)
})

onBeforeUnmount(() => {
  cancelled = true
  window.removeEventListener('load', onWindowLoad)
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
