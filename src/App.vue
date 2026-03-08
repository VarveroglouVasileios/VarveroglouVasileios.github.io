<script setup lang="ts">
import { computed, ref } from 'vue'
import BabylonScene from './components/BabylonScene.vue'
import { PORTFOLIO_PROJECTS, type PortfolioProject, type ProjectId } from './data/projects'

type BabylonSceneExposed = {
  resetCamera: () => void
}

const sceneRef = ref<BabylonSceneExposed | null>(null)
const selectedProjectId = ref<ProjectId | null>(null)
const nearbyProjectId = ref<ProjectId | null>(null)
const lockedNearbyProjectId = ref<ProjectId | null>(null)
const visitedProjects = ref(0)
const totalProjects = ref(PORTFOLIO_PROJECTS.length)
const playerPosition = ref({ x: 0, z: 0 })
const audioLevel = ref(0)
const audioBooted = ref(false)

const selectedProject = computed<PortfolioProject | null>(() =>
  PORTFOLIO_PROJECTS.find((project) => project.id === selectedProjectId.value) ?? null,
)

const nearbyProject = computed<PortfolioProject | null>(() =>
  PORTFOLIO_PROJECTS.find((project) => project.id === nearbyProjectId.value) ?? null,
)
const lockedNearbyProject = computed<PortfolioProject | null>(() =>
  PORTFOLIO_PROJECTS.find((project) => project.id === lockedNearbyProjectId.value) ?? null,
)

const progressPercent = computed(() => Math.round((visitedProjects.value / totalProjects.value) * 100))
const chapterStatus = computed(() => {
  if (visitedProjects.value === totalProjects.value && totalProjects.value > 0) return 'Archive Synced'
  if (visitedProjects.value > 0) return 'Exploration Active'
  return 'Boot Sequence'
})
const worldRadius = 70
const minimapSize = 184

const radarProjects = computed(() =>
  PORTFOLIO_PROJECTS.map((project) => {
    const normalizedX = ((project.position[0] / worldRadius) * 0.5 + 0.5) * minimapSize
    const normalizedZ = ((project.position[2] / worldRadius) * 0.5 + 0.5) * minimapSize
    return {
      id: project.id,
      title: project.title,
      accentHex: project.accentHex,
      x: normalizedX,
      y: minimapSize - normalizedZ,
    }
  }),
)

const radarPlayer = computed(() => {
  const normalizedX = ((playerPosition.value.x / worldRadius) * 0.5 + 0.5) * minimapSize
  const normalizedZ = ((playerPosition.value.z / worldRadius) * 0.5 + 0.5) * minimapSize
  return {
    x: normalizedX,
    y: minimapSize - normalizedZ,
  }
})

const objectives = computed(() => [
  {
    id: 'first-scan',
    label: 'Scan first terminal',
    done: visitedProjects.value > 0,
  },
  {
    id: 'boot-ambience',
    label: 'Initialize ambient systems',
    done: audioBooted.value,
  },
  {
    id: 'unlock-chain',
    label: 'Unlock next sector',
    done: visitedProjects.value > 1,
  },
  {
    id: 'open-capsule',
    label: 'Open a project capsule',
    done: Boolean(selectedProject.value),
  },
  {
    id: 'full-map',
    label: 'Map all orbital sectors',
    done: visitedProjects.value === totalProjects.value && totalProjects.value > 0,
  },
])

const handleProjectFocused = (projectId: ProjectId) => {
  selectedProjectId.value = projectId
}

const handleNearbyProject = (projectId: ProjectId | null) => {
  nearbyProjectId.value = projectId
}

const handleLockedNearbyProject = (projectId: ProjectId | null) => {
  lockedNearbyProjectId.value = projectId
}

const handleProgressUpdate = (payload: { visited: number; total: number }) => {
  visitedProjects.value = payload.visited
  totalProjects.value = payload.total
}

const handlePlayerPosition = (payload: { x: number; z: number }) => {
  playerPosition.value = payload
}

const handleAudioLevel = (payload: number) => {
  audioLevel.value = payload
}

const handleAudioBooted = (payload: boolean) => {
  audioBooted.value = payload
}

const returnToExhibition = () => {
  selectedProjectId.value = null
  sceneRef.value?.resetCamera()
}
</script>

