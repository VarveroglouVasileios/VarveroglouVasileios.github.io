<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const pathRef = ref<SVGPathElement | null>(null)
const rocketRef = ref<HTMLElement | null>(null)

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
    role: 'Commander, Systems Engineering',
    company: 'TechNova',
    period: '2023 - Present',
    description: 'Directed the migration of monolithic structures into resilient microservices using Node.js and Vue 3. Reduced orbital latency by 40% and fortified test coverage.'
  },
  {
    id: 2,
    role: 'Frontend Architect',
    company: 'PixelCraft Studios',
    period: '2020 - 2023',
    description: 'Developed highly interactive WebGL interfaces. Engineered the core component library utilized across robust marketing modules.'
  },
  {
    id: 3,
    role: 'Cadet Web Developer',
    company: 'Digital Solutions Inc.',
    period: '2018 - 2020',
    description: 'Constructed foundational Web platforms. Collaborated with design ops to ensure pixel-perfect deployments into production orbit.'
  }
]

onMounted(() => {
  if (!sectionRef.value || !pathRef.value || !rocketRef.value) return

  const length = pathRef.value.getTotalLength()
  
  gsap.set(pathRef.value, {
    strokeDasharray: length,
    strokeDashoffset: length
  })

  // The main ScrollTrigger that sweeps the line down AND moves the "rocket" tracker
  gsap.to([pathRef.value, rocketRef.value], {
    strokeDashoffset: 0,
    top: '100%', // Moves the tracker dot to the bottom of the timeline
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 60%",
      end: "bottom 80%",
      scrub: 1
    }
  })

  // Reveal nodes holographic style
  const nodes = gsap.utils.toArray('.cv-node')
  nodes.forEach((node: any) => {
    gsap.fromTo(node,
      { opacity: 0, x: node.classList.contains('md:text-right') ? -50 : 50, filter: 'blur(10px)' },
      {
        opacity: 1, 
        x: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 85%',
        }
      }
    )
  })
})
</script>

<template>
  <div ref="sectionRef" class="w-full relative py-20">
    
    <div class="mb-32 flex flex-col items-center text-center">
      <h2 class="text-xs uppercase tracking-[0.4em] text-orbit-glow font-bold mb-4">
        [ Flight Log ]
      </h2>
      <h3 class="text-4xl md:text-6xl font-display uppercase font-bold text-white tracking-tight drop-shadow-2xl">
        Launch <br/>
        <span class="text-orbit-sun">Sequence.</span>
      </h3>
    </div>

    <!-- Central Glowing Track -->
    <div class="absolute left-6 md:left-[50vw] top-[300px] bottom-0 w-[2px] -ml-[1px] bg-white/10 z-0">
      
      <!-- The dynamic drawn line wrapper -->
      <div class="absolute inset-0 overflow-hidden w-[6px] -ml-[2px]">
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <path 
            ref="pathRef"
            d="M 3 0 L 3 5000" 
            class="stroke-orbit-glow"
            stroke-width="2" 
            fill="none" 
            style="filter: drop-shadow(0 0 10px rgba(59,130,246,0.8));"
          />
        </svg>
      </div>

      <!-- The Tracker Dot (Rocket) -->
      <div 
        ref="rocketRef"
        class="absolute left-1/2 -translate-x-1/2 top-0 w-4 h-4 rounded-full bg-white orbit-sun-glow shadow-[0_0_20px_#ffffff] z-20"
      ></div>
    
    </div>

    <div class="relative max-w-5xl mx-auto z-10 w-full">
      <div class="space-y-32 md:space-y-48">
        
        <div 
          v-for="(item, index) in experiences" 
          :key="item.id"
          class="cv-node flex flex-col md:flex-row w-full group items-start relative hologram-card p-8 md:p-12 rounded-3xl md:bg-transparent md:border-none md:shadow-none md:backdrop-blur-none"
        >
          <!-- Left side -->
          <div class="md:w-1/2 md:pr-24 text-left md:text-right pb-4 md:pb-0" :class="[index % 2 !== 0 ? 'md:order-2 md:pl-24 md:pr-0 md:text-left' : '']">
            <h4 class="text-2xl md:text-4xl font-display uppercase text-white font-bold tracking-tight mb-2 group-hover:text-orbit-glow transition-colors duration-500 shadow-black drop-shadow-lg">
              {{ item.company }}
            </h4>
            <span class="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold tracking-widest text-orbit-text opacity-70 uppercase mb-4 shadow-black drop-shadow-md">
              {{ item.period }}
            </span>
          </div>

          <!-- Empty spacer for the center line on mobile/desktop -->
          <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px"></div>

          <!-- Right side -->
          <div class="md:w-1/2 md:pl-24" :class="[index % 2 !== 0 ? 'md:order-1 md:pr-24 md:pl-0 text-left md:text-right' : '']">
            <h3 class="text-xl md:text-2xl font-bold text-orbit-sun mb-4 tracking-tight shadow-black drop-shadow-md">
              {{ item.role }}
            </h3>
            <p class="text-orbit-text/80 font-light text-base leading-relaxed p-6 hologram-card rounded-2xl group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] transition-shadow duration-500">
              {{ item.description }}
            </p>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>
