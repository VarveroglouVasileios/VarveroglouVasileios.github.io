<script setup lang="ts">
import { Icosahedron, Stars } from '@tresjs/cientos'
import { useRenderLoop } from '@tresjs/core'
import gsap from 'gsap'
import type { Group } from 'three'
import { onMounted, onUnmounted, shallowRef } from 'vue'
import { usePortfolioStore } from '@/stores/portfolio'
import ProjectCard from './ProjectCard.vue'
import type { Project, SocialLink } from '@/types'

const store = usePortfolioStore()

/** Camera ref for GSAP zoom-in (shallowRef: avoid reactivity on Three.js object) */
const cameraRef = shallowRef<{ position: { x: number; y: number; z: number } } | null>(null)
/** Central icosahedron group ref (shallowRef: avoid Vue reactivity on render loop) */
const icosahedronGroupRef = shallowRef<Group | null>(null)
/** Orbital group ref (shallowRef: avoid Vue reactivity on render loop) */
const orbitalGroupRef = shallowRef<Group | null>(null)

/** Orbital cards: projects + social links with orbit positions */
const orbitalCards: Array<(Project | SocialLink) & { orbitAngle: number; orbitRadius: number }> = [
  { id: 'github', title: 'GitHub', url: 'https://github.com', orbitAngle: 0, orbitRadius: 3.5 },
  { id: 'linkedin', title: 'LinkedIn', url: 'https://linkedin.com', orbitAngle: Math.PI / 2, orbitRadius: 3.5 },
  {
    id: 'project-1',
    title: 'Sample Project',
    description: 'A Vue 3 + TresJS portfolio.',
    url: '#',
    techStack: ['Vue 3', 'TresJS', 'Three.js'],
    orbitAngle: Math.PI,
    orbitRadius: 3.5,
  },
  {
    id: 'project-2',
    title: 'Another Project',
    description: 'Another impressive project.',
    url: '#',
    techStack: ['TypeScript', 'GSAP'],
    orbitAngle: (3 * Math.PI) / 2,
    orbitRadius: 3.5,
  },
]

/** Local position in orbital group (no scroll — group rotation handles that) */
function getOrbitPosition(index: number): [number, number, number] {
  const card = orbitalCards[index]
  const x = Math.cos(card.orbitAngle) * card.orbitRadius
  const z = Math.sin(card.orbitAngle) * card.orbitRadius
  return [x, 0, z]
}

/** World position for camera zoom target (includes scroll rotation) */
function getWorldPosition(index: number): [number, number, number] {
  const card = orbitalCards[index]
  const angle = card.orbitAngle + store.orbitalRotation
  const x = Math.cos(angle) * card.orbitRadius
  const z = Math.sin(angle) * card.orbitRadius
  return [x, 0, z]
}

/** Animate camera to zoom into a card position */
function zoomToCard(position: [number, number, number]) {
  const camera = cameraRef.value
  if (!camera) return

  store.setZooming(true)
  gsap.to(camera.position, {
    x: position[0] * 0.4,
    y: position[1] + 0.5,
    z: position[2] * 0.4 + 2,
    duration: 1.2,
    ease: 'power3.inOut',
  })

  gsap.delayedCall(1.2, () => {
    store.setZooming(false)
  })
}

/** Handle card click: zoom camera + show overlay */
function onCardClick(card: Project | SocialLink, index: number) {
  store.setActiveCard(card)
  zoomToCard(getWorldPosition(index))
}

/** Slow rotation of central icosahedron and orbital scroll */
const { onLoop } = useRenderLoop()
let loopCleanup: { off: () => void } | null = null

onMounted(() => {
  loopCleanup = onLoop(({ delta }) => {
    const icoGroup = icosahedronGroupRef.value
    if (icoGroup) icoGroup.rotation.y += delta * 0.15

    const orbitGroup = orbitalGroupRef.value
    if (orbitGroup) orbitGroup.rotation.y = store.orbitalRotation
  })
})

onUnmounted(() => {
  loopCleanup?.off()
})
</script>

<template>
  <!-- Camera -->
  <TresPerspectiveCamera
    ref="cameraRef"
    :position="[0, 0, 8]"
    :fov="60"
    :near="0.1"
    :far="1000"
  />

  <!-- Ambient + directional lights -->
  <TresAmbientLight :intensity="0.3" />
  <TresDirectionalLight
    :position="[5, 5, 5]"
    :intensity="1.2"
    cast-shadow
  />
  <TresDirectionalLight
    :position="[-3, 2, -2]"
    :intensity="0.6"
  />

  <!-- Particle stars background -->
  <Stars :radius="80" :depth="50" :count="3000" :saturation="0.5" :fade="true" />

  <!-- Central glassmorphic icosahedron (rotates slowly) -->
  <TresGroup ref="icosahedronGroupRef" :position="[0, 0, 0]">
    <Icosahedron :args="[0.8, 1]" :position="[0, 0, 0]">
      <TresMeshStandardMaterial
        color="#334155"
        :emissive="'#0ea5e9'"
        :emissive-intensity="0.15"
        :transparent="true"
        :opacity="0.85"
        :metalness="0.9"
        :roughness="0.1"
      />
    </Icosahedron>
  </TresGroup>

  <!-- Orbital group: rotates with scroll -->
  <TresGroup ref="orbitalGroupRef">
    <ProjectCard
      v-for="(card, i) of orbitalCards"
      :key="card.id"
      :position="getOrbitPosition(i)"
      :title="card.title"
      @click="onCardClick(card, i)"
    />
  </TresGroup>
</template>
