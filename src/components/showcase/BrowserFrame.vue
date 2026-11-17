<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

export type FrameMode = 'preview' | 'live' | 'how'
export type FrameDevice = 'desktop' | 'mobile'

const props = withDefaults(
  defineProps<{
    title: string
    imageUrl?: string
    liveUrl: string
    mode?: FrameMode
    device?: FrameDevice
    /** Pointer-driven tilt and image parallax (preview mode, fine pointers only). */
    tilt?: boolean
    loadingLabel?: string
    openLabel?: string
    /** Load the preview image eagerly (above the fold). */
    eager?: boolean
    /** Sketch a wireframe of the page before each screenshot wipes in. */
    build?: boolean
  }>(),
  { mode: 'preview', device: 'desktop', tilt: true, loadingLabel: '', openLabel: '', eager: false, build: false },
)

const DESKTOP_WIDTH = 1280
const MOBILE_WIDTH = 390

const frameRef = ref<HTMLElement | null>(null)
const bodyRef = ref<HTMLElement | null>(null)
const bodyWidth = ref(0)
const bodyHeight = ref(0)
const iframeLoaded = ref(false)
const reloadKey = ref(0)

const displayUrl = computed(() => props.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, ''))

/** The live site is rendered at a real device width and scaled to fit the frame. */
const viewport = computed(() => {
  const virtualWidth = props.device === 'mobile' ? MOBILE_WIDTH : DESKTOP_WIDTH
  const scale = bodyWidth.value > 0 ? Math.min(1, bodyWidth.value / virtualWidth) : 1
  return {
    scale,
    width: virtualWidth,
    height: scale > 0 ? Math.round(bodyHeight.value / scale) : bodyHeight.value,
    offset: Math.max(0, (bodyWidth.value - virtualWidth * scale) / 2),
  }
})

let observer: ResizeObserver | undefined
let canTilt = false

// "Build" pass: wireframe first, then the finished page.
const BUILD_MS = 1500
const building = ref(false)
const buildRun = ref(0)
let buildTimer: number | undefined

