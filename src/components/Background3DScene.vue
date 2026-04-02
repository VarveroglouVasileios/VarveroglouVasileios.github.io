<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { useLoop, type LoopContext } from '@tresjs/core'
import {
  AdditiveBlending,
  Color,
  Group,
  InstancedMesh,
  MathUtils,
  Object3D,
  Vector3,
} from 'three'

export interface BackgroundPaletteColors {
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

defineProps<{
  colors: BackgroundPaletteColors
}>()

const instancedMeshRef = shallowRef<InstancedMesh | null>(null)
const sceneGroup = shallowRef<Group | null>(null)

const PARTICLE_COUNT = 1200
const tempObject = new Object3D()
const pointer = { x: 0, y: 0 }
const smooth = { x: 0, y: 0 }

const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
  pos: new Vector3(
    MathUtils.randFloatSpread(30),
    MathUtils.randFloatSpread(25),
    MathUtils.randFloatSpread(20) - 5,
  ),
  amplitude: MathUtils.randFloat(0.5, 2.5),
  speed: MathUtils.randFloat(0.2, 0.8),
  phase: Math.random() * Math.PI * 2,
  size: MathUtils.randFloat(0.02, 0.08),
}))

const onPointerMove = (e: PointerEvent): void => {
  pointer.x = (e.clientX / window.innerWidth - 0.5) * 2
  pointer.y = -(e.clientY / window.innerHeight - 0.5) * 2
}

const { onBeforeRender } = useLoop()
onBeforeRender((ctx: LoopContext) => {
  const { elapsed } = ctx
  const camera = ctx.camera.value
  smooth.x += (pointer.x - smooth.x) * 0.05
  smooth.y += (pointer.y - smooth.y) * 0.05

  if (instancedMeshRef.value) {
    particles.forEach((p, i) => {
      const t = elapsed * p.speed + p.phase
      const x = p.pos.x + Math.sin(t * 0.5) * p.amplitude
      const y = p.pos.y + Math.cos(t * 0.3) * p.amplitude
      const z = p.pos.z + Math.sin(t * 0.8) * (p.amplitude * 0.5)

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

  if (camera != null) {
    camera.position.x += (smooth.x * 3 - camera.position.x) * 0.04
    camera.position.y += (smooth.y * 2.5 - camera.position.y) * 0.04
    camera.lookAt(0, 0, -5)
  }
})

/** Satisfy vue-tsc Tres prop types; runtime accepts hex strings */
const cv = (hex: string): Color => hex as unknown as Color
const vv = (x: number, y: number, z: number) => new Vector3(x, y, z)
const instArgs = [undefined, undefined, PARTICLE_COUNT] as [undefined, undefined, number]

onMounted(() => {
  window.addEventListener('pointermove', onPointerMove, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
})
</script>

<template>
  <TresAmbientLight :intensity="0.8" />
  <TresPointLight :position="vv(10, 10, 10)" :intensity="3" :color="cv(colors.light1)" />
  <TresPointLight :position="vv(-10, -10, 10)" :intensity="2" :color="cv(colors.light2)" />

  <TresGroup ref="sceneGroup">
    <TresInstancedMesh ref="instancedMeshRef" :args="instArgs">
      <TresSphereGeometry :args="[1, 12, 12]" />
      <TresMeshStandardMaterial
        :color="cv(colors.particle)"
        :emissive="cv(colors.emissive)"
        :emissive-intensity="2"
        :transparent="true"
        :opacity="0.6"
        :blending="AdditiveBlending"
        :metalness="0.2"
        :roughness="0.45"
        :depth-write="false"
      />
    </TresInstancedMesh>

    <TresMesh :position="vv(0, 0, -5)">
      <TresIcosahedronGeometry :args="[4, 1]" />
      <TresMeshStandardMaterial
        :color="cv(colors.core)"
        :emissive="cv(colors.coreEm)"
        :emissive-intensity="0.5"
        :transparent="true"
        :opacity="0.12"
        wireframe
      />
    </TresMesh>
  </TresGroup>
</template>
