<script setup lang="ts">
/**
 * Experience.vue
 * ────────────────────────────────────────────────────────────────────────────
 * Core 3D scene component.
 *
 * Contains:
 *  • Ambient + directional lighting
 *  • A moving star particle system (via @tresjs/cientos <Stars>)
 *  • A slowly-rotating central Icosahedron (the "Glassmorphic" hero element)
 *  • 4 orbital ProjectCard instances that orbit the centre
 *  • Mouse-wheel scroll → rotates the entire orbital ring
 *  • Card click → GSAP camera zoom-in + Pinia overlay state update
 *
 * Performance notes:
 *  • All Three.js object refs use shallowRef to avoid deep reactivity.
 *  • useLoop (TresJS v5) provides the optimised render-loop hook.
 *  • Geometries and materials are disposed in onBeforeUnmount.
 */
import { shallowRef, ref, onMounted, onBeforeUnmount } from 'vue'
import { useLoop } from '@tresjs/core'
import { Stars } from '@tresjs/cientos'
import { gsap } from 'gsap'
import * as THREE from 'three'
import ProjectCard from './ProjectCard.vue'
import { orbitalItems } from '../data/orbitalItems'
import { useSceneStore } from '../stores/sceneStore'
import type { OrbitalItem } from '../types'
import type { LoopContext } from '@tresjs/core'

// ── Pinia store ─────────────────────────────────────────────────────────────
const sceneStore = useSceneStore()

// ── Refs ────────────────────────────────────────────────────────────────────
/** The central icosahedron mesh */
const icoRef = shallowRef<THREE.Mesh | null>(null)
/** The icosahedron material – ref so we can animate emissive */
const icoMatRef = shallowRef<THREE.MeshStandardMaterial | null>(null)
/** PerspectiveCamera reference for GSAP animations */
const cameraRef = shallowRef<THREE.PerspectiveCamera | null>(null)

/** Current scroll-driven orbit Y-rotation offset (radians) */
const orbitY = ref(0)

/** Accumulated time for animations */
let elapsed = 0

// ── Orbital positions ────────────────────────────────────────────────────────
/**
 * Compute each card's world position from its orbit angle + radius.
 * Called every frame inside the render loop.
 */
function getOrbitalPosition(
  index: number,
  time: number,
  scrollOffset: number,
): [number, number, number] {
  const item = orbitalItems[index]
  if (!item) return [0, 0, 0]
  const angle = item.angle + time * 0.15 + scrollOffset
  const x = Math.cos(angle) * item.radius
  const z = Math.sin(angle) * item.radius
  // Cards hover slightly above / below the equatorial plane in a gentle sine wave
  const y = Math.sin(angle * 0.7 + time * 0.3) * 0.4
  return [x, y, z]
}

// ── Reactive card positions (updated each frame) ─────────────────────────────
const cardPositions = ref<Array<[number, number, number]>>(
  orbitalItems.map((_, i) => getOrbitalPosition(i, 0, 0)),
)

// ── Render loop ──────────────────────────────────────────────────────────────
const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }: LoopContext) => {
  elapsed += delta

  // 1. Slowly rotate the central icosahedron
  if (icoRef.value) {
    icoRef.value.rotation.x += delta * 0.2
    icoRef.value.rotation.y += delta * 0.35
  }

  // 2. Pulse the icosahedron emissive in a slow sine wave
  if (icoMatRef.value) {
    icoMatRef.value.emissiveIntensity = 0.4 + Math.sin(elapsed * 1.2) * 0.2
  }

  // 3. Update card positions each frame
  for (let i = 0; i < orbitalItems.length; i++) {
    cardPositions.value[i] = getOrbitalPosition(i, elapsed, orbitY.value)
  }
})

// ── Scroll handler ───────────────────────────────────────────────────────────
function onWheel(event: WheelEvent) {
  // Normalise delta so trackpad scrolling doesn't spin too fast
  const delta = event.deltaY * 0.0008
  orbitY.value += delta
  sceneStore.rotateOrbit(delta)
}

// ── Card click / camera zoom ─────────────────────────────────────────────────
/**
 * When a card is clicked:
 *  1. Store the active item in Pinia (triggers the HTML overlay).
 *  2. Use GSAP to smoothly move the camera toward the card.
 */
