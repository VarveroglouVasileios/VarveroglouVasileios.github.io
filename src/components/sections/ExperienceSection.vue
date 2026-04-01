<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
let context: gsap.Context | undefined

// Map experience data IDs to i18n keys
const getExperienceData = (id: number) => {
  const mapping: Record<number, string> = {
    4: 'bsc',
    3: 'junior',
    2: 'fullstack',
    5: 'structwise',
    1: 'msc'
  }
  const key = mapping[id]
  return {
    title: t(`experience.items.${key}.title`),
    organization: t(`experience.items.${key}.org`),
    description: t(`experience.items.${key}.desc`)
  }
}

onMounted(() => {
  nextTick(() => {
    context = gsap.context(() => {
      const trigger = sectionRef.value
      if (!trigger) return

      gsap.from('.timeline-item', {
        x: (i) => (i % 2 === 0 ? -60 : 60),
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef.value || undefined)
  })
})

onBeforeUnmount(() => {
  context?.revert()
})
</script>

<template>
  <section id="experience" ref="sectionRef" class="relative mx-auto max-w-5xl px-4 py-24 sm:snap-start sm:px-6 md:py-32">
    <div class="mb-16 text-center">
      <p class="mb-4 text-sm uppercase tracking-[0.25em] text-cyan-400">{{ t('experience.tag') }}</p>
      <h2 class="text-3xl font-bold text-white sm:text-4xl md:text-5xl">{{ t('experience.title') }}</h2>
    </div>

    <div class="timeline-container relative">
      <!-- Vertical Line -->
      <div class="absolute left-0 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:left-1/2" />

      <div class="space-y-12 md:space-y-24">
        <div
          v-for="(item, i) in experience"
          :key="item.id"
          class="timeline-item relative flex flex-col md:flex-row md:items-center md:justify-between"
          :class="{ 'md:flex-row-reverse': i % 2 !== 0 }"
        >
          <!-- Point -->
          <div class="absolute left-0 top-2 z-10 h-3 w-3 -translate-x-[5.5px] rounded-full border border-cyan-400 bg-slate-950 md:left-1/2 md:-translate-x-1.5" />

          <!-- Content Wrapper -->
          <div class="w-full md:w-[45%]">
            <div class="rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl transition hover:border-cyan-400/30 hover:bg-slate-900/60 md:p-8">
              <span class="mb-4 block text-xs font-bold tracking-widest text-cyan-400">{{ item.period }}</span>
              <h3 class="mb-2 text-xl font-bold text-white md:text-2xl">{{ getExperienceData(item.id).title }}</h3>
              <p class="mb-4 text-sm font-medium text-slate-400">{{ getExperienceData(item.id).organization }}</p>
              <p class="text-sm leading-relaxed text-slate-300">{{ getExperienceData(item.id).description }}</p>
            </div>
          </div>

          <!-- Empty spacer for desktop -->
          <div class="hidden w-[45%] md:block" />
        </div>
      </div>
    </div>
  </section>
</template>
