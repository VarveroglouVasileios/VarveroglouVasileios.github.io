<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const aboutSection = ref<HTMLElement | null>(null)
const holoCards = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!aboutSection.value || !holoCards.value) return

  // Float cards dynamically
  const cards = holoCards.value.querySelectorAll('.holo-card')
  
  cards.forEach((card: any, i) => {
    // Initial reveal
    gsap.fromTo(card, 
      { opacity: 0, y: 100, rotateX: 20 },
      { 
        opacity: 1, 
        y: 0, 
        rotateX: 0, 
        duration: 1.5, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutSection.value,
          start: 'top 70%'
        },
        delay: i * 0.2
      }
    )

    // Continuous zero-gravity float
    gsap.to(card, {
      y: `-=${15 + (i * 5)}`,
      rotationZ: i % 2 === 0 ? 2 : -2,
      duration: 3 + i,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 1.5 // Start floating after entrance spawn
    })
  })
})
</script>

<template>
  <div ref="aboutSection" class="w-full min-h-screen flex flex-col justify-center relative">
    
    <!-- Central Header -->
    <div class="text-center mb-16 md:mb-32">
      <h2 class="text-xs uppercase tracking-[0.4em] text-orbit-glow font-bold mb-4">
        [ Commander Profile ]
      </h2>
      <h3 class="text-4xl md:text-6xl font-display uppercase font-bold text-white tracking-tight drop-shadow-2xl">
        Navigating the <br/>
        <span class="text-orbit-sun">Digital Expanse.</span>
      </h3>
    </div>

    <!-- Holographic Cards Stack -->
    <div ref="holoCards" class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 relative z-10">
      
      <!-- Card 1: Main Bio -->
      <div class="holo-card col-span-1 md:col-span-7 flex flex-col p-8 md:p-12 hologram-card rounded-3xl relative overflow-hidden group">
        <!-- Shine effect -->
        <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <h4 class="text-xs font-bold uppercase tracking-widest text-orbit-glow mb-6">Mission Log: Origin</h4>
        <p class="text-lg md:text-2xl text-white font-light leading-snug tracking-tight mb-6">
          I am a Full-Stack Engineer specializing in high-performance Vue 3 interfaces and resilient Node.js microservices.
        </p>
        <p class="text-sm md:text-base text-orbit-text/70 leading-relaxed font-light mt-auto">
          Like charting new constellations, building great software requires vision and precision. I bridge the gap between heavy backend architecture and fluid, WebGL-driven frontends, creating digital ecosystems that perform flawlessly in the vacuum of production.
        </p>
      </div>

      <!-- Card 2: Metrics/Stats -->
      <div class="holo-card col-span-1 md:col-span-5 flex flex-col gap-6">
        
        <div class="flex-1 p-8 hologram-card rounded-3xl flex flex-col justify-center items-center text-center relative overflow-hidden group">
          <div class="absolute inset-0 bg-gradient-to-tr from-orbit-sun/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span class="text-6xl font-display font-black text-white orbit-sun-glow tracking-tighter">5+</span>
          <span class="text-xs uppercase tracking-widest text-orbit-text mt-2 font-bold">Years in Orbit</span>
        </div>

        <div class="flex-1 p-8 hologram-card rounded-3xl flex flex-col justify-center items-center text-center relative overflow-hidden group">
          <div class="absolute inset-0 bg-gradient-to-tl from-orbit-glow/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span class="text-6xl font-display font-black text-white orbit-glow-text tracking-tighter">100</span>
          <span class="text-xs uppercase tracking-widest text-orbit-text mt-2 font-bold">% Mission Success</span>
        </div>

      </div>

    </div>

    <!-- Background decorative grids -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-20" 
         style="background-image: linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px); background-size: 100px 100px; transform: perspective(500px) rotateX(60deg); transform-origin: bottom;">
    </div>
    
  </div>
</template>
