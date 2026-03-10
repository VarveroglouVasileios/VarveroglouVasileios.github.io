<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Color, Mesh, Vector3 } from 'three'
import type { Group, PerspectiveCamera, PointLight } from 'three'

const sceneRoot = ref<Group | null>(null)
const cameraRef = ref<PerspectiveCamera | null>(null)
const coreMesh = ref<Mesh | null>(null)
const ringMesh = ref<Mesh | null>(null)
const cursorLight = ref<PointLight | null>(null)
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

// Bold orbit particles - fewer but larger, more dramatic
const orbitNodes: OrbitNode[] = Array.from({ length: 14 }, (_, i) => {
  const angle = (Math.PI * 2 * i) / 14 + i * 0.5
  const r = 3.5 + (i % 3) * 0.4
  return {
    id: i,
    basePosition: v3(Math.cos(angle) * r, Math.sin(angle) * r * 0.6, -2 + (i % 5) * 0.3),
    scale: 0.1 + (i % 4) * 0.025,
    color: c(i % 2 === 0 ? '#22d3ee' : '#a78bfa'),
    phase: i * 0.5,
    speed: 1.5 + i * 0.1,
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
  pointer.velocity = Math.min(1.5, Math.hypot(nx - prevPointer.x, ny - prevPointer.y) * 8)
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

  smooth.x += (pointer.x - smooth.x) * 0.08
  smooth.y += (pointer.y - smooth.y) * 0.08
  pointer.energy += (pointer.velocity - pointer.energy) * 0.15
  pointer.velocity *= 0.85

  // Scene tilts dramatically toward cursor
  root.rotation.y += 0.003 + pointer.energy * 0.008
  root.rotation.x = smooth.y * 0.45 + Math.sin(elapsed * 0.3) * 0.08
  root.rotation.z = smooth.x * 0.4

  // Central wireframe - scales and spins with cursor energy
  if (coreMesh.value) {
    coreMesh.value.rotation.y += 0.015 + pointer.energy * 0.04
    coreMesh.value.rotation.x += 0.006 + pointer.energy * 0.02
    const s = 1 + pointer.energy * 0.4 + Math.sin(elapsed * 0.8) * 0.08
    coreMesh.value.scale.setScalar(s)
  }

  // Ring - tilts and spins
  if (ringMesh.value) {
    ringMesh.value.rotation.x += 0.01 + pointer.energy * 0.015
    ringMesh.value.rotation.z += 0.006
  }

  // Cursor light - follows mouse, intensity spikes with movement
  if (cursorLight.value) {
    cursorLight.value.position.x += (smooth.x * 12 - cursorLight.value.position.x) * 0.12
    cursorLight.value.position.y += (-smooth.y * 10 - cursorLight.value.position.y) * 0.12
    cursorLight.value.intensity = 2 + pointer.energy * 4
  }

  // Orbit particles - strong parallax
  orbitNodes.forEach((node) => {
    const mesh = nodeRefs.get(node.id)
    if (!mesh) return
    const drift = Math.sin(elapsed * node.speed + node.phase) * 0.35
    const sway = Math.cos(elapsed * node.speed * 0.7 + node.phase) * 0.3
    mesh.position.x = node.basePosition.x + smooth.x * node.parallax + sway
    mesh.position.y = node.basePosition.y - smooth.y * node.parallax + drift
    mesh.position.z = node.basePosition.z + Math.sin(elapsed * 0.8 + node.phase) * 0.25
    const sc = node.scale * (1 + pointer.energy * 0.6 + Math.sin(elapsed * 2 + node.phase) * 0.15)
    mesh.scale.setScalar(sc)
  })

  // Camera - strong follow
  cam.position.x += (smooth.x * 2.5 - cam.position.x) * 0.1
  cam.position.y += (-smooth.y * 2 - cam.position.y) * 0.1
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
  <div class="fixed inset-0 -z-10">
    <TresCanvas :clear-color="'#020617'" window-size alpha>
      <TresPerspectiveCamera ref="cameraRef" :position="v3(0, 0, 12)" :fov="50" />

      <TresAmbientLight :intensity="0.35" />
      <TresPointLight :position="v3(3, 3, 5)" :intensity="1.2" :color="c('#22d3ee')" />
      <TresPointLight :position="v3(-3, -2, 4)" :intensity="0.9" :color="c('#a78bfa')" />
      <TresPointLight
        ref="cursorLight"
        :position="v3(0, 0, 8)"
        :intensity="2"
        :distance="25"
        :color="c('#67e8f9')"
      />

      <TresGroup ref="sceneRoot">
        <!-- Central wireframe focal point -->
        <TresMesh ref="coreMesh" :position="v3(0, 0, -1)">
          <TresIcosahedronGeometry :args="[1.4, 1]" />
          <TresMeshStandardMaterial
            :color="c('#22d3ee')"
            :emissive="c('#0891b2')"
            :emissive-intensity="0.7"
            wireframe
          />
        </TresMesh>

        <!-- Outer ring -->
        <TresMesh ref="ringMesh" :position="v3(0, 0, -1)" :rotation="v3(0.9, 0.2, 0)">
          <TresTorusGeometry :args="[2.4, 0.04, 16, 100]" />
          <TresMeshStandardMaterial
            :color="c('#67e8f9')"
            :emissive="c('#22d3ee')"
            :emissive-intensity="0.6"
          />
        </TresMesh>

        <!-- Orbit particles -->
        <TresMesh
          v-for="node in orbitNodes"
          :key="node.id"
          :ref="(el) => bindNode(node.id, el)"
          :position="node.basePosition"
          :scale="v3(node.scale, node.scale, node.scale)"
        >
          <TresSphereGeometry :args="[1, 16, 16]" />
          <TresMeshStandardMaterial
            :color="node.color"
            :emissive="node.color"
            :emissive-intensity="0.65"
          />
        </TresMesh>
      </TresGroup>
    </TresCanvas>
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/25 to-slate-950/65"
    />
  </div>
</template>
