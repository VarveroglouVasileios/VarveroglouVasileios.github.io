<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cvSection = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)

interface TimelineItem {
  id: number
  role: string
  company: string
  period: string
  description: string
}

const experiences: TimelineItem[] = [
  {
    id: 1,
    role: 'Principal Engineer',
    company: 'Quantum Dynamics',
    period: '2023 - Present',
    description: 'Spearheading the transition towards high-performance WebGL architectures. Architecting strict, zero-latency trading dashboards and node microservices.'
  },
  {
    id: 2,
    role: 'Lead Frontend Developer',
    company: 'Nebula Interfaces',
    period: '2020 - 2023',
    description: 'Engineered award-winning interactive portfolios and e-commerce platforms using Vue 3 and GSAP, focusing heavily on scroll-hijacked narratives.'
  },
  {
    id: 3,
    role: 'Systems Developer',
    company: 'Core Construct',
    period: '2018 - 2020',
    description: 'Built foundational API layers and robust database schemas. Ensured perfect 100% uptime for heavily trafficked commercial applications.'
  }
]

onMounted(() => {
  if (!cvSection.value || !headerRef.value) return

  // Header Reveal
  gsap.fromTo(headerRef.value,
    { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)', y: 30 },
    {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cvSection.value,
        start: 'top 80%'
      }
    }
  )

  // Staggered list items from the darkness
  const rows = gsap.utils.toArray('.cv-row')
  gsap.fromTo(rows,
    { opacity: 0, x: -50, filter: 'blur(10px)' },
    {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cvSection.value,
        start: 'top 70%'
      }
    }
  )
})
</script>

<template>
  <div ref="cvSection" class="w-full relative z-10 py-24 min-h-screen">
    
    <div class="mb-16 md:mb-32 flex justify-between items-end border-b border-[var(--color-quantum-muted)] pb-6 px-4 md:px-12 lg:px-24">
      <h2 
        ref="headerRef"
        class="text-4xl md:text-7xl font-display uppercase font-black text-[var(--color-quantum-text)] tracking-tighter"
      >
        History.Log
      </h2>
      <span class="text-[var(--color-quantum-neon)] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs text-right">
        [ Authorization level 4 ]
      </span>
    </div>

    <!-- Stark Timeline Rows -->
    <div class="w-full max-w-6xl mx-auto px-4">
      
      <div 
        v-for="(item, index) in experiences" 
        :key="item.id"
        class="cv-row flex flex-col md:flex-row gap-6 md:gap-16 border border-white/10 py-12 md:py-16 bg-black/60 backdrop-blur-md transition-colors duration-500 rounded-lg hoverable group hover:border-[var(--color-quantum-neon)] hover:bg-black/80 px-4 md:px-8 mb-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
      >
        
        <!-- Left: Time & Company -->
        <div class="w-full md:w-1/3 flex flex-col justify-start md:px-8">
          <span class="text-[var(--color-quantum-muted)] font-display text-4xl font-bold uppercase tracking-tighter mb-2 group-hover:text-white transition-colors duration-500">
            0{{ index + 1 }} //
          </span>
          <h4 class="text-[var(--color-quantum-neon)] font-bold uppercase tracking-[0.2em] text-xs mb-4">
            {{ item.company }}
          </h4>
          <span class="text-white/50 font-sans text-sm tracking-widest uppercase bg-white/5 inline-block py-1 px-3 border border-white/10 w-max">
            {{ item.period }}
          </span>
        </div>

        <!-- Right: Role & Desc -->
        <div class="w-full md:w-2/3 flex flex-col justify-start md:pr-8">
          <h3 class="text-3xl md:text-5xl font-display uppercase font-black tracking-tighter text-white mb-6 group-hover:text-[var(--color-quantum-magenta)] transition-colors duration-500">
            {{ item.role }}
          </h3>
          <p class="text-[var(--color-quantum-muted)] font-sans text-base md:text-lg leading-relaxed max-w-2xl group-hover:text-white transition-colors duration-500">
            {{ item.description }}
          </p>
        </div>

      </div>

    </div>

  </div>
</template>
