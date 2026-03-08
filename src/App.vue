<script setup lang="ts">
/**
 * App.vue
 * ────────────────────────────────────────────────────────────────────────────
 * Root component. Strictly separates the 3D canvas from the HTML UI layer.
 *
 * Layout:
 *  ┌──────────────────────────────────────────┐
 *  │  <TresCanvas>  (full-viewport, z-index 0) │
 *  │    └── <Experience> (3D scene)            │
 *  ├──────────────────────────────────────────┤
 *  │  <header>  (HTML overlay, pointer-events:none except buttons)
 *  │  <DetailOverlay> (card detail panel, fades in on card click)
 *  └──────────────────────────────────────────┘
 *
 * The TresCanvas uses `window-size` so it fills the viewport and reacts to
 * window resize events automatically.
 */
import { ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { useSceneStore } from './stores/sceneStore'
import { isProject } from './types'
import Experience from './components/Experience.vue'

// ── Store ───────────────────────────────────────────────────────────────────
const sceneStore = useSceneStore()

// ── Experience ref (to call resetCamera) ───────────────────────────────────
const experienceRef = ref<InstanceType<typeof Experience> | null>(null)

// ── Overlay close handler ───────────────────────────────────────────────────
function handleClose() {
  sceneStore.closeItem()
  // Reset camera back to default position
  experienceRef.value?.resetCamera()
}
</script>

<template>
  <div class="relative w-full h-full overflow-hidden bg-[#03010a]">

    <!-- ── 3D Canvas ──────────────────────────────────────────────────────── -->
    <!-- window-size  → canvas fills the full viewport and auto-resizes     -->
    <!-- alpha        → transparent background so CSS bg shows through      -->
    <!-- shadows      → enable shadow maps                                  -->
    <TresCanvas
      window-size
      alpha
      shadows
      class="absolute inset-0"
    >
      <Suspense>
        <Experience ref="experienceRef" />
      </Suspense>
    </TresCanvas>

    <!-- ── HTML overlay layer (pointer-events disabled by default) ─────── -->
    <div class="absolute inset-0 pointer-events-none z-10">

      <!-- Header / hero text -->
      <header class="flex flex-col items-center pt-10 gap-2 pointer-events-none">
        <h1
          class="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_0_24px_rgba(139,92,246,0.7)]"
        >
          Orbit<span class="text-violet-400">Folio</span>
        </h1>
        <p class="text-slate-400 text-sm md:text-base">
          Hover · Click · Explore
        </p>
      </header>

      <!-- Scroll hint at the bottom -->
      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50"
      >
        <svg
          class="w-5 h-5 text-slate-400 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <span class="text-slate-500 text-xs">Scroll to rotate</span>
      </div>
    </div>

    <!-- ── Detail overlay (glassmorphic panel) ────────────────────────── -->
    <Transition name="overlay-fade">
      <div
        v-if="sceneStore.overlayVisible && sceneStore.activeItem"
        class="absolute inset-0 z-20 flex items-center justify-center p-4"
      >
        <!-- Backdrop blur -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="handleClose"
        />

        <!-- Panel -->
        <div
          class="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl text-white"
        >
          <!-- Close button -->
          <button
            class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            @click="handleClose"
            aria-label="Close"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- ── Project card content ───────────────────────────────────── -->
          <template v-if="isProject(sceneStore.activeItem)">
            <h2 class="text-2xl font-bold mb-2">
              {{ sceneStore.activeItem.title }}
            </h2>
            <p class="text-slate-300 mb-5 leading-relaxed">
              {{ sceneStore.activeItem.description }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="tag in sceneStore.activeItem.tags"
                :key="tag"
                class="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/20 text-violet-300 border border-violet-500/30"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Action buttons -->
            <div class="flex gap-3">
              <a
                v-if="sceneStore.activeItem.liveUrl"
                :href="sceneStore.activeItem.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 text-center px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors pointer-events-auto"
              >
                Live Demo →
              </a>
              <a
                v-if="sceneStore.activeItem.repoUrl"
                :href="sceneStore.activeItem.repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex-1 text-center px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors pointer-events-auto"
              >
                GitHub ↗
              </a>
            </div>
          </template>

          <!-- ── Social link card content ──────────────────────────────── -->
          <template v-else>
            <div class="flex items-center gap-4 mb-4">
              <!-- SVG icon -->
              <div
                class="w-14 h-14 rounded-2xl flex items-center justify-center"
                :style="{ backgroundColor: sceneStore.activeItem.color + '22' }"
              >
                <svg
                  class="w-8 h-8"
                  :style="{ color: sceneStore.activeItem.color }"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path :d="(sceneStore.activeItem as { icon: string }).icon" />
                </svg>
              </div>
              <h2 class="text-2xl font-bold">
                {{ (sceneStore.activeItem as { label: string }).label }}
              </h2>
            </div>
            <a
              :href="(sceneStore.activeItem as { url: string }).url"
              target="_blank"
              rel="noopener noreferrer"
              class="block text-center px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors pointer-events-auto"
            >
              Visit Profile ↗
            </a>
          </template>
        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
/* Overlay fade transition */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}
</style>
