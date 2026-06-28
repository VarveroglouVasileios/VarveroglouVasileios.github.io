<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Color, Vector3 } from 'three'
import type { BackgroundSectionKey } from '@/composables/useScrollSectionTheme'
import Background3DScene from './Background3DScene.vue'

const props = withDefaults(
  defineProps<{ sectionKey?: BackgroundSectionKey }>(),
  { sectionKey: 'hero' },
)

const PALETTE: Record<
  BackgroundSectionKey,
  {
    light1: string
    light2: string
    particle: string
    emissive: string
    core: string
    coreEm: string
    baseBg: string
    vignetteEdge: string
    gradTop: string
    gradBot: string
  }
> = {
  hero: {
    light1: '#22d3ee',
    light2: '#8b5cf6',
    particle: '#22d3ee',
    emissive: '#67e8f9',
    core: '#8b5cf6',
    coreEm: '#4c1d95',
    baseBg: '#020617',
    vignetteEdge: '#020617',
    gradTop: 'rgba(15,23,42,0.25)',
    gradBot: 'rgba(2,6,23,0.82)',
  },
  about: {
    light1: '#c4b5fd',
    light2: '#6d28d9',
    particle: '#a78bfa',
    emissive: '#7c3aed',
    core: '#7c3aed',
    coreEm: '#4c1d95',
    baseBg: '#0c0618',
    vignetteEdge: '#1e1b4b',
    gradTop: 'rgba(76,29,149,0.35)',
    gradBot: 'rgba(12,6,24,0.9)',
  },
  projects: {
    light1: '#38bdf8',
    light2: '#0284c7',
    particle: '#7dd3fc',
    emissive: '#38bdf8',
    core: '#0369a1',
    coreEm: '#0c4a6e',
    baseBg: '#020d1a',
    vignetteEdge: '#0c4a6e',
    gradTop: 'rgba(14,116,144,0.28)',
    gradBot: 'rgba(2,13,26,0.88)',
  },
  insights: {
    light1: '#818cf8',
    light2: '#22d3ee',
    particle: '#a5b4fc',
    emissive: '#67e8f9',
    core: '#4f46e5',
    coreEm: '#312e81',
    baseBg: '#08081c',
    vignetteEdge: '#1e1b4b',
    gradTop: 'rgba(79,70,229,0.3)',
    gradBot: 'rgba(8,8,28,0.9)',
  },
  experience: {
    light1: '#fb923c',
    light2: '#dc2626',
    particle: '#fdba74',
    emissive: '#f87171',
    core: '#ea580c',
    coreEm: '#7f1d1d',
    baseBg: '#140604',
    vignetteEdge: '#431407',
    gradTop: 'rgba(180,50,20,0.38)',
    gradBot: 'rgba(20,6,4,0.92)',
  },
  contact: {
    light1: '#2dd4bf',
    light2: '#64748b',
    particle: '#5eead4',
    emissive: '#99f6e4',
    core: '#0d9488',
    coreEm: '#134e4a',
    baseBg: '#040f0e',
    vignetteEdge: '#0f172a',
    gradTop: 'rgba(13,148,136,0.22)',
    gradBot: 'rgba(15,23,42,0.88)',
  },
}

// Gate the WebGL particle field: skip it on touch/small screens and when the
// user prefers reduced motion. The CSS gradient + vignette below remain, so the
// page still looks intentional while we avoid the costly per-frame render on
// mobile (a major Lighthouse performance drain).
const enable3D = ref(false)

const reducedMotionQuery =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null
const desktopQuery =
  typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)') : null

const evaluate3D = (): void => {
  enable3D.value =
    !!desktopQuery?.matches && !reducedMotionQuery?.matches
}

const colors = reactive({ ...PALETTE.hero })
const pool = new Color()
const poolT = new Color()

let colorsRaf = 0

const tickColors = (): void => {
  const pal = PALETTE[props.sectionKey]
  const rate = 0.045
  colors.light1 = lerpStr(colors.light1, pal.light1, rate)
  colors.light2 = lerpStr(colors.light2, pal.light2, rate)
  colors.particle = lerpStr(colors.particle, pal.particle, rate)
  colors.emissive = lerpStr(colors.emissive, pal.emissive, rate)
  colors.core = lerpStr(colors.core, pal.core, rate)
  colors.coreEm = lerpStr(colors.coreEm, pal.coreEm, rate)
  colors.baseBg = lerpStr(colors.baseBg, pal.baseBg, rate)
  colors.vignetteEdge = lerpStr(colors.vignetteEdge, pal.vignetteEdge, rate)
  colors.gradTop = lerpRgbGradient(colors.gradTop, pal.gradTop, rate)
  colors.gradBot = lerpRgbGradient(colors.gradBot, pal.gradBot, rate)
  colorsRaf = requestAnimationFrame(tickColors)
}
tickColors()

onMounted(() => {
  evaluate3D()
  desktopQuery?.addEventListener('change', evaluate3D)
  reducedMotionQuery?.addEventListener('change', evaluate3D)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(colorsRaf)
  desktopQuery?.removeEventListener('change', evaluate3D)
  reducedMotionQuery?.removeEventListener('change', evaluate3D)
})

function lerpStr(from: string, to: string, a: number): string {
  pool.set(from)
  poolT.set(to)
  pool.lerp(poolT, a)
  return `#${pool.getHexString()}`
}

function lerpRgbGradient(from: string, to: string, a: number): string {
  const pf = from.match(/rgba?\(([^)]+)\)/)
  const pt = to.match(/rgba?\(([^)]+)\)/)
  if (!pf || !pt) return to
  const af = pf[1].split(',').map((x) => Number.parseFloat(x.trim()))
  const at = pt[1].split(',').map((x) => Number.parseFloat(x.trim()))
  if (af.length < 4 || at.length < 4) return to
  const r = af[0] + (at[0] - af[0]) * a
  const g = af[1] + (at[1] - af[1]) * a
  const b = af[2] + (at[2] - af[2]) * a
  const al = af[3] + (at[3] - af[3]) * a
  return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${al.toFixed(2)})`
}

const vv = (x: number, y: number, z: number) => new Vector3(x, y, z)
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 z-0 transition-colors duration-700"
    :style="{ backgroundColor: colors.baseBg }"
  >
    <TresCanvas
      v-if="enable3D"
      alpha
      window-size
      power-preference="high-performance"
    >
      <TresPerspectiveCamera :position="vv(0, 0, 15)" :fov="45" />
      <Background3DScene :colors="colors" />
    </TresCanvas>

    <div
      class="absolute inset-0 opacity-80"
      :style="{
        background: `radial-gradient(circle at center, transparent 0%, ${colors.vignetteEdge} 92%)`,
      }"
    />
    <div
      class="absolute inset-0"
      :style="{
        background: `linear-gradient(to bottom, ${colors.gradTop}, transparent, ${colors.gradBot})`,
      }"
    />
  </div>
</template>
