import { defineStore } from 'pinia'
import { ref } from 'vue'

/** Manages scroll-driven 3D device state for cinematic portfolio */
export const useScrollStore = defineStore('scroll', () => {
  /** Scroll progress 0–1 across all sections */
  const scrollProgress = ref(0)
  /** Index of the currently "active" project section (drives device screen content) */
  const activeProjectIndex = ref(0)
  /** Device rotation Y (radians) – driven by scroll */
  const deviceRotationY = ref(0)
  /** Device scale – subtle zoom on hero */
  const deviceScale = ref(1)
  /** Device tilt X (radians) – subtle perspective change */
  const deviceTiltX = ref(0)

  function setScrollProgress(value: number) {
    scrollProgress.value = Math.max(0, Math.min(1, value))
  }

  function setActiveProjectIndex(index: number) {
    activeProjectIndex.value = Math.max(0, index)
  }

  function setDeviceRotationY(rad: number) {
    deviceRotationY.value = rad
  }

  function setDeviceScale(scale: number) {
    deviceScale.value = scale
  }

  function setDeviceTiltX(rad: number) {
    deviceTiltX.value = rad
  }

  return {
    scrollProgress,
    activeProjectIndex,
    deviceRotationY,
    deviceScale,
    deviceTiltX,
    setScrollProgress,
    setActiveProjectIndex,
    setDeviceRotationY,
    setDeviceScale,
    setDeviceTiltX,
  }
})
