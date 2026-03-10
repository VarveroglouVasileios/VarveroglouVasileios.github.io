<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'

interface NavItem {
  label: string
  to: RouteLocationRaw
  isActive: () => boolean
}

const route = useRoute()
const progress = ref<number>(0)
const activeSection = ref<string>('hero')
const isMenuOpen = ref<boolean>(false)
const sectionIds: string[] = ['hero', 'about', 'projects', 'experience', 'contact']

const navItems: NavItem[] = [
  {
    label: 'Home',
    to: '/',
    isActive: () => route.path === '/' && activeSection.value === 'hero',
  },
  {
    label: 'Work',
    to: { path: '/', hash: '#projects' },
    isActive: () => route.path === '/' && activeSection.value === 'projects',
  },
  {
    label: 'Experience',
    to: { path: '/', hash: '#experience' },
    isActive: () => route.path === '/' && activeSection.value === 'experience',
  },
  {
    label: 'Contact',
    to: { path: '/', hash: '#contact' },
    isActive: () => route.path === '/' && activeSection.value === 'contact',
  },
]

const isHome = computed(() => route.path === '/')

const updateProgress = (): void => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  if (docHeight <= 0) {
    progress.value = 0
    return
  }
  progress.value = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))

  if (route.path !== '/') {
    return
  }

  const navOffset = window.innerWidth < 640 ? 165 : 130
  let closestSection = sectionIds[0]
  let closestDistance = Number.POSITIVE_INFINITY

  sectionIds.forEach((sectionId) => {
    const element = document.getElementById(sectionId)
    if (!element) {
      return
    }
    const rect = element.getBoundingClientRect()
    const distance = Math.abs(rect.top - navOffset)
    if (distance < closestDistance) {
      closestDistance = distance
      closestSection = sectionId
    }
  })

  activeSection.value = closestSection
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
    updateProgress()
  },
)
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-[9999] isolate px-3 pt-3 sm:px-4 sm:pt-4 md:px-6">
    <div class="mx-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-slate-950 px-3 py-3 shadow-xl shadow-black/40 backdrop-blur-xl sm:px-4">
      <div class="flex items-center justify-between gap-3">
        <RouterLink to="/" class="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 sm:text-sm">
          OrbitFolio
        </RouterLink>

        <button
          type="button"
          class="inline-flex items-center justify-center rounded-lg border border-white/15 bg-slate-800/60 px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-slate-200 sm:hidden"
          @click="isMenuOpen = !isMenuOpen"
        >
          {{ isMenuOpen ? 'Close' : 'Menu' }}
        </button>

        <nav class="hidden items-center gap-2 sm:flex">
          <RouterLink
            v-for="item in navItems"
            :key="item.label"
            :to="item.to"
            class="whitespace-nowrap rounded-full border px-3 py-2 text-[11px] uppercase tracking-[0.14em] transition sm:px-4 sm:text-xs"
            :class="item.isActive()
              ? 'border-cyan-300/60 bg-cyan-400/15 text-cyan-200'
              : 'border-white/15 text-slate-300 hover:border-cyan-300/45 hover:text-cyan-200'"
          >
            {{ item.label }}
          </RouterLink>
          <a
            href="/VarveroglouCV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="VarveroglouCV.pdf"
            class="whitespace-nowrap rounded-full border border-emerald-400/50 px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-emerald-300 transition hover:border-emerald-300/70 hover:bg-emerald-400/15 hover:text-emerald-200 sm:px-4 sm:text-xs"
          >
            Download CV
          </a>
          <RouterLink
            v-if="!isHome"
            to="/"
            class="whitespace-nowrap rounded-full border border-white/15 px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-slate-300 transition hover:border-cyan-300/45 hover:text-cyan-200 sm:px-4 sm:text-xs"
          >
            Back Home
          </RouterLink>
        </nav>
      </div>

      <nav v-if="isMenuOpen" class="mt-3 grid gap-2 sm:hidden">
        <a
          href="/VarveroglouCV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download="VarveroglouCV.pdf"
          class="rounded-xl border border-emerald-400/50 px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-emerald-300"
        >
          Download CV
        </a>
        <RouterLink
          v-for="item in navItems"
          :key="`mobile-${item.label}`"
          :to="item.to"
          class="rounded-xl border px-3 py-2 text-[11px] uppercase tracking-[0.14em] transition"
          :class="item.isActive()
            ? 'border-cyan-300/60 bg-cyan-400/15 text-cyan-200'
            : 'border-white/15 text-slate-300 hover:border-cyan-300/45 hover:text-cyan-200'"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          class="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-[width] duration-150"
          :style="{ width: `${progress}%` }"
        />
      </div>
    </div>
  </header>
</template>
