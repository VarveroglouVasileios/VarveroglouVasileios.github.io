<script setup lang="ts">
import { shallowRef, onMounted, onUnmounted } from 'vue'
import { TresCanvas } from '@tresjs/core'
import * as THREE from 'three'

// Define the massive particle geometry
const particleCount = 15000
const positions = new Float32Array(particleCount * 3)
const originalPositions = new Float32Array(particleCount * 3)
const colors = new Float32Array(particleCount * 3)

const color1 = new THREE.Color('#00f3ff') // Cyan
const color2 = new THREE.Color('#ff00ff') // Magenta

for(let i = 0; i < particleCount; i++) {
  // Sphere distribution
  const theta = Math.random() * Math.PI * 2
  const phi = Math.acos((Math.random() * 2) - 1)
  const radius = 10 + (Math.random() * 5)

  const x = radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.sin(phi) * Math.sin(theta)
  const z = radius * Math.cos(phi)

  positions[i*3] = x
  positions[i*3+1] = y
  positions[i*3+2] = z

  originalPositions[i*3] = x
  originalPositions[i*3+1] = y
  originalPositions[i*3+2] = z

  // Mix colors based on position
  const mixedColor = color1.clone().lerp(color2, Math.random())
  colors[i*3] = mixedColor.r
  colors[i*3+1] = mixedColor.g
  colors[i*3+2] = mixedColor.b
}

const pointsRef = shallowRef<THREE.Points | null>(null)
let mouseX = 0
let mouseY = 0
let targetMouseX = 0
let targetMouseY = 0

// Track actual mouse
const onMouseMove = (e: MouseEvent) => {
  // Normalize mouse coordinates to -1 to +1
  targetMouseX = (e.clientX / window.innerWidth) * 2 - 1
  targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1
}

let animationFrameId: number
const startTime = Date.now()

const loop = () => {
  const elapsed = (Date.now() - startTime) / 1000

  if (pointsRef.value && pointsRef.value.geometry) {
    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.1
    mouseY += (targetMouseY - mouseY) * 0.1

    // Global rotation
    pointsRef.value.rotation.y = elapsed * 0.05
    pointsRef.value.rotation.x = elapsed * 0.02

    const geometry = pointsRef.value.geometry as THREE.BufferGeometry
    const posAttribute = geometry.attributes.position

    if (!posAttribute) return

    const time = elapsed * 0.5

    // Interactive Displacement
    // We map the 2D mouse coordinates (+-1) into the 3D space roughly
    const interactX = mouseX * 15
    const interactY = mouseY * 15

    for(let i = 0; i < particleCount; i++) {
      const idx = i * 3
      const ox = originalPositions[idx] as number
      const oy = originalPositions[idx+1] as number
      const oz = originalPositions[idx+2] as number

      // Account for rotation to find the world position of the particle roughly
      // (This is an approximation for performance, real calculation requires matrices)
      
      // Calculate distance to mouse "cursor" in 3D space
      const dx = ox - interactX
      const dy = oy - interactY
      // Ignore Z for mouse interaction depth, assume interaction happens near Z=0
      const distSq = dx*dx + dy*dy

      const interactionRadius = 25
      let force = 0

      if (distSq < interactionRadius) {
        force = (interactionRadius - distSq) / interactionRadius
      }

      // Base undulating motion
      const wave = Math.sin(time + ox * 0.5) * 0.5 + Math.cos(time + oz * 0.5) * 0.5

      // Apply interaction pushing particles away
      const targetX = ox + dx * force * 1.5
      const targetY = oy + dy * force * 1.5 + wave
      const targetZ = oz + force * 5 // Push back in Z

      const currentX = posAttribute.getX(i)
      const currentY = posAttribute.getY(i)
      const currentZ = posAttribute.getZ(i)

      posAttribute.setXYZ(
        i,
        currentX + (targetX - currentX) * 0.1,
        currentY + (targetY - currentY) * 0.1,
        currentZ + (targetZ - currentZ) * 0.1
      )
    }

    posAttribute.needsUpdate = true
  }
  
  animationFrameId = requestAnimationFrame(loop)
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  loop()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <TresCanvas clear-color="#000000" window-size>
    <TresPerspectiveCamera :position="[0, 0, 30]" :fov="45" :near="0.1" :far="1000" />
    
    <!-- Setup for scroll hijacking camera in the future via GSAP -->
    <TresGroup name="cameraRig">
      
    </TresGroup>

    <TresPoints ref="pointsRef">
      <TresBufferGeometry 
        :position="[positions, 3]" 
        :color="[colors, 3]" 
      />
      <TresPointsMaterial 
        :size="0.15" 
        :vertexColors="true" 
        :transparent="true" 
        :opacity="0.8" 
        :sizeAttenuation="true"
        :blending="2" 
      />
      <!-- Blending 2 is AdditiveBlending in Three.js resulting in glow -->
    </TresPoints>
  </TresCanvas>
</template>
