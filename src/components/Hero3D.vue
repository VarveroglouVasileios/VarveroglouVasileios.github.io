<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import BrowserFrame from '@/components/showcase/BrowserFrame.vue'
import { projects } from '@/data/portfolio'
import { useLocalePath } from '@/composables/useLocalePath'
import { useMagneticHover } from '@/composables/useMagneticHover'
import { trackEvent } from '@/lib/analytics'

const { t, locale } = useI18n()
const { to } = useLocalePath()

const heroRoot = ref<HTMLElement | null>(null)
const magnetRef = ref<HTMLElement | null>(null)
const { attach } = useMagneticHover()

// The headline rises word by word; the full sentence stays readable as one label.
const headline = computed(() => t('hero.headline'))
const headlineWords = computed(() => headline.value.split(' '))

// The hero shows the actual work: one screen that cycles through the live projects.
const reel = projects.filter((project, index, list) =>
  project.imageUrl && list.findIndex((other) => other.imageUrl === project.imageUrl) === index,
)
const reelIndex = ref(0)
const current = computed(() => reel[reelIndex.value])

const CYCLE_MS = 4500
let timer: number | undefined
let context: gsap.Context | undefined
const paused = ref(false)

const prefersReducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const stopCycle = (): void => {
  if (timer !== undefined) window.clearInterval(timer)
  timer = undefined
}

const startCycle = (): void => {
  stopCycle()
  if (reel.length < 2 || prefersReducedMotion()) return
  timer = window.setInterval(() => {
    if (!paused.value && !document.hidden) reelIndex.value = (reelIndex.value + 1) % reel.length
  }, CYCLE_MS)
}

const pick = (index: number): void => {
  reelIndex.value = index
  startCycle()
}

onMounted(() => {
  startCycle()
  if (magnetRef.value) attach(magnetRef.value)
  nextTick(() => {
    if (prefersReducedMotion()) return
    // One page-load sequence: copy rises in, then the screen settles into place.
    context = gsap.context((self) => {
      if (!self.selector) return
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      timeline
        .from(self.selector('[data-hero-item]'), { y: 24, opacity: 0, stagger: 0.09, duration: 0.8 }, 0.35)
        .from(
          self.selector('[data-hero-screen]'),
          { y: 60, opacity: 0, rotateY: -14, rotateX: 6, duration: 1.1, transformPerspective: 1400 },
          0.1,
        )
    }, heroRoot.value || undefined)
  })
})

onBeforeUnmount(() => {
  context?.revert()
  stopCycle()
})
</script>

<template>
  <section
    id="hero"
    ref="heroRoot"
    class="relative mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-7xl items-center px-4 pb-20 pt-6 sm:px-6"
  >
    <div class="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-10">
      <div class="min-w-0 lg:col-span-6">
        <p data-hero-item class="mb-5 text-sm font-medium text-cyan-300 sm:text-base">
          {{ t('hero.title') }}
        </p>
        <h1
          :key="locale"
          :aria-label="headline"
          class="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl xl:text-6xl"
        >
          <template v-for="(word, index) in headlineWords" :key="index">
            <span class="hero-word" aria-hidden="true"><span class="hero-word__inner" :style="{ '--i': index }">{{ word }}</span></span>{{ ' ' }}
          </template>
        </h1>
        <p data-hero-item class="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {{ t('hero.description') }}
        </p>

        <div data-hero-item class="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
          <span ref="magnetRef" class="inline-block">
            <router-link
              :to="to('contact')"
              class="btn-primary clickable px-7 py-3.5"
              @click="trackEvent('Quote CTA', { source: 'hero' })"
            >
              {{ t('cta.quote') }}
            </router-link>
          </span>
          <router-link :to="to('services')" class="hero-link clickable text-base font-medium text-slate-100">
            {{ t('cta.allServices') }}
          </router-link>
          <a
            href="/VasileiosVarveroglouCV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="VasileiosVarveroglouCV.pdf"
            class="hero-link clickable text-base font-medium text-slate-400"
          >
            {{ t('hero.cv') }}
          </a>
        </div>
      </div>

      <div
        v-if="current"
        class="min-w-0 lg:col-span-6"
        @pointerenter="paused = true"
        @pointerleave="paused = false"
        @focusin="paused = true"
        @focusout="paused = false"
      >
        <div data-hero-screen>
          <BrowserFrame
            :title="current.title"
            :image-url="current.imageUrl"
            :live-url="current.liveUrl"
            :open-label="t('showcase.openNew')"
            eager
            build
          />
        </div>

        <div data-hero-item class="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p class="text-sm text-slate-400">
            {{ t('hero.nowShowing') }}:
            <router-link
              v-if="current.slug"
              :to="to('project', { slug: current.slug })"
              class="hero-link clickable font-medium text-slate-100"
            >
              {{ current.title }}
            </router-link>
            <span v-else class="font-medium text-slate-100">{{ current.title }}</span>
          </p>
          <div class="flex gap-2">
            <button
              v-for="(project, index) in reel"
              :key="project.id"
              type="button"
              class="reel-dot clickable"
              :class="{ 'is-current': index === reelIndex }"
              :aria-label="t('hero.pick', { title: project.title })"
              :aria-pressed="index === reelIndex"
              @click="pick(index)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Each word sits in a clipped box and slides up into it. Padding keeps accents and descenders unclipped. */
.hero-word {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  padding: 0.18em 0 0.14em;
  margin: -0.18em 0 -0.14em;
}

.hero-word__inner {
  display: inline-block;
}

@media (prefers-reduced-motion: no-preference) {
  .hero-word__inner {
    transform: translateY(115%);
    animation: hero-word-up 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: calc(var(--i) * 50ms + 80ms);
  }
}

@keyframes hero-word-up {
  to {
    transform: translateY(0);
  }
}

.hero-link {
  text-decoration: underline;
  text-decoration-color: rgba(148, 163, 184, 0.45);
  text-underline-offset: 0.35em;
  transition:
    color 0.2s ease,
    text-decoration-color 0.2s ease;
}

.hero-link:hover {
  color: #67e8f9;
  text-decoration-color: currentColor;
}

/* 24px hit area around a slim bar */
.reel-dot {
  position: relative;
  width: 2rem;
  height: 1.5rem;
}

.reel-dot::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 3px;
  margin-top: -1.5px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.35);
  transition: background-color 0.25s ease;
}

.reel-dot:hover::before {
  background: rgba(148, 163, 184, 0.7);
}

.reel-dot.is-current::before {
  background: #22d3ee;
}
</style>