function onCardClick(item: OrbitalItem, index: number) {
  if (!cameraRef.value) return

  const targetPos = cardPositions.value[index]
  if (!targetPos) return

  // Place the camera just in front of the card
  const camTargetX = targetPos[0] * 0.55
  const camTargetY = targetPos[1]
  const camTargetZ = targetPos[2] * 0.55 + 2.5

  gsap.to(cameraRef.value.position, {
    x: camTargetX,
    y: camTargetY,
    z: camTargetZ,
    duration: 1.1,
    ease: 'power3.inOut',
    overwrite: 'auto',
    onComplete: () => {
      // Open the overlay after the camera lands
      sceneStore.openItem(item)
    },
  })
}

/**
 * Reset the camera to its default position (called when overlay closes).
 */
function resetCamera() {
  if (!cameraRef.value) return
  gsap.to(cameraRef.value.position, {
    x: 0,
    y: 0,
    z: 8,
    duration: 1.0,
    ease: 'power2.inOut',
    overwrite: 'auto',
  })
}

// Expose resetCamera so App.vue can call it when overlay closes
defineExpose({ resetCamera })

// ── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  window.addEventListener('wheel', onWheel, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('wheel', onWheel)

  // Dispose geometries and materials to free GPU memory
  if (icoRef.value) {
    icoRef.value.geometry?.dispose()
  }
  if (icoMatRef.value) {
    icoMatRef.value.dispose()
  }
})
</script>

<template>
  <!-- Ambient light: fills dark areas with a faint blue-purple space tint -->
  <TresAmbientLight :intensity="0.4" color="#4a3080" />

  <!-- Main directional light (simulates a distant star) -->
  <TresDirectionalLight
    :position="[5, 8, 5]"
    :intensity="1.5"
    color="#c8b8ff"
    :cast-shadow="true"
  />

  <!-- Secondary fill light from behind -->
  <TresDirectionalLight :position="[-4, -2, -6]" :intensity="0.6" color="#1e3a5f" />

  <!-- ── Perspective Camera ──────────────────────────────────────────────── -->
  <!-- make-default registers this as the scene's active camera -->
  <TresPerspectiveCamera
    ref="cameraRef"
    :position="[0, 0, 8]"
    :fov="55"
    :near="0.1"
    :far="200"
    make-default
  />

  <!-- ── Star particle system ───────────────────────────────────────────── -->
  <!-- Stars is a @tresjs/cientos helper that creates a procedural star field -->
  <Suspense>
    <Stars
      :radius="80"
      :depth="50"
      :count="4000"
      :factor="4"
      :saturation="0"
      :fade="true"
    />
  </Suspense>

  <!-- ── Central "Glassmorphic Icosahedron" ─────────────────────────────── -->
  <TresMesh ref="icoRef" :position="[0, 0, 0]">
    <TresIcosahedronGeometry :args="[1.1, 1]" />
    <TresMeshStandardMaterial
      ref="icoMatRef"
      color="#7c3aed"
      emissive="#5b21b6"
      :emissive-intensity="0.5"
      :metalness="0.6"
      :roughness="0.15"
      :transparent="true"
      :opacity="0.85"
    />
  </TresMesh>

  <!-- Wireframe shell on top of icosahedron for the "glass cage" look -->
  <TresMesh :position="[0, 0, 0]">
    <TresIcosahedronGeometry :args="[1.15, 1]" />
    <TresMeshBasicMaterial
      color="#a78bfa"
      :wireframe="true"
      :transparent="true"
      :opacity="0.35"
    />
  </TresMesh>

  <!-- Inner glow point light at the icosahedron's core -->
  <TresPointLight
    :position="[0, 0, 0]"
    color="#8b5cf6"
    :intensity="2"
    :distance="6"
    :decay="2"
  />

  <!-- ── Orbital cards ───────────────────────────────────────────────────── -->
  <TresGroup>
    <ProjectCard
      v-for="(item, index) in orbitalItems"
      :key="item.id"
      :item="item"
      :position="cardPositions[index] ?? [0, 0, 0]"
      @card-click="(i) => onCardClick(i, index)"
    />
  </TresGroup>
</template>
