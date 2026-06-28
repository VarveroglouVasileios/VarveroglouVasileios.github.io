<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    text: string
    as?: string
    /** Χρόνος decode σε ms */
    duration?: number
    contentClass?: string
  }>(),
  { as: 'span', duration: 1400 },
)

const rootRef = ref<HTMLElement | null>(null)
const display = ref('')
const ran = ref(false)
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*█▓░'

let observer: IntersectionObserver | null = null
let raf = 0

const randomChar = (): string =>
  CHARSET[Math.floor(Math.random() * CHARSET.length)] ?? 'X'

function runDecode(final: string): void {
  cancelAnimationFrame(raf)
  const len = final.length
  const start = performance.now()
  const dur = props.duration

  const tick = (now: number): void => {
    const t = Math.min(1, (now - start) / dur)
    // Ease-out: αποκαλύπτει γρήγορα στο τέλος
    const eased = 1 - (1 - t) ** 2.4
    const cutoff = Math.floor(eased * len)
    let s = ''
    for (let i = 0; i < len; i++) {
      const ch = final[i] ?? ''
      if (ch === '\n') {
        s += '\n'
        continue
      }
      if (i < cutoff) {
        s += ch
      } else if (/\s/.test(ch)) {
        s += ch
      } else {
        s += randomChar()
      }
    }
    display.value = s
    if (t < 1) {
      raf = requestAnimationFrame(tick)
    } else {
      display.value = final
    }
  }
  raf = requestAnimationFrame(tick)
}

function startScramble(): void {
  ran.value = true
  display.value = props.text
    .split('')
    .map((c) => (/\s/.test(c) ? c : randomChar()))
    .join('')
  runDecode(props.text)
}

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function setupObserver(): void {
  observer?.disconnect()
  ran.value = false

  // Single source of truth: the real text is the default DOM content, so search
  // engines (which don't scroll to trigger the IntersectionObserver) always read
  // the genuine heading exactly once — never the scramble placeholder.
  display.value = props.text

  // Respect reduced-motion: keep the final text, skip the scramble entirely.
  if (prefersReducedMotion()) {
    ran.value = true
    return
  }

  const el = rootRef.value
  if (!el) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting || ran.value) return
      startScramble()
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  )
  observer.observe(el)
}

onMounted(setupObserver)

onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(raf)
})

watch(
  () => props.text,
  async () => {
    ran.value = false
    await nextTick()
    setupObserver()
  },
)
</script>

<template>
  <component
    :is="as"
    ref="rootRef"
    :class="contentClass"
    :aria-label="text"
  >
    <!--
      Single text node. Defaults to the real text (read once by crawlers) and is
      only transiently scrambled as a visual effect once scrolled into view.
    -->
    <span aria-hidden="true">{{ display }}</span>
  </component>
</template>
