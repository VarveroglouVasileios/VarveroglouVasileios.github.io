<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TechIcon from '@/components/ui/TechIcon.vue'
import DecodingText from '@/components/ui/DecodingText.vue'
import { techSkills } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

const { t, locale } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)
const techRef = ref<HTMLElement | null>(null)

let context: gsap.Context | undefined

onMounted(() => {
  nextTick(() => {
    context = gsap.context(() => {
      const trigger = sectionRef.value
      if (!trigger) return

      if (headingRef.value) {
        gsap.fromTo(
          headingRef.value,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 1,
            },
          },
        )
      }

      if (textRef.value) {
        gsap.fromTo(
          textRef.value.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger: textRef.value,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 1,
            },
          },
        )
      }

      if (techRef.value) {
        gsap.fromTo(
          techRef.value,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: techRef.value,
              start: 'top 92%',
              end: 'top 65%',
              scrub: 1,
            },
          },
        )
      }
    }, sectionRef.value || undefined)
  })
})

onBeforeUnmount(() => {
  context?.revert()
})
</script>

<template>
  <section id="about" ref="sectionRef" class="relative mx-auto max-w-7xl px-4 py-24 sm:snap-start sm:px-6 md:py-32">
    <div class="grid gap-16 lg:grid-cols-2 lg:gap-24">
      <div ref="textRef">
        <p class="mb-4 text-sm uppercase tracking-[0.2em] text-cyan-400">{{ t('about.tag') }}</p>
        <div ref="headingRef">
          <DecodingText
            :key="locale"
            as="h2"
            :text="t('about.title')"
            :duration="1600"
            content-class="mb-8 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
          />
        </div>
        <div class="space-y-6 text-base text-slate-300 sm:text-lg">
          <p>{{ t('about.p1') }}</p>
          <p>{{ t('about.p2') }}</p>
        </div>
      </div>

      <div ref="techRef" class="relative">
        <div class="rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur-xl md:p-10">
          <p class="mb-8 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300/80">{{ t('about.techStack') }}</p>
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <TechIcon v-for="skill in techSkills" :key="skill.name" :skill="skill" />
          </div>
        </div>
        <div class="absolute -right-4 -top-4 -z-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />
        <div class="absolute -bottom-4 -left-4 -z-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />
      </div>
    </div>
  </section>
</template>
