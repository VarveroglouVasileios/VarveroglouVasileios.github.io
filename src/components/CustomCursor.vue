<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const cursorRef = ref<HTMLElement | null>(null)
const dotRef = ref<HTMLElement | null>(null)

let mouseX = 0
let mouseY = 0
let cursorX = 0
let cursorY = 0

const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
  
  // Snap small dot immediately
  if (dotRef.value) {
    gsap.set(dotRef.value, { x: mouseX, y: mouseY })
  }
}

let requestRef: number

const render = () => {
  // Smoothly interpolate the outer ring towards the mouse
  cursorX += (mouseX - cursorX) * 0.15
  cursorY += (mouseY - cursorY) * 0.15
  
  if (cursorRef.value) {
    gsap.set(cursorRef.value, { x: cursorX, y: cursorY })
  }
  
  requestRef = requestAnimationFrame(render)
}

const onMouseEnterHoverable = () => {
  if (cursorRef.value) {
    gsap.to(cursorRef.value, { scale: 2.5, backgroundColor: 'rgba(255,255,255,0.1)', duration: 0.3, ease: 'power2.out' })
  }
  if (dotRef.value) {
    gsap.to(dotRef.value, { scale: 0, duration: 0.2 })
  }
}

const onMouseLeaveHoverable = () => {
  if (cursorRef.value) {
    gsap.to(cursorRef.value, { scale: 1, backgroundColor: 'transparent', duration: 0.3, ease: 'power2.out' })
  }
  if (dotRef.value) {
    gsap.to(dotRef.value, { scale: 1, duration: 0.2 })
  }
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  requestRef = requestAnimationFrame(render)

  // Attach hover listeners globally to a/button/hoverables
  const attachHoverListeners = () => {
    const hoverables = document.querySelectorAll('a, button, .hoverable, input, textarea')
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterHoverable)
      el.addEventListener('mouseleave', onMouseLeaveHoverable)
    })
  }
  
  // Small delay to ensure DOM is rendered before attaching
  setTimeout(attachHoverListeners, 500)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(requestRef)
  
  const hoverables = document.querySelectorAll('a, button, .hoverable, input, textarea')
  hoverables.forEach(el => {
    el.removeEventListener('mouseenter', onMouseEnterHoverable)
    el.removeEventListener('mouseleave', onMouseLeaveHoverable)
  })
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-[9999] overflow-hidden mix-blend-difference">
    <!-- Outer trailing ring -->
    <div 
      ref="cursorRef" 
      class="absolute top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-white/50 transition-colors"
      style="will-change: transform;"
    ></div>
    <!-- Inner immediate dot -->
    <div 
      ref="dotRef" 
      class="absolute top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-white rounded-full"
      style="will-change: transform;"
    ></div>
  </div>
</template>
