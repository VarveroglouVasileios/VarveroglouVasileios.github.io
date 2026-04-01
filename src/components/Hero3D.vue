<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const { t, locale } = useI18n()
const typedHeadline = ref<string>('')
const heroRoot = ref<HTMLElement | null>(null)

let typingIntervalId: number | undefined
let context: gsap.Context | undefined

const startTypingEffect = (): void => {
  if (typingIntervalId !== undefined) window.clearInterval(typingIntervalId)
  let index = 0
  const fullHeadline = t('hero.headline')
  typingIntervalId = window.setInterval(() => {
    typedHeadline.value = fullHeadline.slice(0, index)
    index += 1
    if (index > fullHeadline.length && typingIntervalId !== undefined) {
      window.clearInterval(typingIntervalId)
    }
  }, 35)
}

watch(locale, () => {
  startTypingEffect()
})

onMounted(() => {
  nextTick(() => {
    startTypingEffect()

    context = gsap.context((self) => {
      if (!self.selector) return
      
      gsap.from(self.selector('[data-hero-item]'), {
        y: 48,
        opacity: 0,
        stagger: 0.14,
        duration: 1,
        ease: 'power3.out',
      })

      gsap.to(self.selector('[data-hero-shell]'), {
        y: 24,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRoot.value,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
    }, heroRoot.value || undefined)
  })
})

onBeforeUnmount(() => {
  context?.revert()
  if (typingIntervalId !== undefined) {
    window.clearInterval(typingIntervalId)
  }
})
</script>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .hero-cta-pulse {
    animation: hero-cta-glow 2.4s ease-in-out infinite alternate;
  }
}

@keyframes hero-cta-glow {
  from {
    box-shadow: 0 0 12px rgba(34, 211, 238, 0.12);
  }
  to {
    box-shadow: 0 0 28px rgba(34, 211, 238, 0.32);
  }
}
</style>

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
          {{ t('hero.title') }}
        </p>
        <h1
          data-hero-item
          class="mb-6 min-h-[4.5rem] text-balance text-3xl font-bold leading-tight text-white sm:min-h-[6rem] sm:text-4xl md:min-h-[8rem] md:text-6xl"
        >
          {{ typedHeadline }}
          <span class="animate-pulse text-cyan-300">|</span>
        </h1>
        <p
          data-hero-item
          class="mb-8 max-w-2xl text-base text-slate-300 sm:text-lg"
        >
          {{ t('hero.description') }}
        </p>

        <div data-hero-item class="flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href="#projects"
            class="hero-cta-pulse rounded-full border border-cyan-300/60 bg-cyan-400/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200 transition hover:-translate-y-0.5 hover:bg-cyan-300/30 sm:px-7 sm:text-sm sm:tracking-[0.16em]"
          >
            {{ t('hero.viewProjects') }}
          </a>
          <a
            href="#contact"
            class="rounded-full border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-200 sm:px-7 sm:text-sm sm:tracking-[0.16em]"
          >
            {{ t('hero.hireMe') }}
          </a>
          <a
            href="/VasileiosVarveroglouCV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="VasileiosVarveroglouCV.pdf"
            class="rounded-full border border-emerald-400/50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300 transition hover:-translate-y-0.5 hover:border-emerald-300/70 hover:bg-emerald-400/15 sm:px-7 sm:text-sm sm:tracking-[0.16em]"
          >
            {{ t('hero.downloadCv') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
