<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const fullHeadline = 'Shipping secure, scalable web platforms with Vue & Node.'
const typedHeadline = ref<string>('')
const heroRoot = ref<HTMLElement | null>(null)
const ctaButton = ref<HTMLElement | null>(null)

let typingIntervalId: number | undefined
let context: gsap.Context | undefined

const startTypingEffect = (): void => {
  let index = 0
  typingIntervalId = window.setInterval(() => {
    typedHeadline.value = fullHeadline.slice(0, index)
    index += 1
    if (index > fullHeadline.length && typingIntervalId !== undefined) {
      window.clearInterval(typingIntervalId)
    }
  }, 35)
}

onMounted(() => {
  startTypingEffect()

  context = gsap.context(() => {
    if (heroRoot.value) {
      gsap.from(heroRoot.value.querySelectorAll('[data-hero-item]'), {
        y: 48,
        opacity: 0,
        stagger: 0.14,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.to(heroRoot.value.querySelector('[data-hero-shell]'), {
        y: 24,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRoot.value,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
    }

    if (ctaButton.value) {
      gsap.to(ctaButton.value, {
        boxShadow: '0 0 48px rgba(34, 211, 238, 0.45)',
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'sine.inOut',
      })
    }
  }, heroRoot)
})

onBeforeUnmount(() => {
  context?.revert()
  if (typingIntervalId !== undefined) {
    window.clearInterval(typingIntervalId)
  }
})
</script>

<template>
  <section
    id="hero"
    ref="heroRoot"
    class="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 sm:snap-start sm:px-6"
  >
    <div class="mx-auto w-full max-w-6xl" data-hero-shell>
      <div
        class="max-w-3xl rounded-3xl border border-white/10 bg-slate-900/45 p-8 backdrop-blur-xl md:p-12"
      >
        <p
          data-hero-item
          class="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300"
        >
          Vue & Node.js Engineer
        </p>
        <h1
          data-hero-item
          class="mb-6 text-balance text-3xl font-bold leading-tight text-white sm:text-4xl md:text-6xl"
        >
          {{ typedHeadline }}
          <span class="animate-pulse text-cyan-300">|</span>
        </h1>
        <p
          data-hero-item
          class="mb-8 max-w-2xl text-base text-slate-300 sm:text-lg"
        >
          Full Stack Developer (FactSet) with a background in Computer Science
          and an MSc in Cybersecurity in progress—combining Vue.js, Node.js, and
          secure-by-design thinking to build reliable products.
        </p>

        <div data-hero-item class="flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            ref="ctaButton"
            href="#projects"
            class="rounded-full border border-cyan-300/60 bg-cyan-400/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200 transition hover:-translate-y-0.5 hover:bg-cyan-300/30 sm:px-7 sm:text-sm sm:tracking-[0.16em]"
          >
            View Projects
          </a>
          <a
            href="#contact"
            class="rounded-full border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-200 sm:px-7 sm:text-sm sm:tracking-[0.16em]"
          >
            Hire Me
          </a>
          <a
            href="/VarveroglouCV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="VarveroglouCV.pdf"
            class="rounded-full border border-emerald-400/50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300 transition hover:-translate-y-0.5 hover:border-emerald-300/70 hover:bg-emerald-400/15 sm:px-7 sm:text-sm sm:tracking-[0.16em]"
          >
            Download CV
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
