<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { techSkills } from '@/data/portfolio'
import TechIcon from '@/components/ui/TechIcon.vue'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const bioCardRef = ref<HTMLElement | null>(null)
const stackCardRef = ref<HTMLElement | null>(null)
const skillElements = ref<HTMLElement[]>([])
let context: gsap.Context | undefined

const setSkillRef = (element: unknown): void => {
  if (element instanceof HTMLElement && !skillElements.value.includes(element)) {
    skillElements.value.push(element)
  }
}

onMounted(() => {
  context = gsap.context(() => {
    const trigger = sectionRef.value
    if (!trigger) return

    // Bio card: scrub-in from below with scale
    if (bioCardRef.value) {
      gsap.fromTo(
        bioCardRef.value,
        { y: 150, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: 'top 90%',
            end: 'top 35%',
            scrub: 1.2,
          },
        },
      )
    }

    // Stack card: scrub-in with slight delay
    if (stackCardRef.value) {
      gsap.fromTo(
        stackCardRef.value,
        { y: 180, opacity: 0, scale: 0.9, rotationX: 15 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1.4,
          },
        },
      )
    }

    // Skill items: stagger scrub-in
    skillElements.value.forEach((el: HTMLElement, i: number) => {
      gsap.fromTo(
        el,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'top 55%',
            scrub: 0.8,
          },
        },
      )
      gsap.to(el, {
        y: i % 2 === 0 ? -8 : 8,
        repeat: -1,
        yoyo: true,
        duration: 2.5 + i * 0.2,
        ease: 'sine.inOut',
      })
    })
  })
})

onBeforeUnmount(() => {
  context?.revert()
})
</script>

<template>
  <section id="about" ref="sectionRef" class="relative mx-auto w-full max-w-6xl px-4 py-20 sm:snap-start sm:px-6 md:py-28" style="perspective: 1000px">
    <div class="grid gap-8 md:grid-cols-2">
      <article ref="bioCardRef" class="rounded-3xl border border-white/10 bg-slate-900/55 p-6 backdrop-blur-xl sm:p-8">
        <p class="mb-4 text-sm uppercase tracking-[0.18em] text-cyan-300">About Me</p>
        <h2 class="mb-5 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
          Full Stack Developer & Security-focused Engineer
        </h2>
        <p class="mb-4 leading-relaxed text-slate-300">
          I am a Full Stack Developer with 3 years of experience building and maintaining scalable web
          applications in an enterprise environment, currently working at FactSet and pursuing an MSc in
          Cybersecurity.
        </p>
        <p class="leading-relaxed text-slate-300">
          I work across the full stack with Vue.js, Node.js, TypeScript, PHP (Symfony), SQL, and Pinia,
          focusing on clean architecture, performance, and reliability—while applying secure-by-design
          principles from my cybersecurity studies.
        </p>
      </article>

      <article ref="stackCardRef" class="rounded-3xl border border-white/10 bg-slate-900/45 p-5 backdrop-blur-xl sm:p-6">
        <p class="mb-5 text-sm uppercase tracking-[0.18em] text-cyan-300">Tech Stack</p>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div
            v-for="skill in techSkills"
            :key="skill.name"
            :ref="setSkillRef"
            class="group rounded-2xl border border-white/10 bg-slate-800/45 p-4 transition hover:-translate-y-1 hover:border-cyan-300/40"
          >
            <div
              class="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-slate-950"
              :class="skill.accent"
            >
              <TechIcon :name="skill.name" class-name="size-6" />
            </div>
            <p class="text-sm font-medium text-slate-100">{{ skill.name }}</p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
