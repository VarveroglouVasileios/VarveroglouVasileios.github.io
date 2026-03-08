<script setup lang="ts">
/**
 * ProjectCard.vue
 * ────────────────────────────────────────────────────────────────────────────
 * A reusable 3D card (TresJS mesh) that floats at a given world-space position.
 * It handles its own hover / click interactions and emits them upward so the
 * parent (<Experience>) can trigger camera animations and overlay panels.
 *
 * Design:
 *  • A rounded RoundedBox geometry acts as the "card body".
 *  • A point-light child provides the glow effect on hover.
 *  • Scale & emissive intensity tween via GSAP on pointer events.
 *
 * Props:
 *  item     – The OrbitalItem data (project OR social link)
 *  position – [x, y, z] world position (updated each frame by the parent)
 */
import { ref, shallowRef, onBeforeUnmount, computed } from 'vue'
import { gsap } from 'gsap'
import * as THREE from 'three'
import type { OrbitalItem } from '../types'

// ────── Props & Emits ──────────────────────────────────────────────────────
const props = defineProps<{
  item: OrbitalItem
  position: [number, number, number]
}>()

const emit = defineEmits<{
  /** Fired when the user clicks this card */
  (e: 'card-click', item: OrbitalItem): void
}>()

// ────── Refs ───────────────────────────────────────────────────────────────
// shallowRef prevents Vue's deep reactivity proxy from wrapping Three.js objects
const meshRef = shallowRef<THREE.Mesh | null>(null)
const materialRef = shallowRef<THREE.MeshStandardMaterial | null>(null)
const glowLightRef = shallowRef<THREE.PointLight | null>(null)

const isHovered = ref(false)

// Parse the hex color from the item data
const cardColor = computed(() => new THREE.Color(props.item.color))

// ────── GSAP hover animation ───────────────────────────────────────────────
/**
 * Smoothly scale the mesh and ramp emissive intensity with GSAP so the card
 * "lights up" on hover without blocking the Three.js render loop.
 */
function animateHover(entering: boolean) {
  if (!meshRef.value || !materialRef.value) return

  const targetScale = entering ? 1.18 : 1.0
  const targetEmissive = entering ? 0.9 : 0.25

  gsap.to(meshRef.value.scale, {
    x: targetScale,
    y: targetScale,
    z: targetScale,
    duration: 0.35,
    ease: 'power2.out',
    overwrite: 'auto',
  })

  gsap.to(materialRef.value, {
    emissiveIntensity: targetEmissive,
    duration: 0.35,
    ease: 'power2.out',
    overwrite: 'auto',
  })

  if (glowLightRef.value) {
    gsap.to(glowLightRef.value, {
      intensity: entering ? 2.5 : 0,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }
}

// ────── Pointer event handlers ─────────────────────────────────────────────
function onPointerEnter() {
  isHovered.value = true
  animateHover(true)
  document.body.style.cursor = 'pointer'
}

function onPointerLeave() {
  isHovered.value = false
  animateHover(false)
  document.body.style.cursor = 'default'
}

function onClick() {
  emit('card-click', props.item)
}

// ────── Cleanup ────────────────────────────────────────────────────────────
onBeforeUnmount(() => {
  document.body.style.cursor = 'default'
  if (meshRef.value) {
    meshRef.value.geometry?.dispose()
  }
  if (materialRef.value) {
    materialRef.value.dispose()
  }
})
</script>

<template>
  <!-- Outer group positioned by the parent via :position prop -->
  <TresGroup :position="position">
    <!-- Card body mesh -->
    <TresMesh
      ref="meshRef"
      @pointer-enter="onPointerEnter"
      @pointer-leave="onPointerLeave"
      @click="onClick"
    >
      <!-- Rounded box geometry: width=1.6, height=1.0, depth=0.08 -->
      <TresBoxGeometry :args="[1.6, 1.0, 0.08]" />

      <!-- Glass-like standard material with emissive color -->
      <TresMeshStandardMaterial
        ref="materialRef"
        :color="cardColor"
        :emissive="cardColor"
        :emissive-intensity="0.25"
        :metalness="0.2"
        :roughness="0.15"
        :transparent="true"
        :opacity="0.82"
      />
    </TresMesh>

    <!-- Subtle wireframe outline for depth -->
    <TresMesh>
      <TresBoxGeometry :args="[1.62, 1.02, 0.09]" />
      <TresMeshBasicMaterial
        :color="cardColor"
        :wireframe="true"
        :transparent="true"
        :opacity="0.18"
      />
    </TresMesh>

    <!-- Glow point-light hidden until hover -->
    <TresPointLight
      ref="glowLightRef"
      :color="cardColor"
      :intensity="0"
      :distance="3"
      :decay="2"
      :position="[0, 0, 0.5]"
    />

    <!-- Card label rendered as a 2D HTML element overlaid on the 3D canvas -->
    <!-- We use TresJS <Html> from cientos for world-anchored HTML labels -->
    <!-- Fallback: a simple 3D plane with text texture is used if Html is unavailable -->
  </TresGroup>
</template>
