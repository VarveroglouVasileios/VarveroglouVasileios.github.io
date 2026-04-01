<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Color, Mesh, Vector3 } from 'three'
import type { Group, PerspectiveCamera, PointLight } from 'three'

const sceneRoot = shallowRef<Group | null>(null)
const cameraRef = shallowRef<PerspectiveCamera | null>(null)
const coreMesh = shallowRef<Mesh | null>(null)
const ringMesh = shallowRef<Mesh | null>(null)
const cursorLight = shallowRef<PointLight | null>(null)
const nodeRefs = new Map<number, Mesh>()

interface OrbitNode {
  id: number
  basePosition: Vector3
  scale: number
  color: Color
  phase: number
  speed: number
  parallax: number
}

const pointer = { x: 0, y: 0, velocity: 0, energy: 0 }
const smooth = { x: 0, y: 0 }
const prevPointer = { x: 0, y: 0 }

const v3 = (x: number, y: number, z: number): Vector3 => new Vector3(x, y, z)
const c = (hex: string): Color => new Color(hex)

// Reduced count for better mobile performance (10 nodes)
const orbitNodes: OrbitNode[] = Array.from({ length: 10 }, (_, i) => {
  const angle = (Math.PI * 2 * i) / 10 + i * 0.5
  const r = 3.5 + (i % 3) * 0.4
  return {
    id: i,
    basePosition: v3(Math.cos(angle) * r, Math.sin(angle) * r * 0.6, -2 + (i % 5) * 0.3),
    scale: 0.12 + (i % 4) * 0.03,
    color: c(i % 2 === 0 ? '#22d3ee' : '#a78bfa'),
    phase: i * 0.5,
    speed: 1.2 + i * 0.1,
    parallax: 0.8 + (i % 3) * 0.2,
  }
})

const bindNode = (id: number, el: unknown): void => {
  if (el instanceof Mesh) nodeRefs.set(id, el)
  else nodeRefs.delete(id)
}

const onPointerMove = (e: PointerEvent): void => {
  const nx = (e.clientX / window.innerWidth - 0.5) * 2
  const ny = (e.clientY / window.innerHeight - 0.5) * 2
  pointer.velocity = Math.min(1.2, Math.hypot(nx - prevPointer.x, ny - prevPointer.y) * 6)
  prevPointer.x = nx
  prevPointer.y = ny
  pointer.x = nx
  pointer.y = ny
}

const { onLoop } = useRenderLoop()
onLoop((state: { elapsed: number }) => {
  const { elapsed } = state
  const root = sceneRoot.value
  const cam = cameraRef.value
  if (!root || !cam) return

  // Smooth lerping
  smooth.x += (pointer.x - smooth.x) * 0.06
  smooth.y += (pointer.y - smooth.y) * 0.06
  pointer.energy += (pointer.velocity - pointer.energy) * 0.12
  pointer.velocity *= 0.82

  root.rotation.y += 0.002 + pointer.energy * 0.006
  root.rotation.x = smooth.y * 0.35 + Math.sin(elapsed * 0.25) * 0.06
  root.rotation.z = smooth.x * 0.35

  if (coreMesh.value) {
    coreMesh.value.rotation.y += 0.012 + pointer.energy * 0.03
    coreMesh.value.rotation.x += 0.005 + pointer.energy * 0.015
    const s = 1 + pointer.energy * 0.35 + Math.sin(elapsed * 0.7) * 0.07
    coreMesh.value.scale.setScalar(s)
  }

  if (ringMesh.value) {
    ringMesh.value.rotation.x += 0.008 + pointer.energy * 0.012
    ringMesh.value.rotation.z += 0.005
  }

  if (cursorLight.value) {
    cursorLight.value.position.x += (smooth.x * 12 - cursorLight.value.position.x) * 0.1
    cursorLight.value.position.y += (-smooth.y * 10 - cursorLight.value.position.y) * 0.1
    cursorLight.value.intensity = 1.5 + pointer.energy * 3
  }

  orbitNodes.forEach((node) => {
    const mesh = nodeRefs.get(node.id)
    if (!mesh) return
    const drift = Math.sin(elapsed * node.speed + node.phase) * 0.3
    const sway = Math.cos(elapsed * node.speed * 0.6 + node.phase) * 0.25
    mesh.position.x = node.basePosition.x + smooth.x * node.parallax + sway
    mesh.position.y = node.basePosition.y - smooth.y * node.parallax + drift
    mesh.position.z = node.basePosition.z + Math.sin(elapsed * 0.6 + node.phase) * 0.2
    const sc = node.scale * (1 + pointer.energy * 0.5 + Math.sin(elapsed * 1.8 + node.phase) * 0.12)
    mesh.scale.setScalar(sc)
  })

  cam.position.x += (smooth.x * 2 - cam.position.x) * 0.08
  cam.position.y += (-smooth.y * 1.8 - cam.position.y) * 0.08
  cam.lookAt(0, 0, -1)
})

onMounted(() => {
  window.addEventListener('pointermove', onPointerMove, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-0 bg-[#020617]">
    <TresCanvas window-size alpha power-preference="high-performance">
      <TresPerspectiveCamera ref="cameraRef" :position="v3(0, 0, 12)" :fov="48" />

      <TresAmbientLight :intensity="0.4" />
      <TresPointLight :position="v3(5, 5, 5)" :intensity="1.2" :color="c('#22d3ee')" />
      <TresPointLight :position="v3(-5, -5, 5)" :intensity="1.0" :color="c('#a78bfa')" />
      <TresPointLight
        ref="cursorLight"
        :position="v3(0, 0, 8)"
        :intensity="2"
        :distance="25"
        :color="c('#67e8f9')"
      />

      <TresGroup ref="sceneRoot">
        <TresMesh ref="coreMesh" :position="v3(0, 0, -1)">
          <TresIcosahedronGeometry :args="[1.4, 1]" />
          <TresMeshStandardMaterial
            :color="c('#22d3ee')"
            :emissive="c('#0891b2')"
            :emissive-intensity="1.0"
            wireframe
          />
        </TresMesh>

        <TresMesh ref="ringMesh" :position="v3(0, 0, -1)" :rotation="v3(0.9, 0.2, 0)">
          <TresTorusGeometry :args="[2.4, 0.03, 12, 64]" />
          <TresMeshStandardMaterial
            :color="c('#67e8f9')"
            :emissive="c('#22d3ee')"
            :emissive-intensity="0.8"
          />
        </TresMesh>

        <TresMesh
          v-for="particle in orbitNodes"
          :key="particle.id"
          :ref="(el) => bindNode(particle.id, el)"
          :position="particle.basePosition"
          :scale="v3(particle.scale, particle.scale, particle.scale)"
        >
          <TresSphereGeometry :args="[1, 12, 12]" />
          <TresMeshStandardMaterial
            :color="particle.color"
            :emissive="particle.color"
            :emissive-intensity="1.0"
          />
        </TresMesh>
      </TresGroup>
    </TresCanvas>
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/25 to-slate-950/65"
    />
  </div>
</template>
