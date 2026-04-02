import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

export type BackgroundSectionKey =
  | 'hero'
  | 'about'
  | 'projects'
  | 'insights'
  | 'experience'
  | 'contact'

const SECTION_IDS: BackgroundSectionKey[] = [
  'hero',
  'about',
  'projects',
  'insights',
  'experience',
  'contact',
]

/**
 * Εντοπίζει ποια ενότητα είναι κοντά στο κέντρο της οθόνης για χρωματικά του 3D background.
 */
export function useScrollSectionTheme(): {
  activeSection: Ref<BackgroundSectionKey>
} {
  const activeSection = ref<BackgroundSectionKey>('hero')

  const update = (): void => {
    const focusY = window.innerHeight * 0.38
    let best: BackgroundSectionKey = 'hero'
    let bestDist = Number.POSITIVE_INFINITY

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (!el) continue
      const r = el.getBoundingClientRect()
      const mid = r.top + r.height / 2
      const d = Math.abs(mid - focusY)
      if (d < bestDist) {
        bestDist = d
        best = id
      }
    }
    activeSection.value = best
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
  })

  return { activeSection }
}
