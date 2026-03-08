<script setup lang="ts">
import type { Mesh } from 'three'
import { ref, shallowRef, watch } from 'vue'

const { position } = defineProps<{
  position: [number, number, number]
  title: string
}>()

const emit = defineEmits<{
  click: []
}>()

/** Mesh ref for pointer events; shallowRef avoids Vue reactivity on render loop */
const meshRef = shallowRef<Mesh | null>(null)
/** Emissive intensity: normal vs hover (glow) */
const emissiveIntensity = ref(0.1)
/** Scale: normal vs hover */
const scale = ref(1)

/** Hover state for animating emissive and scale */
const isHovered = ref(false)

watch(isHovered, (hovered) => {
  emissiveIntensity.value = hovered ? 0.6 : 0.1
  scale.value = hovered ? 1.15 : 1
})

function onPointerEnter() {
  isHovered.value = true
}

function onPointerLeave() {
  isHovered.value = false
}

function onClick() {
  emit('click')
}
</script>

<template>
  <TresGroup :position="position">
    <!-- Card: thin box (screen-like) facing camera; scale up on hover -->
    <TresMesh
      ref="meshRef"
      :scale="[1.2 * scale, 0.8 * scale, 0.02]"
      cast-shadow
      receive-shadow
      @pointer-enter="onPointerEnter"
      @pointer-leave="onPointerLeave"
      @click="onClick"
    >
      <TresBoxGeometry />
      <TresMeshStandardMaterial
        color="#1e293b"
        :emissive="'#0ea5e9'"
        :emissive-intensity="emissiveIntensity"
        :metalness="0.4"
        :roughness="0.6"
        :transparent="true"
        :opacity="0.9"
      />
    </TresMesh>

    <!-- Title label: small text plane (simplified as a brighter quad) -->
    <TresMesh
      :position="[0, -0.5, 0.02]"
      :scale="[0.9, 0.2, 0.01]"
    >
      <TresPlaneGeometry />
      <TresMeshBasicMaterial color="#94a3b8" />
    </TresMesh>
  </TresGroup>
</template>
