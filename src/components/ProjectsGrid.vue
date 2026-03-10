<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-vue-next'

gsap.registerPlugin(ScrollTrigger)

const projectsSection = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

interface Project {
  id: number
  client: string
  title: string
  tags: string[]
  image: string
}

const projects: Project[] = [
  {
    id: 1,
    client: '[01] AURA SYNC',
    title: 'Kinetic E-Commerce',
    tags: ['VUE 3', 'WEBGL', 'STRIPE'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    client: '[02] NEXUS CORE',
    title: 'Data Telemetry',
    tags: ['NODE.JS', 'SOCKET.IO', 'D3'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    client: '[03] ZENITH LOGIC',
    title: 'Algorithmic Trading UI',
    tags: ['TYPESCRIPT', 'GSAP', 'PINIA'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
  }
]

onMounted(() => {
  if (!projectsSection.value || !headerRef.value || !containerRef.value) return

  // Header Reveal
  gsap.fromTo(headerRef.value,
    { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)', y: 30 },
    {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: projectsSection.value,
        start: 'top 80%'
      }
    }
  )

  // Horizontal Scroll Sequence for Projects
  const panels = gsap.utils.toArray('.project-panel')
  
  if (panels.length > 0 && window.innerWidth >= 768) {
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.value,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        // Base the end trigger on the total width to mimic horizontal scroll length
        end: () => "+=" + (containerRef.value?.offsetWidth || 0) * panels.length
      }
    })
  } else {
    // Fallback for mobile (vertical stagger)
    panels.forEach((panel: any) => {
      gsap.fromTo(panel, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%'
          }
        }
      )
    })
  }
})
</script>

<template>
  <div ref="projectsSection" class="w-full relative z-10 py-24 min-h-screen">
    
    <div class="mb-16 md:mb-24 flex justify-between items-end border-b border-[var(--color-quantum-muted)] pb-6 px-4 md:px-12 lg:px-24">
      <h2 
        ref="headerRef"
        class="text-4xl md:text-7xl font-display uppercase font-black text-[var(--color-quantum-text)] tracking-tighter"
      >
        Deployed.Apps
      </h2>
      <span class="text-[var(--color-quantum-magenta)] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs text-right">
        [ Operations Status: Online ]
      </span>
    </div>

    <!-- Pinned Horizontal Container Wrapper -->
    <div class="overflow-hidden w-full h-[70vh] relative mt-12 bg-black/40 backdrop-blur-md border-y border-white/10 flex items-center">
      
      <div 
        ref="containerRef" 
        class="flex flex-col md:flex-row w-full h-full md:w-[300vw] will-change-transform"
      >
        
        <!-- Individual Project Panels -->
        <div 
          v-for="project in projects" 
          :key="project.id"
          class="project-panel w-full h-full md:w-[100vw] flex-shrink-0 flex items-center justify-center p-4 md:p-24 relative group"
        >
          
          <div class="w-full max-w-7xl flex flex-col md:flex-row gap-12 items-center">
            
            <!-- Stark Project Info -->
            <div class="w-full md:w-1/2 text-left z-20">
              <span class="text-[var(--color-quantum-neon)] font-sans font-bold tracking-[0.3em] text-xs uppercase mb-6 block drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]">
                {{ project.client }}
              </span>
              
              <h3 class="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter text-white mb-8 group-hover:text-[var(--color-quantum-neon)] transition-colors duration-500 drop-shadow-[0_0_20px_rgba(0,0,0,1)]">
                {{ project.title }}
              </h3>
              
              <div class="flex flex-wrap gap-4 mb-12">
                <span 
                  v-for="tag in project.tags" 
                  :key="tag"
                  class="text-[10px] font-bold uppercase tracking-widest text-white border border-white/30 rounded-full px-4 py-2 bg-black/60 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                >
                  {{ tag }}
                </span>
              </div>

              <a href="#" class="inline-flex items-center gap-4 text-sm font-bold tracking-[0.2em] uppercase hoverable group/btn relative">
                <span class="relative z-10 transition-colors group-hover/btn:text-black">ACCESS PAYLOAD</span>
                <div class="w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center relative z-10 transition-colors group-hover/btn:border-black group-hover/btn:text-black">
                  <ArrowUpRight class="w-4 h-4" />
                </div>
                <div class="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 group-hover/btn:scale-x-100 rounded-full pr-12 -ml-6 pl-6 py-2 content-['']"></div>
              </a>
            </div>

            <!-- Heavy Contrast Image Mask -->
            <div 
              class="w-full md:w-1/2 relative aspect-video md:aspect-[4/3] overflow-hidden rounded-sm glass-card p-2 transform-gpu transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-95 group-hover:rotate-y-[5deg] perspective-1000 hoverable cursor-none"
              data-cursor-text="INSPECT_DATA"
            >
              <div class="w-full h-full overflow-hidden relative">
                <img 
                  :src="project.image" 
                  :alt="project.title" 
                  class="absolute inset-0 w-full h-full object-cover filter grayscale contrast-150 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-110 transition-all duration-[1.5s]"
                />
                
                <!-- Scanline overlay effect -->
                <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,243,255,0.06),rgba(0,0,0,0),rgba(0,243,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-50 group-hover:opacity-10 transition-opacity"></div>
              </div>
            </div>

          </div>
          
        </div>

      </div>

    </div>

  </div>
</template>
