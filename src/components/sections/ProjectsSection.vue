<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectStage from '@/components/showcase/ProjectStage.vue'
import type { FrameMode } from '@/components/showcase/BrowserFrame.vue'
import { projects } from '@/data/portfolio'
import { caseStudies } from '@/data/caseStudies'
import { useLocalePath } from '@/composables/useLocalePath'
import type { Project } from '@/types/portfolio'

gsap.registerPlugin(ScrollTrigger)

defineProps<{ hideHeading?: boolean }>()

const { t } = useI18n()
const { to } = useLocalePath()

// Project id → i18n key for the translated title and description.
const I18N_KEYS: Record<number, string> = {
  6: 'tavernademo',
  5: 'thasoshotel',
  4: 'shadowfirewall',
  3: 'vibebites',
  2: 'shadowai',
}

interface ShowcaseItem extends Project {
  kindLabel: string
}

const items = computed<ShowcaseItem[]>(() =>
  projects.map((project) => {
    const key = I18N_KEYS[project.id]
    const kind = caseStudies.find((study) => study.projectId === project.id)?.kind
    return {
      ...project,
      title: key ? t(`projects.items.${key}.title`) : project.title,
      description: key ? t(`projects.items.${key}.description`) : project.description,
      kindLabel:
        kind === 'demo' ? t('projectsPage.demoConcept') : kind === 'own-product' ? t('projectsPage.ownProduct') : '',
    }
  }),
)

const activeId = ref<number>(projects[0]?.id ?? 0)
const activeItem = computed(() => items.value.find((item) => item.id === activeId.value) ?? items.value[0])

/** While someone is using the live site or reading the breakdown, scrolling must not swap the project. */
const stageMode = ref<FrameMode>('preview')
const locked = computed(() => stageMode.value !== 'preview')

const isDesktop = ref(false)
const sectionRoot = ref<HTMLElement | null>(null)
const stageShell = ref<HTMLElement | null>(null)
const rowElements = new Map<number, HTMLElement>()
let mediaQuery: MediaQueryList | undefined
let frame = 0
let scrollContext: gsap.Context | undefined
let swapTween: gsap.core.Tween | undefined

const prefersReducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const setRowRef = (id: number, element: unknown): void => {
  if (element instanceof HTMLElement) rowElements.set(id, element)
  else rowElements.delete(id)
}

