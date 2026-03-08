<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { Html } from '@tresjs/cientos'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Floor heights (Y positions)
const FLOOR_HEIGHTS = [0, 20, 40, 60, 80]
const FLOOR_NAMES = ['Intro', 'About', 'Projects', 'Tech', 'Contact']

// Camera Y position driven by scroll
const cameraY = ref(0)
const cameraShake = ref({ x: 0, y: 0, z: 0 })
const shakeSeed = ref(0)
let scrollTriggerInstance: ScrollTrigger | null = null
let shakeIntervalId: ReturnType<typeof setInterval> | null = null

// For MeshPhysicalMaterial side (DoubleSide = 2)
const DoubleSide = THREE.DoubleSide

// Elevator cabin wireframe geometry
const cabinSize = { w: 3, h: 4, d: 2.5 }
const boxGeom = new THREE.BoxGeometry(cabinSize.w, cabinSize.h, cabinSize.d)
const edgesGeom = new THREE.EdgesGeometry(boxGeom)
const wireframeMaterial = new THREE.LineBasicMaterial({
  color: 0x88ccff,
  opacity: 0.5,
  transparent: true,
})
const cabinWireframe = shallowRef(
  new THREE.LineSegments(edgesGeom, wireframeMaterial)
)
const shaftSize = { w: 8, h: 100, d: 8 }
const neonColor = '#00d4ff'
const neonEmissive = '#00ffff'

onMounted(() => {
  scrollTriggerInstance = ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    onUpdate: (self: ScrollTrigger) => {
      const progress = self.progress
      const maxY = FLOOR_HEIGHTS[FLOOR_HEIGHTS.length - 1]
      cameraY.value = progress * maxY
    },
  })

  // Subtle floating motion seed
  let t = 0
  shakeIntervalId = setInterval(() => {
    t += 0.1
    shakeSeed.value = t
  }, 100)
})

onUnmounted(() => {
  scrollTriggerInstance?.kill()
  if (shakeIntervalId) clearInterval(shakeIntervalId)
})

// Animate camera shake in render loop
const { onLoop } = useRenderLoop()
onLoop(() => {
  const t = shakeSeed.value
  cameraShake.value = {
    x: Math.sin(t * 2.1) * 0.01,
    y: Math.sin(t * 1.7 + 1) * 0.02,
    z: Math.sin(t * 2.3 + 2) * 0.01,
  }
})
</script>

