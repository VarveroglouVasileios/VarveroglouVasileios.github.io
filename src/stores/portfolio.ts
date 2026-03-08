import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import type { Project, SocialLink } from '@/types'

/** Manages UI overlays and 3D scene state */
export const usePortfolioStore = defineStore('portfolio', () => {
  /** Currently selected card (null = no overlay) */
  const activeCard = shallowRef<Project | SocialLink | null>(null)
  /** Camera zoom-in animation in progress */
  const isZooming = ref(false)
  /** Orbital rotation from scroll (radians) */
  const orbitalRotation = ref(0)

  function setActiveCard(card: Project | SocialLink | null) {
    activeCard.value = card
  }

  function setZooming(value: boolean) {
    isZooming.value = value
  }

  function setOrbitalRotation(angle: number) {
    orbitalRotation.value = angle
  }

  return {
    activeCard,
    isZooming,
    orbitalRotation,
    setActiveCard,
    setZooming,
    setOrbitalRotation,
  }
})
