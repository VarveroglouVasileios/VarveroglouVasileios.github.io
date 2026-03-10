<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Activity, Code2, Database } from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

const aboutSection = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement | null>(null)
const revealTextRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!aboutSection.value || !headerRef.value || !cardsRef.value || !revealTextRef.value) return

  // Section Header Reveal
  gsap.fromTo(headerRef.value,
    { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)', y: 30 },
    {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: aboutSection.value,
        start: 'top 80%'
      }
    }
  )

  // Floating Glass Cards Reveal
  const cards = cardsRef.value.querySelectorAll('.glass-card')
  gsap.fromTo(cards,
    { opacity: 0, y: 50, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: cardsRef.value,
        start: 'top 75%'
      }
    }
  )

  // Awwwards Word-by-Word Scrub Reveal
  const text = revealTextRef.value.innerText
  revealTextRef.value.innerHTML = ''
  
  const words = text.split(' ')
  words.forEach(word => {
    const span = document.createElement('span')
    span.innerText = word + ' '
    span.className = 'opacity-20 transition-colors duration-300'
    revealTextRef.value?.appendChild(span)
  })

  gsap.to(revealTextRef.value.children, {
    opacity: 1,
    color: '#ffffff',
    textShadow: '0 0 10px rgba(255,255,255,0.8)',
    stagger: 0.1,
    ease: 'none',
    scrollTrigger: {
      trigger: revealTextRef.value,
      start: 'top 80%',
      end: 'bottom 40%',
      scrub: 0.5
    }
  })
})
</script>

<template>
  <div ref="aboutSection" class="w-full relative py-24 flex flex-col justify-center min-h-screen z-10">
    
    <div class="mb-16 md:mb-24 flex justify-between items-end border-b border-[var(--color-quantum-muted)] pb-6">
      <h2 
        ref="headerRef"
        class="text-4xl md:text-7xl font-display uppercase font-black text-[var(--color-quantum-text)] tracking-tighter drop-shadow-[0_0_20px_rgba(0,0,0,1)]"
      >
        System.Bio
      </h2>
      <span class="text-[var(--color-quantum-neon)] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
        [ Core Capabilities ]
      </span>
    </div>

    <!-- Massive Text Reveal -->
    <div class="w-full max-w-6xl mx-auto mb-32 z-10 relative">
      <p 
        ref="revealTextRef" 
        class="text-3xl md:text-5xl lg:text-7xl font-display font-bold uppercase tracking-tighter leading-tight text-white drop-shadow-[0_0_20px_rgba(0,0,0,1)]"
      >
        I architect extremely resilient user interfaces and horizontally scalable microservices capable of delivering massive data payloads with zero latency.
      </p>
    </div>

    <!-- Stark Glassmorphism Grid -->
    <div ref="cardsRef" class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
      
      <!-- Card 1 -->
      <div class="glass-card p-10 md:p-12 rounded-sm flex flex-col justify-between group hover:border-[var(--color-quantum-neon)] transition-colors duration-500 min-h-[400px]">
        <div class="mb-12">
          <Code2 class="w-10 h-10 text-[var(--color-quantum-muted)] group-hover:text-[var(--color-quantum-neon)] transition-colors duration-500 mb-8" />
          <h3 class="text-2xl font-display font-bold uppercase tracking-tight mb-4 group-hover:text-[var(--color-quantum-neon)] transition-colors">
            Frontend Architecture
          </h3>
          <p class="text-[var(--color-quantum-muted)] font-sans leading-relaxed text-sm md:text-base">
            Constructing highly resilient, component-driven interfaces using Vue 3. Focused on microscopic performance optimization and flawless kinetic rendering.
          </p>
        </div>
        <div class="h-[2px] w-12 bg-[var(--color-quantum-muted)] group-hover:bg-[var(--color-quantum-neon)] transition-colors duration-500 group-hover:w-full"></div>
      </div>

      <!-- Card 2 -->
      <div class="glass-card p-10 md:p-12 rounded-sm flex flex-col justify-between group hover:border-[var(--color-quantum-magenta)] transition-colors duration-500 min-h-[400px]">
        <div class="mb-12">
          <Database class="w-10 h-10 text-[var(--color-quantum-muted)] group-hover:text-[var(--color-quantum-magenta)] transition-colors duration-500 mb-8" />
          <h3 class="text-2xl font-display font-bold uppercase tracking-tight mb-4 group-hover:text-[var(--color-quantum-magenta)] transition-colors">
            Node Infrastructure
          </h3>
          <p class="text-[var(--color-quantum-muted)] font-sans leading-relaxed text-sm md:text-base">
            Designing horizontally scalar microservices. Writing severe, type-safe backend architectures capable of handling massive telemetry and data payloads.
          </p>
        </div>
        <div class="h-[2px] w-12 bg-[var(--color-quantum-muted)] group-hover:bg-[var(--color-quantum-magenta)] transition-colors duration-500 group-hover:w-full"></div>
      </div>

      <!-- Card 3 -->
      <div class="glass-card p-10 md:p-12 rounded-sm flex flex-col justify-between group hover:border-white transition-colors duration-500 min-h-[400px]">
        <div class="mb-12">
          <Activity class="w-10 h-10 text-[var(--color-quantum-muted)] group-hover:text-white transition-colors duration-500 mb-8" />
          <h3 class="text-2xl font-display font-bold uppercase tracking-tight mb-4 group-hover:text-white transition-colors">
            WebGL & Physics
          </h3>
          <p class="text-[var(--color-quantum-muted)] font-sans leading-relaxed text-sm md:text-base">
            Pushing the boundaries of the browser canvas. Utilizing TresJS, custom GLSL shaders, and complex mathematics to deliver uncompromising Wow factors.
          </p>
        </div>
        <div class="h-[2px] w-12 bg-[var(--color-quantum-muted)] group-hover:bg-white transition-colors duration-500 group-hover:w-full"></div>
      </div>

    </div>

  </div>
</template>
