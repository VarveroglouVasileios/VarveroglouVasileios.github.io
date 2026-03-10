<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const marqueeTrack = ref<HTMLElement | null>(null)

const techStack = [
  'VUE 3', 'NODE.JS', 'TRESJS', 'GSAP', 'TYPESCRIPT', 
  'TAILWIND', 'THREE.JS', 'GRAPHQL', 'PINIA', 'VITE',
  'EXPRESS', 'POSTGRES', 'REDIS', 'DOCKER', 'AWS'
]

// Duplicate array to ensure perfect seamless loop without empty space
const duplicatedStack = [...techStack, ...techStack, ...techStack]

onMounted(() => {
  if (!marqueeTrack.value) return

  // Continuous infinite marquee
  const trackWidth = marqueeTrack.value.scrollWidth / 3

  gsap.to(marqueeTrack.value, {
    x: `-=${trackWidth}`,
    duration: 30, // Extremely slow, majestic orbit pace
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % trackWidth)
    }
  })

  // Scrub direction change on scroll (speeds up/reverses during scroll jump)
  let scrollTimeout: ReturnType<typeof setTimeout>
  
  ScrollTrigger.create({
    trigger: '#skills',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      // Temporarily speed up the track relative to scroll velocity
      const velocity = self.getVelocity()
      gsap.to(marqueeTrack.value, {
        timeScale: 1 + (velocity / 100), 
        duration: 0.2, // Quick reaction
        overwrite: true
      })
      
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        gsap.to(marqueeTrack.value, { timeScale: 1, duration: 1 }) // Return to normal majestic speed
      }, 50)
    }
  })
})
</script>

<template>
  <div class="relative w-full h-full flex flex-col justify-center select-none overflow-hidden">
    
    <!-- Title / Setup -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 text-center w-full z-10 px-4 pt-8">
      <h2 class="text-xs font-bold tracking-[0.5em] text-orbit-glow uppercase opacity-80 mb-2">
        Core Competencies
      </h2>
    </div>

    <!-- Massive Marquee -->
    <div class="flex overflow-hidden whitespace-nowrap mt-12 py-12 relative z-0">
      <div 
        ref="marqueeTrack" 
        class="flex gap-16 md:gap-32 will-change-transform"
      >
        <div 
          v-for="(tech, index) in duplicatedStack" 
          :key="index"
          class="text-5xl md:text-8xl lg:text-[10vw] font-display font-black text-transparent opacity-40 uppercase tracking-tighter"
          style="-webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);"
        >
          {{ tech }}
        </div>
      </div>
    </div>

    <!-- Centered Holographic Overlay -->
    <div class="absolute inset-0 pointer-events-none flex justify-center items-center z-20">
      <div class="w-full max-w-4xl h-full bg-gradient-to-r from-orbit-core/90 via-transparent to-orbit-core/90"></div>
    </div>

  </div>
</template>
