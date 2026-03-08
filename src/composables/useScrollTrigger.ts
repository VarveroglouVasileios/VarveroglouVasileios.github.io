/**
 * useScrollTrigger — GSAP ScrollTrigger logic for cinematic 3D device
 * Ties scroll position to device rotation, scale, tilt, and active project.
 */
import { useScrollStore } from '@/stores/scroll'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted } from 'vue'

gsap.registerPlugin(ScrollTrigger)

/**
 * Set up scroll-driven device animations.
 * Returns a cleanup function to call in onBeforeUnmount.
 * @param projectCount Number of project sections (for active index calculation)
 */
export function useScrollTrigger(projectCount: number) {
  const store = useScrollStore()
  let cleanup: (() => void) | null = null

  onMounted(() => {
    // Total scroll distance: hero + projects + contact (each ~100vh)
    const totalScrollHeight = Math.max(1, (projectCount + 2) * window.innerHeight - window.innerHeight)

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: `+=${totalScrollHeight}`,
      scrub: 1,
      onUpdate: (self) => {
        store.setScrollProgress(self.progress)
        store.setDeviceRotationY(self.progress * Math.PI * 0.4)
        store.setDeviceScale(1.15 - self.progress * 0.15)
        store.setDeviceTiltX(self.progress * 0.08)
        const projectProgress = Math.max(0, (self.progress * (projectCount + 2) - 1) / projectCount)
        const idx = Math.min(Math.floor(projectProgress * projectCount), projectCount - 1)
        store.setActiveProjectIndex(idx)
      },
    })

    cleanup = () => ScrollTrigger.getAll().forEach((t) => t.kill())
  })

  return {
    cleanup: () => cleanup?.(),
  }
}
