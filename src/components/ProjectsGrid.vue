<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projectsContainer = ref<HTMLElement | null>(null)

interface Project {
  id: number
  client: string
  title: string
  type: string
  image: string
}

const projects: Project[] = [
  {
    id: 1,
    client: 'Stellar Dynamics',
    title: 'Orbital Logistics Platform',
    type: 'Enterprise Dashboard',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    client: 'Nebula.io',
    title: 'Decentralized Comm Network',
    type: 'Web3 Gateway',
    image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    client: 'Astro Mining Corp',
    title: 'Resource Telemetry UI',
    type: 'Real-Time Interface',
    image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80'
  }
]

onMounted(() => {
  if (!projectsContainer.value) return

  const cards = gsap.utils.toArray('.project-card')

  // Create a 3D overlapping stack effect on scroll
  cards.forEach((card: any, i) => {
    gsap.fromTo(card, 
      { 
        y: '100vh',
        scale: 0.8,
        rotateX: -20,
        opacity: 0,
        z: -100 * (cards.length - i)
      },
      {
        y: 0,
        scale: 1,
        rotateX: 0,
        opacity: 1,
        z: 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: projectsContainer.value,
          start: `top ${80 - (i * 10)}%`, // Stagger starts based on array index
          end: `center ${50 - (i * 5)}%`,
          scrub: 1
        }
      }
    )
  })
})
</script>

<template>
  <div class="w-full relative py-24 flex flex-col items-center">
    
    <div class="text-center mb-32 z-20">
      <h2 class="text-xs uppercase tracking-[0.4em] text-orbit-glow font-bold mb-4">
        [ Payload Gallery ]
      </h2>
      <h3 class="text-4xl md:text-6xl font-display uppercase font-bold text-white tracking-tight drop-shadow-2xl">
        Deployed Operations.
      </h3>
    </div>

    <!-- The 3D Perspective Container -->
    <div 
      ref="projectsContainer" 
      class="relative w-full max-w-5xl flex flex-col items-center gap-16 md:gap-32"
      style="perspective: 1500px;"
    >
      
      <div 
        v-for="(project, index) in projects" 
        :key="project.id"
        class="project-card relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group transform-gpu cursor-pointer"
        :style="{ zIndex: index }"
      >
        <!-- Project Image with space zoom -->
        <img 
          :src="project.image" 
          :alt="project.title" 
          class="absolute inset-0 w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
        />

        <!-- Deep space vignette overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-orbit-dark via-transparent to-transparent opacity-90"></div>

        <!-- UI Glass overlay showing project data -->
        <div class="absolute bottom-0 left-0 w-full p-8 md:p-12 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
          <div class="inline-flex px-4 py-2 hologram-card rounded-full text-[10px] font-bold uppercase tracking-widest text-orbit-sun mb-4">
            {{ project.type }}
          </div>
          <h4 class="text-3xl md:text-5xl font-display uppercase tracking-tight text-white mb-2 shadow-black drop-shadow-lg">
            {{ project.title }}
          </h4>
          <p class="text-sm font-bold tracking-widest text-orbit-glow uppercase opacity-80 shadow-black drop-shadow-md">
            {{ project.client }}
          </p>
        </div>
        
        <!-- Hover Scanner effect -->
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-orbit-glow/10 to-transparent h-[200%] -top-[100%] group-hover:top-[100%] transition-all duration-[2s] ease-linear pointer-events-none"></div>

      </div>

    </div>

  </div>
</template>
