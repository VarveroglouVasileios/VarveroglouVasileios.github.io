<script setup lang="ts">
/**
 * Scene.vue — Cinematic 3D device (simplified: no Html to avoid context errors)
 */
import { useRenderLoop } from '@tresjs/core'
import { storeToRefs } from 'pinia'
import type { Group } from 'three'
import { shallowRef } from 'vue'
import { useScrollStore } from '@/stores/scroll'
import type { Project } from '@/types'

defineProps<{
  projects: Project[]
}>()

const scrollStore = useScrollStore()
const { deviceRotationY, deviceScale, deviceTiltX } = storeToRefs(scrollStore)
const deviceRef = shallowRef<Group | null>(null)

const { onLoop } = useRenderLoop()
onLoop(() => {
  const dev = deviceRef.value
  if (!dev) return
  dev.rotation.y = deviceRotationY.value
  dev.rotation.x = deviceTiltX.value
  dev.scale.setScalar(deviceScale.value)
})
</script>

<template>
  <TresPerspectiveCamera :position="[0, 0, 6]" :fov="50" />
  <TresAmbientLight :intensity="0.5" />
  <TresDirectionalLight :position="[4, 6, 8]" :intensity="1.2" />
  <TresDirectionalLight :position="[-3, 2, 4]" :intensity="0.5" />

  <TresGroup ref="deviceRef" :position="[0, 0, 0]">
    <TresMesh :position="[0, -0.9, 0]" :scale="[0.6, 0.08, 0.4]">
      <TresBoxGeometry />
      <TresMeshPhysicalMaterial color="#1c1917" :metalness="0.85" :roughness="0.25" />
    </TresMesh>
    <TresMesh :position="[0, -0.55, 0]" :scale="[0.12, 0.3, 0.08]">
      <TresBoxGeometry />
      <TresMeshPhysicalMaterial color="#292524" :metalness="0.9" :roughness="0.2" />
    </TresMesh>
    <TresMesh :position="[0, 0.15, 0]" :scale="[1.4, 0.9, 0.08]">
      <TresBoxGeometry />
      <TresMeshPhysicalMaterial color="#0c0a09" :metalness="0.92" :roughness="0.15" />
    </TresMesh>
    <!-- Screen: bright emissive so it's visible -->
    <TresMesh :position="[0, 0.15, 0.06]" :scale="[1.2, 0.72, 0.01]">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="#1e3a5f" :emissive="'#0ea5e9'" :emissive-intensity="0.3" />
    </TresMesh>
  </TresGroup>
</template>
