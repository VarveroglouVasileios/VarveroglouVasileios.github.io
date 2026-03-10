<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const timelineLineRef = ref<HTMLElement | null>(null)
const itemElements = ref<HTMLElement[]>([])
let context: gsap.Context | undefined

const setItemRef = (element: unknown): void => {
  if (element instanceof HTMLElement && !itemElements.value.includes(element)) {
    itemElements.value.push(element)
  }
}

onMounted(() => {
  context = gsap.context(() => {
    const trigger = sectionRef.value
    if (!trigger) return

    // Heading: scrub slide from left
    if (headingRef.value) {
      gsap.fromTo(
        headingRef.value,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: 'top 88%',
            end: 'top 55%',
            scrub: 1,
          },
        },
      )
    }

    // Timeline line: scrub draw
    if (timelineLineRef.value) {
      gsap.set(timelineLineRef.value, { scaleY: 0, transformOrigin: 'top center' })
      gsap.to(timelineLineRef.value, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top 75%',
          end: 'bottom 50%',
          scrub: 1,
        },
      })
    }

    // Timeline items: scrub slide from sides
    itemElements.value.forEach((el: HTMLElement, i: number) => {
      const fromX = i % 2 === 0 ? -120 : 120
      gsap.fromTo(
        el,
        { x: fromX, y: 60, opacity: 0, scale: 0.95 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'top 48%',
            scrub: 1.2,
          },
        },
      )
    })
  })
})

onBeforeUnmount(() => {
  context?.revert()
})
</script>

<template>
  <section id="experience" ref="sectionRef" class="relative mx-auto w-full max-w-6xl px-4 py-20 sm:snap-start sm:px-6 md:py-28">
    <div ref="headingRef" class="mb-10">
      <p class="mb-3 text-sm uppercase tracking-[0.18em] text-cyan-300">CV / Experience</p>
      <h2 class="text-2xl font-semibold text-white sm:text-3xl md:text-4xl">Interactive Career Timeline</h2>
    </div>

    <div class="relative pl-7 sm:pl-8 md:pl-12">
      <div
        ref="timelineLineRef"
        class="absolute left-2 top-0 h-full w-px bg-gradient-to-b from-cyan-300 via-cyan-500/40 to-transparent md:left-4"
      />
      <article
        v-for="item in experience"
        :key="item.id"
        :ref="setItemRef"
        class="relative mb-8 rounded-3xl border border-white/10 bg-slate-900/55 p-5 backdrop-blur-xl sm:p-6"
      >
        <span
          class="absolute -left-[1.6rem] top-8 block size-3 rounded-full border-2 border-slate-950 sm:-left-[1.85rem] md:-left-[2.35rem]"
          :class="item.type === 'work' ? 'bg-cyan-300' : 'bg-violet-300'"
        />
        <p class="mb-2 text-xs uppercase tracking-[0.16em] text-slate-400">{{ item.period }}</p>
        <h3 class="text-xl font-semibold text-white">{{ item.title }}</h3>
        <p class="mb-3 text-sm text-cyan-200">{{ item.organization }}</p>
        <p class="text-sm leading-relaxed text-slate-300">{{ item.description }}</p>
      </article>
    </div>
  </section>
</template>
