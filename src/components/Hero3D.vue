<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import * as THREE from 'three'
import gsap from 'gsap'

onMounted(() => {
  
  // Staggered Kinetic Typography Reveal
  const lines = document.querySelectorAll('.kinetic-line')
  
  lines.forEach((line) => {
    const text = (line as HTMLElement).innerText
    line.innerHTML = ''
    
    const chars = text.split('')
    chars.forEach((char) => {
      const charSpan = document.createElement('span')
      charSpan.innerText = char === ' ' ? '\u00A0' : char
      charSpan.style.display = 'inline-block'
      charSpan.style.transform = 'translateY(110%) rotate(5deg)'
      charSpan.style.opacity = '0'
      charSpan.style.transformOrigin = 'bottom left'
      
      const wrapperSpan = document.createElement('span')
      wrapperSpan.style.display = 'inline-block'
      wrapperSpan.style.overflow = 'hidden'
      wrapperSpan.appendChild(charSpan)
      
      line.appendChild(wrapperSpan)
    })
  })

  // Animate all characters in the layout
  gsap.to('.kinetic-line span > span', {
    y: '0%',
    rotate: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.02,
    ease: 'power4.out',
    delay: 0.2
  })
})

// WebGL Liquid/Silk Background Geometry
const planeRef = shallowRef<THREE.Mesh | null>(null)
let animationFrameId: number

onMounted(() => {
  const startTime = Date.now()
  
  const loop = () => {
    const elapsed = (Date.now() - startTime) / 1000
    
    if (planeRef.value && planeRef.value.geometry) {
      const position = planeRef.value.geometry.attributes.position
      
      if (!position) return

      const vertex = new THREE.Vector3()
      
      for (let i = 0; i < position.count; i++) {
        vertex.fromBufferAttribute(position, i)
        
        // Complex sine wave math for silky liquid motion
        vertex.z = Math.sin(vertex.x * 2 + elapsed) * 0.5 
                 + Math.cos(vertex.y * 1.5 + elapsed * 0.8) * 0.5
                 
        position.setZ(i, vertex.z)
      }
      
      position.needsUpdate = true
      
      // Gently tilt the entire plane
      planeRef.value.rotation.x = -Math.PI / 4 + Math.sin(elapsed * 0.2) * 0.1
      planeRef.value.rotation.y = Math.sin(elapsed * 0.1) * 0.1
    }
    
    animationFrameId = requestAnimationFrame(loop)
  }
  
  loop()
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
})
</script>

<template>
  <div class="relative w-full h-full overflow-hidden bg-[var(--color-studio-bg)] select-none">
    
    <!-- Fluid WebGL Background -->
    <div class="absolute inset-0 z-0 opacity-80 mix-blend-multiply filter blur-sm">
      <TresCanvas clear-color="transparent" window-size alpha>
        <TresPerspectiveCamera :position="[0, 0, 15]" :fov="45" />
        
        <OrbitControls 
          :enable-zoom="false"
          :enable-pan="false"
          :auto-rotate="false"
        />
        
        <TresAmbientLight :intensity="2" color="#ffffff" />
        <TresDirectionalLight :position="[5, 5, 5]" :intensity="3" color="#f4f4f0" />

        <TresMesh ref="planeRef" :position="[0, 0, 0]">
          <!-- High segment count for smooth waving -->
          <TresPlaneGeometry :args="[40, 40, 64, 64]" />
          <TresMeshStandardMaterial 
            color="#dcdbcf" 
            :roughness="0.2"
            :metalness="0.1"
            :flatShading="false"
            :side="2"
          />
        </TresMesh>
      </TresCanvas>
    </div>

    <!-- Foreground Content (Kinetic Typography) -->
    <div class="relative z-10 w-full h-screen flex flex-col justify-center items-center md:items-start px-4 md:px-12 lg:px-24 pointer-events-none mt-16 md:mt-0">
      
      <div class="mb-4">
        <p class="text-[var(--color-studio-accent)] font-sans font-bold uppercase tracking-[0.2em] text-sm md:text-base">
          Vasileios Varveroglou
        </p>
      </div>

      <div class="flex flex-col text-[12vw] md:text-[9vw] font-display font-black uppercase tracking-tighter leading-[0.85] text-[var(--color-studio-text)] mix-blend-darken">
        <h1 class="kinetic-line m-0 p-0 text-left w-full relative">Creative</h1>
        <h1 class="kinetic-line m-0 p-0 text-left w-full ml-0 md:ml-32">Developer</h1>
      </div>
      
    </div>
    
  </div>
</template>
