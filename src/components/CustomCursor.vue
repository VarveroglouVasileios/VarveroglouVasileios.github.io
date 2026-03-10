<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const cursorDotRef = ref<HTMLElement | null>(null)
const cursorRingRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)

let mouseX = window.innerWidth / 2
let mouseY = window.innerHeight / 2
let dotX = mouseX
let dotY = mouseY
let ringX = mouseX
let ringY = mouseY

const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
  
  // Immediately snap dot on first move if it was centered
  if (Math.abs(dotX - window.innerWidth / 2) < 1 && Math.abs(dotY - window.innerHeight / 2) < 1) {
    dotX = mouseX
    dotY = mouseY
    ringX = mouseX
    ringY = mouseY
  }
}

let requestRef: number

const render = () => {
  // Fast interpolation for dot
  dotX += (mouseX - dotX) * 0.4
  dotY += (mouseY - dotY) * 0.4
  
  // Slower interpolation for trailing ring
  ringX += (mouseX - ringX) * 0.15
  ringY += (mouseY - ringY) * 0.15
  
  if (cursorDotRef.value) {
    gsap.set(cursorDotRef.value, { x: dotX, y: dotY })
  }
  if (cursorRingRef.value) {
    gsap.set(cursorRingRef.value, { x: ringX, y: ringY })
  }
  
  requestRef = requestAnimationFrame(render)
}

const onMouseEnterHoverable = (e: Event) => {
  const el = e.target as HTMLElement
  const hoverText = el.getAttribute('data-cursor-text') || el.closest('[data-cursor-text]')?.getAttribute('data-cursor-text')

  if (cursorRingRef.value) {
    gsap.to(cursorRingRef.value, { 
      scale: hoverText ? 4 : 2,
      opacity: hoverText ? 1 : 0.8,
      borderColor: hoverText ? 'transparent' : 'var(--color-quantum-neon)',
      backgroundColor: hoverText ? 'rgba(0,0,0,0.8)' : 'transparent',
      backdropFilter: hoverText ? 'blur(10px)' : 'none',
      duration: 0.4, 
      ease: 'power3.out' 
    })
  }

  if (cursorDotRef.value) {
    gsap.to(cursorDotRef.value, {
      scale: 0, // hide dot, ring becomes main
      duration: 0.3
    })
  }

  if (textRef.value && hoverText) {
    textRef.value.innerText = hoverText
    gsap.to(textRef.value, { opacity: 1, duration: 0.3 })
  }
}

const onMouseLeaveHoverable = () => {
  if (cursorRingRef.value) {
    gsap.to(cursorRingRef.value, { 
      scale: 1, 
      opacity: 0.4,
      borderColor: '#ffffff',
      backgroundColor: 'transparent',
      backdropFilter: 'none',
      duration: 0.4, 
      ease: 'power3.out' 
    })
  }

  if (cursorDotRef.value) {
    gsap.to(cursorDotRef.value, {
      scale: 1,
      duration: 0.3
    })
  }

  if (textRef.value) {
    gsap.to(textRef.value, { opacity: 0, duration: 0.2, onComplete: () => { textRef.value!.innerText = '' } })
  }
}

let observer: MutationObserver | null = null

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  requestRef = requestAnimationFrame(render)

  const attachHoverListeners = () => {
    const hoverables = document.querySelectorAll('a, button, .hoverable, input, textarea')
    hoverables.forEach(el => {
      el.removeEventListener('mouseenter', onMouseEnterHoverable)
      el.removeEventListener('mouseleave', onMouseLeaveHoverable)
      el.addEventListener('mouseenter', onMouseEnterHoverable)
      el.addEventListener('mouseleave', onMouseLeaveHoverable)
    })
  }
  
  setTimeout(attachHoverListeners, 500)

  // Use MutationObserver for dynamic elements
  observer = new MutationObserver((mutations) => {
    let shouldAttach = false
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length > 0) shouldAttach = true
    })
    if (shouldAttach) attachHoverListeners()
  })

  observer.observe(document.body, { childList: true, subtree: true })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(requestRef)
  
  if (observer) observer.disconnect()

  const hoverables = document.querySelectorAll('a, button, .hoverable, input, textarea')
  hoverables.forEach(el => {
    el.removeEventListener('mouseenter', onMouseEnterHoverable)
    el.removeEventListener('mouseleave', onMouseLeaveHoverable)
  })
})
</script>

<template>
  <!-- Removing mix-blend-difference allows full custom coloring (neon, black blur, white) rather than forced inversion -->
  <div class="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
    
    <!-- Trailing Ring & Text Wrapper -->
    <div 
      ref="cursorRingRef" 
      class="absolute top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border border-white opacity-40 flex items-center justify-center will-change-transform z-40 transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
    >
      <span ref="textRef" class="text-[var(--color-quantum-neon)] font-display font-black text-[6px] uppercase tracking-widest opacity-0 whitespace-nowrap absolute"></span>
    </div>

    <!-- Main Solid Dot -->
    <div 
      ref="cursorDotRef" 
      class="absolute top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-white will-change-transform z-50 drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
    ></div>

  </div>
</template>
