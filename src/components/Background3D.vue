<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { 
  Color, 
  Vector3, 
  MathUtils, 
  InstancedMesh, 
  Object3D, 
  AdditiveBlending,
  DynamicDrawUsage,
  PerspectiveCamera,
  PointLight,
  Group
} from 'three'

const cameraRef = shallowRef<PerspectiveCamera | null>(null)
const instancedMeshRef = shallowRef<InstancedMesh | null>(null)
const sceneGroup = shallowRef<Group | null>(null)

// --- Configuration ---
const PARTICLE_COUNT = 1200
const tempObject = new Object3D()
const pointer = { x: 0, y: 0 }
const smooth = { x: 0, y: 0 }

// --- Particle Logic ---
const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
  pos: new Vector3(
    MathUtils.randFloatSpread(30),
    MathUtils.randFloatSpread(25),
    MathUtils.randFloatSpread(20) - 5
  ),
  amplitude: MathUtils.randFloat(0.5, 2.5),
  speed: MathUtils.randFloat(0.2, 0.8),
  phase: Math.random() * Math.PI * 2,
  size: MathUtils.randFloat(0.02, 0.08)
}))

const onPointerMove = (e: PointerEvent): void => {
  pointer.x = (e.clientX / window.innerWidth - 0.5) * 2
  pointer.y = -(e.clientY / window.innerHeight - 0.5) * 2
}

const { onLoop } = useRenderLoop()
onLoop(({ elapsed }) => {
  smooth.x += (pointer.x - smooth.x) * 0.05
  smooth.y += (pointer.y - smooth.y) * 0.05

  if (instancedMeshRef.value) {
    particles.forEach((p, i) => {
      // Magic flow math (Noise-like movement)
      const t = elapsed * p.speed + p.phase
      const x = p.pos.x + Math.sin(t * 0.5) * p.amplitude
      const y = p.pos.y + Math.cos(t * 0.3) * p.amplitude
      const z = p.pos.z + Math.sin(t * 0.8) * (p.amplitude * 0.5)

      // Mouse influence (Ethereal attraction)
      const targetX = smooth.x * 15
      const targetY = smooth.y * 10
      const dx = targetX - x
      const dy = targetY - y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      let finalX = x
      let finalY = y
      if (dist < 8) {
        const force = (8 - dist) / 8
        finalX += dx * force * 0.2
        finalY += dy * force * 0.2
      }

      tempObject.position.set(finalX, finalY, z)
      tempObject.scale.setScalar(p.size * (1 + Math.sin(t) * 0.5))
      tempObject.updateMatrix()
      instancedMeshRef.value!.setMatrixAt(i, tempObject.matrix)
    })
    instancedMeshRef.value.instanceMatrix.needsUpdate = true
  }

  if (sceneGroup.value) {
    sceneGroup.value.rotation.y = elapsed * 0.05
  }

  if (cameraRef.value) {
    cameraRef.value.position.x += (smooth.x * 3 - cameraRef.value.position.x) * 0.04
    cameraRef.value.position.y += (smooth.y * 2.5 - cameraRef.value.position.y) * 0.04
    cameraRef.value.lookAt(0, 0, -5)
  }
})

onMounted(() => {
  window.addEventListener('pointermove', onPointerMove, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
})
</script>

<template>
  <div class="fixed inset-0 z-0 bg-[#020617]">
    <TresCanvas alpha window-size power-preference="high-performance">
      <TresPerspectiveCamera ref="cameraRef" :position="[0, 0, 15]" :fov="45" />
      
      <TresAmbientLight :intensity="0.8" />
      <TresPointLight :position="[10, 10, 10]" :intensity="3" :color="'#22d3ee'" />
      <TresPointLight :position="[-10, -10, 10]" :intensity="2" :color="'#8b5cf6'" />

      <TresGroup ref="sceneGroup">
        <!-- The Ethereal Flow Field -->
        <TresInstancedMesh ref="instancedMeshRef" :args="[null, null, PARTICLE_COUNT]">
          <TresSphereGeometry :args="[1, 12, 12]" />
          <TresMeshStandardMaterial 
            :color="'#22d3ee'" 
            :emissive="'#67e8f9'" 
            :emissive-intensity="2"
            :transparent="true"
            :opacity="0.6"
            :blending="AdditiveBlending"
            :depth-write="false"
          />
        </TresInstancedMesh>

        <!-- Subtle Central Core Shimmers -->
        <TresMesh :position="[0, 0, -5]">
          <TresIcosahedronGeometry :args="[4, 1]" />
          <TresMeshStandardMaterial 
            :color="'#8b5cf6'" 
            :emissive="'#4c1d95'" 
            :emissive-intensity="0.5" 
            :transparent="true"
            :opacity="0.1"
            wireframe 
          />
        </TresMesh>
      </TresGroup>
    </TresCanvas>

    <!-- Visual Polish: Deep Space Vignette -->
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)] opacity-80" />
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/80" />
  </div>
</template>