<template>
  <TresPerspectiveCamera
    :position="[
      0 + cameraShake.x,
      cameraY + cameraShake.y,
      0 + cameraShake.z,
    ]"
    :fov="60"
  />

  <TresAmbientLight :intensity="0.15" />
  <TresDirectionalLight :position="[5, 50, 5]" :intensity="0.3" />

  <!-- Elevator Shaft (dark walls with neon strips) -->
  <TresGroup>
    <!-- Back wall -->
    <TresMesh :position="[0, shaftSize.h / 2, -shaftSize.d / 2]" :rotation="[0, 0, 0]">
      <TresBoxGeometry :args="[shaftSize.w + 2, shaftSize.h + 2, 0.2]" />
      <TresMeshStandardMaterial
        :color="'#0d0d12'"
        :emissive="'#050508'"
        :roughness="0.95"
        :metalness="0.05"
      />
    </TresMesh>
    <!-- Left wall -->
    <TresMesh :position="[-shaftSize.w / 2, shaftSize.h / 2, 0]" :rotation="[0, 0, 0]">
      <TresBoxGeometry :args="[0.2, shaftSize.h + 2, shaftSize.d + 2]" />
      <TresMeshStandardMaterial
        :color="'#0a0a0f'"
        :emissive="'#030305'"
        :roughness="0.9"
        :metalness="0.02"
      />
    </TresMesh>
    <!-- Right wall -->
    <TresMesh :position="[shaftSize.w / 2, shaftSize.h / 2, 0]" :rotation="[0, 0, 0]">
      <TresBoxGeometry :args="[0.2, shaftSize.h + 2, shaftSize.d + 2]" />
      <TresMeshStandardMaterial
        :color="'#0a0a0f'"
        :emissive="'#030305'"
        :roughness="0.9"
        :metalness="0.02"
      />
    </TresMesh>

    <!-- Vertical neon strips (4 strips, front edges) -->
    <template v-for="i in 20" :key="`neon-${i}`">
      <TresMesh
        :position="[-shaftSize.w / 2 + 0.5, (i - 1) * 5, -shaftSize.d / 2 + 0.1]"
      >
        <TresBoxGeometry :args="[0.08, 4.5, 0.02]" />
        <TresMeshStandardMaterial
          :color="neonColor"
          :emissive="neonEmissive"
          :emissive-intensity="0.8"
          :tone-mapped="false"
        />
      </TresMesh>
      <TresMesh
        :position="[shaftSize.w / 2 - 0.5, (i - 1) * 5, -shaftSize.d / 2 + 0.1]"
      >
        <TresBoxGeometry :args="[0.08, 4.5, 0.02]" />
        <TresMeshStandardMaterial
          :color="neonColor"
          :emissive="neonEmissive"
          :emissive-intensity="0.8"
          :tone-mapped="false"
        />
      </TresMesh>
    </template>
  </TresGroup>

  <!-- Glass Cabin (wireframe around camera position) -->
  <TresGroup :position="[0, cameraY, 0]">
    <primitive :object="cabinWireframe" />
    <TresMesh>
      <TresBoxGeometry :args="[cabinSize.w, cabinSize.h, cabinSize.d]" />
      <TresMeshPhysicalMaterial
        :color="'#112233'"
        :opacity="0.08"
        :transparent="true"
        :side="DoubleSide"
      />
    </TresMesh>
  </TresGroup>

  <!-- Floor 0: Intro - Minimal landing -->
  <TresGroup :position="[0, 0, -3]">
    <TresMesh>
      <TresPlaneGeometry :args="[shaftSize.w - 1, shaftSize.d - 1]" />
      <TresMeshStandardMaterial
        :color="'#1a1a22'"
        :roughness="0.9"
        :metalness="0.1"
      />
    </TresMesh>
    <TresSpotLight
      :position="[0, 8, 2]"
      :angle="0.5"
      :penumbra="0.5"
      :intensity="2"
    />
    <Html center transform :distance-factor="5" :position="[0, 2, 0]">
      <div class="text-center text-white font-light tracking-widest text-2xl">
        Welcome
      </div>
    </Html>
  </TresGroup>

  <!-- Floor 1: About - Clean concrete platform -->
  <TresGroup :position="[0, 20, -3]">
    <TresMesh>
      <TresBoxGeometry :args="[shaftSize.w - 0.5, 0.3, shaftSize.d - 0.5]" />
      <TresMeshStandardMaterial
        :color="'#2a2a32'"
        :roughness="0.85"
        :metalness="0.05"
      />
    </TresMesh>
    <TresSpotLight
      :position="[0, 10, 2]"
      :angle="0.6"
      :penumbra="0.6"
      :intensity="3"
      :color="'#e8e8f0'"
    />
    <Html center transform :distance-factor="5" :position="[0, 22, 0]">
      <div class="max-w-md text-center text-gray-200 space-y-2">
        <h2 class="text-xl font-semibold text-cyan-400">About</h2>
        <p class="text-sm">Architect & Developer. Crafting digital experiences.</p>
      </div>
    </Html>
  </TresGroup>

  <!-- Floor 2: Projects - Floating glowing panels -->
  <TresGroup :position="[0, 40, -3]">
    <TresMesh v-for="(p, i) in [
      [-1.5, 0.5, 0],
      [1.2, -0.3, 0.2],
      [-0.8, -0.5, -0.3],
    ]" :key="i" :position="[p[0], p[1], p[2]]">
      <TresBoxGeometry :args="[1.2, 1.5, 0.05]" />
      <TresMeshStandardMaterial
        :color="'#1a2233'"
        :emissive="'#00aaff'"
        :emissive-intensity="0.3"
        :transparent="true"
        :opacity="0.85"
      />
    </TresMesh>
    <TresSpotLight
      :position="[0, 12, 2]"
      :angle="0.7"
      :penumbra="0.7"
      :intensity="2"
      :color="'#00ccff'"
    />
    <Html center transform :distance-factor="5" :position="[0, 42, 0]">
      <div class="max-w-md text-center text-gray-200 space-y-2">
        <h2 class="text-xl font-semibold text-cyan-400">Projects</h2>
        <ul class="text-sm space-y-1">
          <li>Project A</li>
          <li>Project B</li>
          <li>Project C</li>
        </ul>
      </div>
    </Html>
  </TresGroup>

  <!-- Floor 3: Tech - Abstract data blocks -->
  <TresGroup :position="[0, 60, -3]">
    <TresMesh v-for="(b, i) in [
      [0, 0, 0],
      [1.2, 0.2, 0.3],
      [-1.1, -0.1, 0.2],
      [0.5, -0.4, -0.2],
    ]" :key="i" :position="b">
      <TresBoxGeometry :args="[0.6, 0.6, 0.6]" />
      <TresMeshStandardMaterial
        :color="'#223344'"
        :emissive="'#4400ff'"
        :emissive-intensity="0.25"
      />
    </TresMesh>
    <TresSpotLight
      :position="[0, 14, 2]"
      :angle="0.65"
      :penumbra="0.65"
      :intensity="2.5"
      :color="'#6600ff'"
    />
    <Html center transform :distance-factor="5" :position="[0, 62, 0]">
      <div class="max-w-md text-center text-gray-200 space-y-2">
        <h2 class="text-xl font-semibold text-violet-400">Tech</h2>
        <p class="text-sm">Vue • Three.js • GSAP • TypeScript</p>
      </div>
    </Html>
  </TresGroup>

  <!-- Floor 4: Contact - Rooftop / bright open space -->
  <TresGroup :position="[0, 80, -3]">
    <TresMesh>
      <TresPlaneGeometry :args="[shaftSize.w, shaftSize.d]" />
      <TresMeshStandardMaterial
        :color="'#3a3a42'"
        :roughness="0.7"
        :metalness="0.1"
        :emissive="'#444455'"
        :emissive-intensity="0.1"
      />
    </TresMesh>
    <TresDirectionalLight
      :position="[0, 30, 10]"
      :intensity="2"
      :color="'#ffffff'"
    />
    <TresSpotLight
      :position="[0, 20, 5]"
      :angle="0.8"
      :penumbra="0.8"
      :intensity="4"
      :color="'#ffffff'"
    />
    <Html center transform :distance-factor="5" :position="[0, 82, 0]">
      <div class="max-w-md text-center text-gray-100 space-y-3 pointer-events-auto">
        <h2 class="text-xl font-semibold text-cyan-300">Contact</h2>
        <p class="text-sm">Get in touch</p>
        <a
          href="mailto:hello@example.com"
          class="inline-block px-4 py-2 bg-cyan-500/30 text-cyan-300 rounded hover:bg-cyan-500/50 transition"
        >
          hello@example.com
        </a>
      </div>
    </Html>
  </TresGroup>
</template>
