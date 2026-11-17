<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ProjectStage from '@/components/showcase/ProjectStage.vue'
import type { FrameMode } from '@/components/showcase/BrowserFrame.vue'
import { projects } from '@/data/portfolio'
import { caseStudies } from '@/data/caseStudies'
import { useLocalePath } from '@/composables/useLocalePath'
import type { Project } from '@/types/portfolio'

defineProps<{ hideHeading?: boolean }>()

const { t } = useI18n()
const { to } = useLocalePath()

// Project id → i18n key for the translated title and description.
const I18N_KEYS: Record<number, string> = {
  10: 'rentaldemo',
  9: 'salondemo',
  8: 'shopdemo',
  7: 'cafedemo',
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
const rowElements = new Map<number, HTMLElement>()
let mediaQuery: MediaQueryList | undefined
let frame = 0

const setRowRef = (id: number, element: unknown): void => {
  if (element instanceof HTMLElement) rowElements.set(id, element)
  else rowElements.delete(id)
}

const select = (id: number): void => {
  stageMode.value = 'preview'
  activeId.value = id
}

const hover = (id: number): void => {
  if (isDesktop.value && !locked.value) activeId.value = id
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
  activeId.value = bestId
}

const onScroll = (): void => {
  if (!frame) frame = requestAnimationFrame(syncToScroll)
}

const onMediaChange = (event: MediaQueryListEvent): void => {
  isDesktop.value = event.matches
}

onMounted(() => {
  mediaQuery = window.matchMedia('(min-width: 1024px)')
  isDesktop.value = mediaQuery.matches
  mediaQuery.addEventListener('change', onMediaChange)
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener('change', onMediaChange)
  window.removeEventListener('scroll', onScroll)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <section id="projects" class="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 md:py-28">
    <div v-if="!hideHeading" class="mb-12 max-w-2xl">
      <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">{{ t('projects.title') }}</h2>
      <p class="mt-4 text-base text-slate-300 sm:text-lg">{{ t('projectsPage.lead') }}</p>
    </div>

    <div class="lg:grid lg:grid-cols-12 lg:gap-12">
      <!-- Project list -->
      <ol class="min-w-0 lg:col-span-5">
        <li
          v-for="item in items"
          :key="item.id"
          :ref="(element) => setRowRef(item.id, element)"
          class="project-row relative border-t border-white/10 py-8 last:border-b lg:py-10 lg:pl-6"
          :class="{ 'is-active': isDesktop && item.id === activeId }"
          @pointerenter="hover(item.id)"
        >
          <span class="project-row__marker" aria-hidden="true" />

          <!-- On small screens every project carries its own stage -->
          <ProjectStage v-if="!isDesktop" :project="item" compact class="mb-6" />

          <p v-if="item.kindLabel" class="mb-2 text-sm text-cyan-300">{{ item.kindLabel }}</p>
          <h3 class="text-2xl font-semibold tracking-tight sm:text-3xl">
            <button
              v-if="isDesktop"
              type="button"
              class="project-row__title clickable text-left"
              :aria-pressed="item.id === activeId"
              :aria-label="t('showcase.select', { title: item.title })"
              @click="select(item.id)"
              @focus="hover(item.id)"
            >
              {{ item.title }}
            </button>
            <span v-else class="text-white">{{ item.title }}</span>
          </h3>
          <p class="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-slate-400">{{ item.description }}</p>
          <p class="mt-3 text-sm text-slate-500">{{ item.stack.join(', ') }}</p>

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

      <!-- Stage: follows the active project while the list scrolls -->
      <div v-if="isDesktop && activeItem" class="min-w-0 lg:col-span-7">
        <div class="sticky top-28">
          <ProjectStage :project="activeItem" @mode="stageMode = $event" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-row__marker {
  position: absolute;
  left: 0;
  top: 2.5rem;
  bottom: 2.5rem;
  width: 2px;
  background: #22d3ee;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.project-row.is-active .project-row__marker {
  transform: scaleY(1);
}

.project-row__title {
  color: #94a3b8;
  transition: color 0.25s ease;
}

.project-row.is-active .project-row__title,
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
}
</style>
