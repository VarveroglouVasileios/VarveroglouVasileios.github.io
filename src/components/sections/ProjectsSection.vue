<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import DecodingText from '@/components/ui/DecodingText.vue'
import { projects } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

const { t, locale } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)
const cardElements = ref<HTMLElement[]>([])
let context: gsap.Context | undefined

// Map portfolio data IDs to i18n keys
const getProjectData = (id: number) => {
  const mapping: Record<number, string> = {
    4: 'shadowfirewall',
    3: 'vibebites',
    2: 'shadowai',
    1: 'benefitpulse',
  }
  const key = mapping[id]
  return {
    title: t(`projects.items.${key}.title`),
    description: t(`projects.items.${key}.description`)
  }
}

const setCardRef = (element: unknown): void => {
  if (element instanceof HTMLElement && !cardElements.value.includes(element)) {
    cardElements.value.push(element)
  }
}

onMounted(() => {
  nextTick(() => {
    context = gsap.context(() => {
      const trigger = sectionRef.value
      if (!trigger) return

      if (headingRef.value) {
        gsap.fromTo(
          headingRef.value,
          { y: 120, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top 88%',
              end: 'top 50%',
              scrub: 1,
            },
          },
        )
      }

      if (gridRef.value) {
        gsap.fromTo(
          gridRef.value,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top 82%',
              end: 'top 45%',
              scrub: 1,
            },
          },
        )
      }

      cardElements.value.forEach((el: HTMLElement, i: number) => {
        const isLeft = i % 2 === 0
        gsap.fromTo(
          el,
          {
            y: 140,
            opacity: 0,
            scale: 0.88,
            rotationY: isLeft ? -15 : 15,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              end: 'top 45%',
              scrub: 1.2,
            },
          },
        )
      })
    }, sectionRef.value || undefined)
  })
})

onBeforeUnmount(() => {
  context?.revert()
})
</script>

<template>
  <section id="projects" ref="sectionRef" class="relative mx-auto w-full max-w-6xl px-4 py-20 sm:snap-start sm:px-6 md:py-28" style="perspective: 1200px">
    <div ref="headingRef" class="mb-10 flex items-end justify-between gap-4">
      <div>
        <p class="mb-3 text-sm uppercase tracking-[0.18em] text-cyan-300">{{ t('projects.tag') }}</p>
        <DecodingText
          :key="locale"
          as="h2"
          :text="t('projects.title')"
          :duration="1400"
          content-class="text-2xl font-semibold text-white sm:text-3xl md:text-4xl"
        />
      </div>
    </div>

    <div ref="gridRef" class="grid auto-rows-fr gap-5 md:grid-cols-2">
      <div v-for="project in projects" :key="project.id" :ref="setCardRef">
        <ProjectCard :project="{ ...project, ...getProjectData(project.id) }" />
      </div>
    </div>
  </section>
</template>
