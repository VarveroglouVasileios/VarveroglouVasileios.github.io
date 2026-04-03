<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'

const DOC_CLASS = 'custom-cursor-desktop'

const cursor = ref<HTMLElement | null>(null)
const follower = ref<HTMLElement | null>(null)

const moveCursor = (e: MouseEvent): void => {
  gsap.to(cursor.value, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
    ease: 'power2.out',
  })
  gsap.to(follower.value, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.3,
    ease: 'power2.out',
  })
}

const onMouseMove = (e: MouseEvent): void => {
  const target = e.target as HTMLElement
  const large = target.closest('[data-cursor="lg"]')
  const clickable = target.closest(
    'a, button, input, textarea, select, [role="button"], .clickable',
  )

  let scale = 1
  let bg = 'transparent'
  let border = 'rgba(34, 211, 238, 0.3)'

  if (large) {
    scale = 3
    bg = 'rgba(34, 211, 238, 0.12)'
    border = 'rgba(34, 211, 238, 0.45)'
  } else if (clickable) {
    scale = 2.4
    bg = 'rgba(34, 211, 238, 0.15)'
    border = 'rgba(34, 211, 238, 0.5)'
  }

  gsap.to(follower.value, {
    scale,
    backgroundColor: bg,
    borderColor: border,
    duration: 0.25,
    ease: 'power2.out',
    overwrite: 'auto',
  })

  moveCursor(e)
}

let removeMqListener: (() => void) | undefined

onMounted(() => {
  const mq = window.matchMedia('(min-width: 768px)')
  const syncHideNative = (): void => {
    document.documentElement.classList.toggle(DOC_CLASS, mq.matches)
  }
  syncHideNative()
  mq.addEventListener('change', syncHideNative)
  window.addEventListener('mousemove', onMouseMove)
  removeMqListener = () => mq.removeEventListener('change', syncHideNative)
})

onBeforeUnmount(() => {
  removeMqListener?.()
  document.documentElement.classList.remove(DOC_CLASS)
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <!-- Above SecurityTerminal (z-10000) and project breakdown dialog (z-20000); keep native cursor hidden site-wide. -->
  <div class="pointer-events-none fixed inset-0 z-[30000] hidden md:block">
    <div
      ref="cursor"
      class="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
    />
    <div
      ref="follower"
      class="fixed left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/30 transition-transform duration-100 ease-out"
    />
  </div>
</template>
