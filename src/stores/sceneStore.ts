import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import type { CameraTarget, OrbitalItem } from '../types'
import type { Camera } from 'three'

/**
 * Global scene store.
 * Manages which card is "active" (zoomed in), overlay visibility,
 * and the shared Three.js camera reference for GSAP animations.
 */
export const useSceneStore = defineStore('scene', () => {
  // The currently focused orbital item (null = none)
  const activeItem = ref<OrbitalItem | null>(null)

  // Whether the detail overlay panel is visible
  const overlayVisible = ref(false)

  // Orbit rotation offset driven by mouse-wheel scroll (radians)
  const orbitRotation = ref(0)

  // Shared camera ref (set from Experience.vue) – shallowRef avoids deep reactivity
  const camera = shallowRef<Camera | null>(null)

  // Target camera position/lookAt set before GSAP animation starts
  const cameraTarget = ref<CameraTarget | null>(null)

  /** Open the detail overlay for the given item */
  function openItem(item: OrbitalItem) {
    activeItem.value = item
    overlayVisible.value = true
  }

  /** Close overlay and reset camera target */
  function closeItem() {
    overlayVisible.value = false
    // Slight delay so the overlay fade-out completes before clearing the item
    setTimeout(() => {
      activeItem.value = null
      cameraTarget.value = null
    }, 400)
  }

  /** Advance the orbit rotation by delta radians */
  function rotateOrbit(delta: number) {
    orbitRotation.value += delta
  }

  return {
    activeItem,
    overlayVisible,
    orbitRotation,
    camera,
    cameraTarget,
    openItem,
    closeItem,
    rotateOrbit,
  }
})