const runBuild = (): void => {
  if (!props.build || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  window.clearTimeout(buildTimer)
  buildRun.value += 1
  building.value = true
  buildTimer = window.setTimeout(() => {
    building.value = false
  }, BUILD_MS)
}

onMounted(() => {
  // Tilt only on large, fine-pointer screens — small viewports clip / bleed with perspective.
  canTilt =
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    window.matchMedia('(min-width: 1024px)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (bodyRef.value) {
    observer = new ResizeObserver(([entry]) => {
      bodyWidth.value = entry.contentRect.width
      bodyHeight.value = entry.contentRect.height
    })
    observer.observe(bodyRef.value)
  }

  runBuild()
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.clearTimeout(buildTimer)
})

watch(() => props.imageUrl, runBuild, { flush: 'sync' })

watch(
  () => [props.liveUrl, props.mode, reloadKey.value],
  () => {
    iframeLoaded.value = false
  },
)

const setTilt = (x: number, y: number): void => {
  const el = frameRef.value
  if (!el) return
  el.style.setProperty('--tilt-x', `${(-y * 5).toFixed(2)}deg`)
  el.style.setProperty('--tilt-y', `${(x * 6).toFixed(2)}deg`)
  el.style.setProperty('--shift-x', `${(-x * 2.5).toFixed(2)}%`)
  el.style.setProperty('--shift-y', `${(-y * 2.5).toFixed(2)}%`)
}

const onPointerMove = (event: PointerEvent): void => {
  if (!canTilt || !props.tilt || props.mode !== 'preview' || !frameRef.value) return
  const rect = frameRef.value.getBoundingClientRect()
  setTilt((event.clientX - rect.left) / rect.width - 0.5, (event.clientY - rect.top) / rect.height - 0.5)
}

const resetTilt = (): void => setTilt(0, 0)

watch(
  () => props.mode,
  (mode) => {
    if (mode !== 'preview') resetTilt()
  },
)
</script>

<template>
  <div class="frame-perspective">
    <div
      ref="frameRef"
      class="frame overflow-hidden rounded-xl border border-white/15 bg-slate-900 shadow-[0_30px_80px_-30px_rgba(8,145,178,0.45)]"
      @pointermove="onPointerMove"
      @pointerleave="resetTilt"
    >
      <!-- Browser chrome -->
      <div class="flex items-center gap-3 border-b border-white/10 bg-slate-900 px-3 py-2.5">
        <div class="flex gap-1.5" aria-hidden="true">
          <span class="h-2.5 w-2.5 rounded-full bg-slate-700" />
          <span class="h-2.5 w-2.5 rounded-full bg-slate-700" />
          <span class="h-2.5 w-2.5 rounded-full bg-slate-700" />
        </div>
        <div class="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-slate-950/70 px-3 py-1 text-xs text-slate-400">
          <span
            class="h-1.5 w-1.5 shrink-0 rounded-full transition-colors"
            :class="mode === 'live' ? 'bg-emerald-400' : 'bg-slate-600'"
            aria-hidden="true"
          />
          <span class="truncate">{{ displayUrl }}</span>
        </div>
        <button
          v-if="mode === 'live'"
          type="button"
          class="clickable rounded-md p-1 text-slate-400 transition hover:text-white"
          aria-label="Reload"
          @click="reloadKey += 1"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 4v5h-5" /></svg>
        </button>
        <a
          :href="liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="clickable rounded-md p-1 text-slate-400 transition hover:text-white"
          :aria-label="openLabel || liveUrl"
          :title="openLabel"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6" /><path d="M20 4 10 14" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>
        </a>
      </div>

      <!-- Page area -->
      <div
        ref="bodyRef"
        class="frame-body relative overflow-hidden bg-slate-950"
        :class="[mode === 'live' && device === 'mobile' ? 'frame-body--phone' : '', building ? 'frame-body--build' : '']"
      >
        <!-- Wireframe sketch, drawn block by block -->
        <div v-if="building" :key="buildRun" class="skeleton" aria-hidden="true">
          <div class="skeleton__nav">
            <span class="sk" style="--i: 0; width: 12%" />
            <span class="sk ml-auto" style="--i: 1; width: 7%" />
            <span class="sk" style="--i: 2; width: 7%" />
            <span class="sk" style="--i: 3; width: 9%" />
          </div>
          <div class="skeleton__hero">
            <div class="skeleton__copy">
              <span class="sk sk--thick" style="--i: 4; width: 92%" />
              <span class="sk sk--thick" style="--i: 5; width: 68%" />
              <span class="sk" style="--i: 6; width: 80%" />
              <span class="sk" style="--i: 7; width: 58%" />
              <span class="sk sk--button" style="--i: 8" />
            </div>
            <span class="sk sk--box" style="--i: 6" />
          </div>
          <div class="skeleton__cards">
            <span class="sk sk--box" style="--i: 9" />
            <span class="sk sk--box" style="--i: 10" />
            <span class="sk sk--box" style="--i: 11" />
          </div>
        </div>

        <!-- Preview: screenshot with a wipe between projects -->
        <Transition name="wipe" :appear="build">
          <img
            v-if="imageUrl"
            :key="`${title}|${imageUrl}`"
            :src="imageUrl"
            :alt="title"
            :loading="eager ? 'eager' : 'lazy'"
            decoding="async"
            width="1920"
            height="1080"
            class="frame-shot absolute inset-0 h-full w-full object-cover object-top"
          />
        </Transition>

        <!-- Live: the real site, scaled to a real device width -->
        <div v-if="mode === 'live'" class="absolute inset-0 bg-slate-950">
          <div
            v-if="!iframeLoaded"
            class="absolute inset-0 z-10 flex items-center justify-center bg-slate-950 text-sm text-slate-400"
            role="status"
          >
            <span class="mr-3 h-4 w-4 animate-spin rounded-full border-2 border-slate-700 border-t-cyan-400" aria-hidden="true" />
            {{ loadingLabel }}
          </div>
          <iframe
            :key="`${liveUrl}|${reloadKey}`"
            :src="liveUrl"
            :title="title"
            class="absolute top-0 origin-top-left border-0 bg-white"
            :style="{
              left: `${viewport.offset}px`,
              width: `${viewport.width}px`,
              height: `${viewport.height}px`,
              transform: `scale(${viewport.scale})`,
            }"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            referrerpolicy="no-referrer"
            @load="iframeLoaded = true"
          />
        </div>

        <!-- How it was built -->
        <div v-else-if="mode === 'how'" class="absolute inset-0 overflow-y-auto bg-slate-950/95 p-5 sm:p-7">
          <slot name="how" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.frame-perspective {
  overflow: hidden;
  perspective: none;
}

