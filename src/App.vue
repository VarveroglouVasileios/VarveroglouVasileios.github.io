<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { TresCanvas } from '@tresjs/core'
import QuantumCore from './components/QuantumCore.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const activeSection = ref(0)
const sections = ref<HTMLElement[]>([])

onMounted(() => {
  // Add a slight delay to ensure DOM is ready
  setTimeout(() => {
    if (!sections.value || sections.value.length === 0) return
    sections.value.forEach((sec, i) => {
      ScrollTrigger.create({
        trigger: sec,
        start: "top center",
        end: "bottom center",
        onEnter: () => activeSection.value = i,
        onEnterBack: () => activeSection.value = i
      })
    })
  }, 100)
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <main class="relative w-full min-h-screen bg-[#050505] text-white selection:bg-[#aa00ff]/30">
    
    <!-- 3D Canvas Background -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <TresCanvas clear-color="#050505" window-size>
        <TresPerspectiveCamera :position="[0, 0, 8]" />
        <QuantumCore :shapeIndex="activeSection" />
      </TresCanvas>
    </div>

    <!-- Scrollable Content overlay -->
    <div class="relative z-10 pointer-events-auto">
      
      <!-- Section 1: About -->
      <section ref="sections" class="min-h-screen flex items-center justify-center border-b border-white/5">
        <div class="max-w-4xl px-6 text-center">
          <h1 class="text-6xl md:text-8xl font-black mb-6 tracking-tighter mix-blend-difference">
            THE <span class="text-[#00ffcc]">QUANTUM</span> CORE
          </h1>
          <p class="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            A high-end experiential portfolio driven by math, motion, and webGL.
          </p>
        </div>
      </section>

      <!-- Section 2: CV -->
      <section ref="sections" class="min-h-screen flex items-center justify-start border-b border-white/5">
        <div class="max-w-4xl px-12 md:px-24">
          <h2 class="text-5xl md:text-7xl font-bold mb-8 text-[#aa00ff]">EXPERIENCE</h2>
          <ul class="space-y-12">
            <li>
              <h3 class="text-3xl font-semibold">Creative Developer</h3>
              <p class="text-white/60 text-lg mt-2 font-light">Awwwards Winning Studio &mdash; 2023 - Present</p>
              <p class="text-white/80 mt-4 max-w-xl">Pushing boundaries of interactive experiences using Vue, Three.js and GSAP.</p>
            </li>
            <li>
              <h3 class="text-3xl font-semibold">Frontend Engineer</h3>
              <p class="text-white/60 text-lg mt-2 font-light">Tech Agency &mdash; 2021 - 2023</p>
            </li>
          </ul>
        </div>
      </section>

      <!-- Section 3: Projects -->
      <section ref="sections" class="min-h-screen flex items-center justify-end border-b border-white/5 text-right relative overflow-hidden">
        <div class="max-w-4xl px-12 md:px-24">
          <h2 class="text-5xl md:text-7xl font-bold mb-8 text-[#00ffcc]">SELECTED WORKS</h2>
          <div class="space-y-8">
            <div class="group cursor-pointer">
              <h3 class="text-4xl font-light group-hover:text-white transition-colors text-white/50">01. Neon Horizon</h3>
              <div class="w-full h-px bg-white/20 mt-4 group-hover:bg-[#00ffcc] transition-colors"></div>
            </div>
            <div class="group cursor-pointer">
              <h3 class="text-4xl font-light group-hover:text-white transition-colors text-white/50">02. Echoes of Time</h3>
              <div class="w-full h-px bg-white/20 mt-4 group-hover:bg-[#00ffcc] transition-colors"></div>
            </div>
            <div class="group cursor-pointer">
              <h3 class="text-4xl font-light group-hover:text-white transition-colors text-white/50">03. Liquid Geometry</h3>
              <div class="w-full h-px bg-white/20 mt-4 group-hover:bg-[#00ffcc] transition-colors"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 4: Technologies -->
      <section ref="sections" class="min-h-screen flex items-center justify-center border-b border-white/5">
        <div class="text-center w-full max-w-5xl px-6">
          <h2 class="text-5xl md:text-7xl font-bold mb-16 text-[#aa00ff]">STACK</h2>
          <div class="flex flex-wrap justify-center gap-6">
            <span class="px-8 py-4 bg-white/5 rounded-full text-2xl font-light backdrop-blur-md border border-white/10 hover:border-[#aa00ff] hover:text-[#aa00ff] transition-all cursor-default">Vue 3</span>
            <span class="px-8 py-4 bg-white/5 rounded-full text-2xl font-light backdrop-blur-md border border-white/10 hover:border-[#00ffcc] hover:text-[#00ffcc] transition-all cursor-default">TresJS</span>
            <span class="px-8 py-4 bg-white/5 rounded-full text-2xl font-light backdrop-blur-md border border-white/10 hover:border-[#aa00ff] hover:text-[#aa00ff] transition-all cursor-default">GSAP</span>
            <span class="px-8 py-4 bg-white/5 rounded-full text-2xl font-light backdrop-blur-md border border-white/10 hover:border-[#00ffcc] hover:text-[#00ffcc] transition-all cursor-default">Three.js</span>
            <span class="px-8 py-4 bg-white/5 rounded-full text-2xl font-light backdrop-blur-md border border-white/10 hover:border-[#aa00ff] hover:text-[#aa00ff] transition-all cursor-default">Tailwind</span>
          </div>
        </div>
      </section>

      <!-- Section 5: Contact -->
      <section ref="sections" class="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div class="text-center relative z-10 w-full px-6">
          <h2 class="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#aa00ff] mb-12">
            LET'S TALK
          </h2>
          <a href="mailto:hello@example.com" class="text-2xl md:text-4xl font-light border-b-2 border-white/30 hover:border-[#00ffcc] pb-2 transition-colors">
            hello@quantum.core
          </a>
        </div>
      </section>

    </div>
  </main>
</template>
