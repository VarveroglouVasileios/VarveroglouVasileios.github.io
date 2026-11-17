<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '@/data/portfolio'

gsap.registerPlugin(ScrollTrigger)

const { t } = useI18n()
const listRef = ref<HTMLElement | null>(null)
const progressRef = ref<HTMLElement | null>(null)
/** Entries the scroll line has already reached. */
const reached = ref<Set<number>>(new Set())
let context: gsap.Context | undefined

const I18N_KEYS: Record<number, string> = { 4: 'bsc', 3: 'junior', 2: 'fullstack', 5: 'structwise', 1: 'msc' }

const entry = (id: number) => {
  const key = I18N_KEYS[id]
  return {
    title: t(`experience.items.${key}.title`),
    organization: t(`experience.items.${key}.org`),
    description: t(`experience.items.${key}.desc`),
  }
}

const setReached = (id: number, value: boolean): void => {
  const next = new Set(reached.value)
  if (value) next.add(id)
  else next.delete(id)
  reached.value = next
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reached.value = new Set(experience.map((item) => item.id))
    if (progressRef.value) progressRef.value.style.transform = 'scaleY(1)'
    return
  }

  nextTick(() => {
    context = gsap.context(() => {
      const list = listRef.value
      if (!list || !progressRef.value) return

      // The line is drawn by scrolling; each entry lights up as the line reaches it.
      gsap.fromTo(
        progressRef.value,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: list, start: 'top 62%', end: 'bottom 62%', scrub: 0.4 },
        },
      )

      list.querySelectorAll<HTMLElement>('[data-entry]').forEach((element) => {
        const id = Number(element.dataset.entry)
        ScrollTrigger.create({
          trigger: element,
          start: 'top 62%',
          onEnter: () => setReached(id, true),
          onLeaveBack: () => setReached(id, false),
        })
      })
    }, listRef.value || undefined)
  })
})

onBeforeUnmount(() => {
  context?.revert()
})
</script>

<template>
  <section id="experience" class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28">
    <h2 class="section-title mb-14" data-reveal>{{ t('experience.title') }}</h2>

    <ol ref="listRef" class="timeline relative max-w-4xl">
      <li class="timeline__rail" aria-hidden="true">
        <span ref="progressRef" class="timeline__progress" />
      </li>

      <li
        v-for="item in experience"
        :key="item.id"
        :data-entry="item.id"
        class="timeline__entry relative pb-12 pl-8 last:pb-0 lg:grid lg:grid-cols-[minmax(9rem,13rem)_1fr] lg:pl-0"
        :class="{ 'is-reached': reached.has(item.id) }"
      >
        <span class="timeline__dot" aria-hidden="true" />
        <p class="mb-2 text-sm text-slate-400 lg:mb-0 lg:pr-10 lg:pt-1 lg:text-right">{{ item.period }}</p>
        <div class="lg:pl-10">
          <h3 class="timeline__title text-xl font-semibold tracking-tight lg:text-2xl">{{ entry(item.id).title }}</h3>
          <p class="mt-1 text-base text-cyan-300">{{ entry(item.id).organization }}</p>
          <p class="mt-3 max-w-prose leading-relaxed text-slate-400">{{ entry(item.id).description }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.timeline {
  --rail-x: 0px;
}

@media (min-width: 1024px) {
  .timeline {
    --rail-x: 13rem;
  }
}

.timeline__rail {
  position: absolute;
  top: 0.5rem;
  bottom: 0;
  left: var(--rail-x);
  width: 1px;
  background: rgba(255, 255, 255, 0.12);
}

.timeline__progress {
  position: absolute;
  inset: 0;
  width: 2px;
  margin-left: -0.5px;
  background: #22d3ee;
  transform: scaleY(0);
  transform-origin: top;
}

.timeline__dot {
  position: absolute;
  top: 0.5rem;
  left: var(--rail-x);
  width: 0.75rem;
  height: 0.75rem;
  margin-left: -0.375rem;
  border-radius: 999px;
  border: 2px solid #475569;
  background: #020617;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease,
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.timeline__entry.is-reached .timeline__dot {
  border-color: #22d3ee;
  background: #22d3ee;
  transform: scale(1.25);
}

.timeline__title {
  color: #94a3b8;
  transition: color 0.3s ease;
}

.timeline__entry.is-reached .timeline__title {
  color: #fff;
}
</style>