@media (min-width: 1024px) {
  .frame-perspective {
    perspective: 1400px;
  }
}

.frame {
  --tilt-x: 0deg;
  --tilt-y: 0deg;
  --shift-x: 0%;
  --shift-y: 0%;
  transform: rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.frame-body {
  aspect-ratio: 16 / 10;
}

.frame-body--phone {
  aspect-ratio: auto;
  height: min(520px, calc(100svh - 22rem));
  max-height: 50svh;
  min-height: 16rem;
}

@media (min-width: 640px) {
  .frame-body--phone {
    height: min(600px, calc(100svh - 19rem));
    max-height: none;
    min-height: 22rem;
  }
}

.frame-shot {
  transform: scale(1.02) translate(var(--shift-x), var(--shift-y));
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (min-width: 1024px) {
  .frame-shot {
    transform: scale(1.06) translate(var(--shift-x), var(--shift-y));
  }
}

.wipe-enter-active {
  z-index: 2;
  transition: clip-path 0.6s cubic-bezier(0.65, 0, 0.35, 1);
}

.wipe-leave-active {
  transition: opacity 0.6s step-end;
}

.wipe-enter-from {
  clip-path: inset(0 0 0 100%);
}

.wipe-enter-to {
  clip-path: inset(0 0 0 0);
}

.wipe-leave-to {
  opacity: 0;
}

/* While building, the screenshot waits for the wireframe to finish. */
.frame-body--build .wipe-enter-active {
  transition-delay: 0.8s;
}

.frame-body--build .wipe-leave-active {
  transition-duration: 1.4s;
}

.skeleton {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 6%;
  padding: 4% 5%;
  background: #020617;
}

.skeleton__nav {
  display: flex;
  align-items: center;
  gap: 3%;
  height: 4%;
}

.skeleton__nav .sk {
  height: 100%;
}

.skeleton__hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6%;
  flex: 1.5;
}

.skeleton__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 9%;
}

.skeleton__copy .sk {
  height: 6%;
}

.skeleton__copy .sk--thick {
  height: 14%;
}

.skeleton__copy .sk--button {
  width: 34%;
  height: 15%;
  margin-top: 3%;
  border-radius: 999px;
  background: rgba(34, 211, 238, 0.75);
}

.skeleton__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4%;
  flex: 1;
}

.sk {
  display: block;
  border-radius: 4px;
  background: rgba(148, 163, 184, 0.3);
  transform-origin: left center;
  animation: sk-draw 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i) * 55ms);
}

.sk--box {
  border: 1.5px dashed rgba(103, 232, 249, 0.5);
  background: rgba(34, 211, 238, 0.05);
  border-radius: 8px;
}

@keyframes sk-draw {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .frame,
  .frame-shot,
  .wipe-enter-active,
  .wipe-leave-active {
    transition: none;
  }
}
</style>
