<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Stars } from '@tresjs/cientos'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroSection = ref<HTMLElement | null>(null)
const headline = ref<HTMLElement | null>(null)

// 3D Specific Refs
const sunRef = shallowRef<THREE.Mesh | null>(null)
const planet1Ref = shallowRef<THREE.Group | null>(null)
const planet2Ref = shallowRef<THREE.Group | null>(null)
const cameraGroupRef = shallowRef<THREE.Group | null>(null)

// Animation loops
let animationFrameId: number;

onMounted(() => {
  // 1. Text Entrance
  if (headline.value) {
    gsap.fromTo(headline.value, 
      { opacity: 0, scale: 0.9, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 2, ease: 'expo.out', delay: 0.5 }
    )
  }

  // 2. Camera Scroll Sequence (Fly through the system)
  if (heroSection.value && cameraGroupRef.value) {
    gsap.to(cameraGroupRef.value.position, {
      z: -10, // Fly forward past the sun
      y: 5,   // Rise up
      ease: "none",
      scrollTrigger: {
        trigger: heroSection.value,
        start: "top top",
        end: "bottom top", // 150vh from App.vue gives us lot of scrub room
        scrub: 1
      }
    })
  }

  // 3. Orbital Mechanics (Continuous rotation)
  const startTime = Date.now()
  const loop = () => {
    const elapsed = (Date.now() - startTime) / 1000

    if (sunRef.value) {
      sunRef.value.rotation.y = elapsed * 0.1
    }
    if (planet1Ref.value) {
      planet1Ref.value.rotation.y = elapsed * 0.5 // Orbit speed
      const mesh = planet1Ref.value.children[0]
      if (mesh) mesh.rotation.x = elapsed * 2 // Self rotation
    }
    if (planet2Ref.value) {
      planet2Ref.value.rotation.y = elapsed * 0.3
      const mesh = planet2Ref.value.children[0]
      if (mesh) mesh.rotation.z = elapsed // Self rotation
    }

    animationFrameId = requestAnimationFrame(loop)
  }
  loop()
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <div ref="heroSection" class="relative w-full h-full overflow-hidden bg-transparent">
    
    <!-- 3D Orbit Layer -->
    <div class="fixed inset-0 z-0 h-screen pointer-events-none">
      <TresCanvas clear-color="transparent" window-size alpha>
        
        <TresGroup ref="cameraGroupRef">
          <TresPerspectiveCamera :position="[0, 2, 12]" :fov="45" />
        </TresGroup>

        <Stars :radius="100" :depth="50" :count="5000" :size="0.1" :size-attenuation="true" />
        
        <TresAmbientLight :intensity="0.1" color="#ffffff" />
        <TresPointLight :position="[0, 0, 0]" :intensity="2" color="#f97316" :distance="50" /> <!-- Sun light source -->

        <!-- Central Body (The Sun/Core) -->
        <TresMesh ref="sunRef" :position="[0, 0, 0]">
          <TresIcosahedronGeometry :args="[2.5, 2]" />
          <TresMeshStandardMaterial 
            color="#f97316" 
            emissive="#ea580c"
            :emissiveIntensity="2"
            :wireframe="true"
          />
        </TresMesh>

        <!-- Orbit 1 (Inner) -->
        <TresGroup ref="planet1Ref">
          <!-- The actual planet shifted out on X to create orbit radius -->
          <TresMesh :position="[5, 0, 0]">
            <TresOctahedronGeometry :args="[0.5, 0]" />
            <TresMeshStandardMaterial color="#3b82f6" emissive="#2563eb" :emissiveIntensity="1" :wireframe="true" />
          </TresMesh>
          <!-- Orbital Ring -->
          <TresMesh :rotation="[Math.PI / 2, 0, 0]">
            <TresRingGeometry :args="[4.98, 5.02, 64]" />
            <TresMeshBasicMaterial color="#ffffff" :transparent="true" :opacity="0.1" :side="2" />
          </TresMesh>
        </TresGroup>

        <!-- Orbit 2 (Outer) -->
        <TresGroup ref="planet2Ref" :rotation="[0.2, 0, 0.4]"> <!-- Inclined orbit -->
          <TresMesh :position="[-8, 0, 0]">
            <TresDodecahedronGeometry :args="[0.8, 0]" />
            <TresMeshStandardMaterial color="#8b5cf6" emissive="#7c3aed" :emissiveIntensity="0.5" :wireframe="true" />
          </TresMesh>
          <!-- Orbital Ring -->
          <TresMesh :rotation="[Math.PI / 2, 0, 0]">
            <TresRingGeometry :args="[7.95, 8.05, 64]" />
            <TresMeshBasicMaterial color="#ffffff" :transparent="true" :opacity="0.05" :side="2" />
          </TresMesh>
        </TresGroup>

      </TresCanvas>
    </div>

    <!-- UI Overlay Layer -->
    <div class="relative z-10 w-full h-screen flex flex-col justify-center items-center pointer-events-none">
      <div class="text-center mix-blend-screen">
        <h1 
          ref="headline"
          class="text-6xl md:text-[8vw] font-display font-black text-white tracking-tighter uppercase leading-[0.85] orbit-glow-text"
        >
          Orbit<br/>Folio.
        </h1>
        <p class="mt-8 text-orbit-text tracking-[0.4em] uppercase text-xs md:text-sm font-bold opacity-80 shadow-black drop-shadow-lg">
          Full-Stack Web Ecosystems
        </p>
      </div>
    </div>
    
  </div>
</template>