<template>
  <main class="relative h-screen w-screen overflow-hidden bg-[#070810] text-slate-100">
    <BabylonScene
      ref="sceneRef"
      :project-open="Boolean(selectedProject)"
      @project-focused="handleProjectFocused"
      @project-nearby="handleNearbyProject"
      @project-locked-nearby="handleLockedNearbyProject"
      @progress-updated="handleProgressUpdate"
      @player-position="handlePlayerPosition"
      @audio-level="handleAudioLevel"
      @audio-booted="handleAudioBooted"
    />

    <section class="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-10">
      <div class="flex items-start justify-between gap-4">
        <header
          class="inline-flex w-fit flex-col gap-1 rounded-2xl border border-cyan-200/20 bg-[#060a12]/55 px-5 py-4 backdrop-blur-xl"
        >
          <p class="text-xs uppercase tracking-[0.24em] text-cyan-100/80">Orbital Archive // Phase One</p>
          <h1 class="text-xl font-semibold md:text-2xl">Interactive Developer World</h1>
          <p class="max-w-md text-sm text-slate-300/80">
            Move with WASD. Approach a live sector terminal and press <span class="text-cyan-200">E</span> to inspect.
          </p>
          <p class="mt-2 text-xs uppercase tracking-[0.2em] text-cyan-300/80">{{ chapterStatus }}</p>
        </header>

        <aside
          class="pointer-events-auto hidden min-w-[260px] rounded-2xl border border-white/15 bg-slate-950/45 px-4 py-3 backdrop-blur-2xl md:block"
        >
          <p class="text-[11px] uppercase tracking-[0.2em] text-slate-300/70">Navigator</p>
          <p class="mt-1 text-sm text-slate-100">X {{ playerPosition.x.toFixed(1) }} | Z {{ playerPosition.z.toFixed(1) }}</p>
          <div class="mt-3 h-2 w-full rounded-full bg-white/10">
            <div class="h-2 rounded-full bg-cyan-300/85" :style="{ width: `${progressPercent}%` }" />
          </div>
          <p class="mt-2 text-xs text-slate-300/80">
            Progress {{ visitedProjects }}/{{ totalProjects }} sectors
          </p>

          <div class="relative mt-4 h-[184px] w-[184px] rounded-full border border-cyan-200/20 bg-slate-950/70">
            <div class="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cyan-100/10" />
            <div class="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyan-100/10" />
            <div
              v-for="project in radarProjects"
              :key="project.id"
              class="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40"
              :style="{ left: `${project.x}px`, top: `${project.y}px`, backgroundColor: project.accentHex }"
              :title="project.title"
            />
            <div
              class="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.8)]"
              :style="{ left: `${radarPlayer.x}px`, top: `${radarPlayer.y}px` }"
            />
          </div>
          <p class="mt-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">Tactical Radar</p>
          <div class="mt-3">
            <p class="text-[11px] uppercase tracking-[0.2em] text-slate-400">Ambient Signal</p>
            <div class="mt-1 h-2 w-full rounded-full bg-white/10">
              <div class="h-2 rounded-full bg-violet-300/85 transition-all" :style="{ width: `${Math.round(audioLevel * 100)}%` }" />
            </div>
          </div>
        </aside>
      </div>

      <div class="pointer-events-auto flex flex-col items-start gap-3">
        <div class="rounded-2xl border border-white/15 bg-slate-900/50 px-4 py-3 backdrop-blur-xl">
          <p class="text-[11px] uppercase tracking-[0.2em] text-cyan-100/75">Mission Objectives</p>
          <p
            v-for="objective in objectives"
            :key="objective.id"
            class="mt-1 text-xs"
            :class="objective.done ? 'text-emerald-300/85' : 'text-slate-300/80'"
          >
            {{ objective.done ? '●' : '○' }} {{ objective.label }}
          </p>
        </div>

        <div
          v-if="nearbyProject && !selectedProject"
          class="rounded-2xl border border-cyan-200/20 bg-[#03050d]/70 px-4 py-3 backdrop-blur-xl"
        >
          <p class="text-[11px] uppercase tracking-[0.2em] text-cyan-200/80">Terminal in Range</p>
          <p class="mt-1 text-sm text-slate-100">{{ nearbyProject.title }} // {{ nearbyProject.sector }}</p>
          <p class="text-xs text-slate-300/80">Press E to open project capsule</p>
        </div>
        <div
          v-if="lockedNearbyProject && !selectedProject && !nearbyProject"
          class="rounded-2xl border border-rose-300/20 bg-rose-950/35 px-4 py-3 backdrop-blur-xl"
        >
          <p class="text-[11px] uppercase tracking-[0.2em] text-rose-200/80">Terminal Locked</p>
          <p class="mt-1 text-sm text-rose-50">{{ lockedNearbyProject.title }}</p>
          <p class="text-xs text-rose-100/80">Complete earlier sectors to unlock this archive.</p>
        </div>

        <div
          v-if="selectedProject"
          class="w-full max-w-xl rounded-2xl border border-cyan-200/20 bg-slate-900/55 p-6 shadow-[0_20px_60px_rgba(6,9,18,0.7)] backdrop-blur-2xl"
        >
          <p class="mb-1 text-xs uppercase tracking-[0.24em] text-cyan-200/80">Project Capsule</p>
          <h2 class="text-2xl font-semibold text-white">{{ selectedProject.title }}</h2>
          <p class="mt-1 text-sm text-cyan-100/85">{{ selectedProject.sector }}</p>
          <p class="mt-2 text-sm text-slate-200/90">{{ selectedProject.tagline }}</p>
          <p class="mt-4 text-sm leading-relaxed text-slate-300/90">{{ selectedProject.description }}</p>

          <p class="mt-4 text-xs uppercase tracking-[0.2em] text-slate-400">Impact</p>
          <p class="mt-1 text-sm text-slate-200">{{ selectedProject.impact }}</p>

          <p class="mt-4 text-xs uppercase tracking-[0.2em] text-slate-400">Stack</p>
          <p class="mt-1 text-sm text-slate-200">{{ selectedProject.stack.join(' • ') }}</p>

          <button
            type="button"
            class="mt-6 rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            @click="returnToExhibition"
          >
            Back to Exhibition
          </button>
        </div>
      </div>
    </section>
  </main>
</template>
