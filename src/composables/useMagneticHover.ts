import { onBeforeUnmount } from 'vue'
import gsap from 'gsap'

export const useMagneticHover = (strength = 24) => {
  const listeners: Array<{
    element: HTMLElement
    onMove: (event: MouseEvent) => void
    onLeave: () => void
  }> = []

  const attach = (element: HTMLElement): void => {
    const onMove = (event: MouseEvent): void => {
      const bounds = element.getBoundingClientRect()
      const offsetX = event.clientX - bounds.left - bounds.width / 2
      const offsetY = event.clientY - bounds.top - bounds.height / 2

      gsap.to(element, {
        x: offsetX * 0.2,
        y: offsetY * 0.2,
        duration: 0.35,
        ease: 'power3.out',
      })
    }

    const onLeave = (): void => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.45,
        ease: 'power3.out',
      })
    }

    element.addEventListener('mousemove', onMove)
    element.addEventListener('mouseleave', onLeave)
    listeners.push({ element, onMove, onLeave })
  }

  onBeforeUnmount(() => {
    listeners.forEach(({ element, onMove, onLeave }) => {
      element.removeEventListener('mousemove', onMove)
      element.removeEventListener('mouseleave', onLeave)
    })
  })

  return {
    strength,
    attach,
  }
}