/** Keep one mounted stage (sticky-safe) and play a clear fade/slide on each change. */
const playStageSwap = (): void => {
  const el = stageShell.value
  if (!el || prefersReducedMotion()) return
  swapTween?.kill()
  swapTween = gsap.fromTo(
    el,
    { opacity: 0, y: 24, scale: 0.985 },
    { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', overwrite: true },
  )
}

const setActive = (id: number): void => {
  if (activeId.value === id) return
  activeId.value = id
  // Wait for ProjectStage / BrowserFrame to patch the new preview, then animate.
  nextTick(() => playStageSwap())
}

const select = (id: number): void => {
  stageMode.value = 'preview'
  setActive(id)
}

const hover = (id: number): void => {
  if (isDesktop.value && !locked.value) setActive(id)
}

/** The row closest to the reading line becomes the one on stage. */
const syncToScroll = (): void => {
  frame = 0
  if (!isDesktop.value || locked.value) return
  const line = window.innerHeight * 0.42
  let bestId = activeId.value
  let bestDistance = Number.POSITIVE_INFINITY
  rowElements.forEach((element, id) => {
    const rect = element.getBoundingClientRect()
    if (rect.bottom < 0 || rect.top > window.innerHeight) return
    const distance = Math.abs(rect.top + rect.height / 2 - line)
    if (distance < bestDistance) {
      bestDistance = distance
      bestId = id
    }
  })
  setActive(bestId)
}

const onScroll = (): void => {
  if (!frame) frame = requestAnimationFrame(syncToScroll)
}

const onMediaChange = (event: MediaQueryListEvent): void => {
  isDesktop.value = event.matches
}

/** Fade/slide project rows in as they enter the viewport while scrolling. */
const setupRowReveals = (): void => {
  scrollContext?.revert()
  scrollContext = undefined
  if (prefersReducedMotion() || !sectionRoot.value) return

  scrollContext = gsap.context(() => {
    const rows = gsap.utils.toArray<HTMLElement>('.project-row')
    rows.forEach((row) => {
      gsap.fromTo(
        row,
        { opacity: 0.4, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    })
  }, sectionRoot.value)
}

onMounted(() => {
  mediaQuery = window.matchMedia('(min-width: 1024px)')
  isDesktop.value = mediaQuery.matches
  mediaQuery.addEventListener('change', onMediaChange)
  window.addEventListener('scroll', onScroll, { passive: true })
  nextTick(() => {
    setupRowReveals()
    ScrollTrigger.refresh()
  })
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', onMediaChange)
  window.removeEventListener('scroll', onScroll)
  if (frame) cancelAnimationFrame(frame)
  swapTween?.kill()
  scrollContext?.revert()
})

watch(isDesktop, () => {
  nextTick(() => {
    setupRowReveals()
    ScrollTrigger.refresh()
  })
})
</script>

<template>
  <section
    id="projects"
    ref="sectionRoot"
    class="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28"
  >
    <div v-if="!hideHeading" class="mb-12 max-w-2xl">
      <h2 class="section-title" data-reveal>{{ t('projects.title') }}</h2>
      <p class="mt-4 text-base text-slate-300 sm:text-lg" data-reveal>{{ t('projectsPage.lead') }}</p>
    </div>

    <!-- Shared stage on mobile/tablet -->
    <div v-if="!isDesktop && activeItem" class="mb-8">
      <div ref="stageShell" class="project-stage-shell">
        <ProjectStage :project="activeItem" compact @mode="stageMode = $event" />
      </div>
    </div>

    <!--
      Do not put overflow-hidden on the stage column: it becomes a scrollport and
      breaks position:sticky. Also keep a single mounted stage (no out-in Transition)
      so sticky height never collapses during swaps.
    -->
    <div class="lg:grid lg:grid-cols-12 lg:gap-12">
      <ol class="min-w-0 lg:col-span-5">
        <li
          v-for="item in items"
          :key="item.id"
          :ref="(element) => setRowRef(item.id, element)"
          class="project-row relative border-t border-white/10 py-8 last:border-b lg:py-10 lg:pl-6"
          :class="{ 'is-active': item.id === activeId }"
          @pointerenter="hover(item.id)"
        >
          <span class="project-row__marker" aria-hidden="true" />

          <p v-if="item.kindLabel" class="mb-2 text-sm text-cyan-300">{{ item.kindLabel }}</p>
          <h3 class="text-2xl font-semibold tracking-tight sm:text-3xl">
            <button
              type="button"
              class="project-row__title clickable text-left"
              :aria-pressed="item.id === activeId"
              :aria-label="t('showcase.select', { title: item.title })"
              @click="select(item.id)"
              @focus="hover(item.id)"
            >
              {{ item.title }}
            </button>
          </h3>
          <p class="mt-3 max-w-prose break-words text-[0.95rem] leading-relaxed text-slate-400">
            {{ item.description }}
          </p>
          <p class="mt-3 break-words text-sm text-slate-500">{{ item.stack.join(', ') }}</p>

          <div class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium">
            <router-link
              v-if="item.slug"
              :to="to('project', { slug: item.slug })"
              class="clickable rounded-full border border-cyan-300/50 px-4 py-2 text-cyan-200 transition hover:bg-cyan-400/15"
            >
              {{ t('projectsPage.readCase') }}
            </router-link>
            <a
              :href="item.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="row-link clickable text-slate-200"
            >
              {{ item.liveLabelKey ? t(item.liveLabelKey) : t('projects.live') }}
            </a>
            <a
              :href="item.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="row-link clickable text-slate-400"
            >
              {{ t('projects.github') }}
            </a>
          </div>
        </li>
      </ol>

      <div v-if="isDesktop && activeItem" class="min-w-0 lg:col-span-7">
        <div class="sticky top-28 z-[1]">
          <div ref="stageShell" class="project-stage-shell">
            <ProjectStage :project="activeItem" @mode="stageMode = $event" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-stage-shell {
  width: 100%;
  will-change: transform, opacity;
  transform-origin: center top;
}

.project-row__marker {
  position: absolute;
  left: 0;
  top: 2.5rem;
  bottom: 2.5rem;
  width: 2px;
  background: #22d3ee;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.project-row.is-active .project-row__marker {
  transform: scaleY(1);
}

@media (max-width: 1023px) {
  .project-row__marker {
    display: none;
  }
}

.project-row__title {
  color: #94a3b8;
  transition:
    color 0.3s ease,
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.project-row.is-active .project-row__title {
  color: #fff;
  transform: translateX(6px);
}

.project-row__title:hover {
  color: #fff;
}

.row-link {
  text-decoration: underline;
  text-decoration-color: rgba(148, 163, 184, 0.4);
  text-underline-offset: 0.3em;
  transition:
    color 0.2s ease,
    text-decoration-color 0.2s ease;
}

.row-link:hover {
  color: #67e8f9;
  text-decoration-color: currentColor;
}

@media (prefers-reduced-motion: reduce) {
  .project-row__marker,
  .project-row__title {
    transition: none;
  }

  .project-row.is-active .project-row__title {
    transform: none;
  }
}
</style>
