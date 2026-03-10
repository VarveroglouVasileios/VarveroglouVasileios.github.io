<script setup lang="ts">
import { ref } from 'vue'

import gsap from 'gsap'

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const magneticBtnRef = ref<HTMLElement | null>(null)
const magneticTextRef = ref<HTMLElement | null>(null)

const handleMagneticMove = (e: MouseEvent) => {
  if (!magneticBtnRef.value || !magneticTextRef.value) return
  
  const rect = magneticBtnRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  
  // Pull button towards mouse
  gsap.to(magneticBtnRef.value, {
    x: x * 0.4,
    y: y * 0.4,
    duration: 0.6,
    ease: 'power3.out'
  })
  
  // Parallax text inside button slightly more
  gsap.to(magneticTextRef.value, {
    x: x * 0.2,
    y: y * 0.2,
    duration: 0.6,
    ease: 'power3.out'
  })
}

const handleMagneticLeave = () => {
  if (!magneticBtnRef.value || !magneticTextRef.value) return
  
  // Snap back to origin
  gsap.to(magneticBtnRef.value, {
    x: 0,
    y: 0,
    duration: 0.8,
    ease: 'elastic.out(1, 0.3)'
  })
  
  gsap.to(magneticTextRef.value, {
    x: 0,
    y: 0,
    duration: 0.8,
    ease: 'elastic.out(1, 0.3)'
  })
}

const handleTransmission = async (e: Event) => {
  e.preventDefault()
  isSubmitting.value = true
  
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  isSubmitting.value = false
  isSubmitted.value = true
  
  setTimeout(() => {
    isSubmitted.value = false
  }, 4000)
}
</script>

<template>
  <div class="w-full min-h-[80vh] flex flex-col justify-center items-center relative z-10 px-4 pt-16 pb-32">
    
    <div class="w-full max-w-3xl glass-card rounded-md p-8 md:p-16 border-t-2 border-t-[var(--color-quantum-neon)] relative overflow-hidden group">
      
      <!-- Submission overlay -->
      <div v-if="isSubmitted" class="absolute inset-0 bg-black/80 backdrop-blur-xl z-20 flex flex-col items-center justify-center text-center">
        <h4 class="text-4xl font-display font-black text-[var(--color-quantum-neon)] uppercase tracking-tighter mb-4 animate-pulse">
          Connection Established
        </h4>
        <p class="text-[var(--color-quantum-muted)] text-sm tracking-widest uppercase">Target server synchronizing data...</p>
      </div>

      <div class="mb-12 text-center">
        <h2 class="text-[var(--color-quantum-neon)] font-bold tracking-[0.4em] uppercase text-xs mb-4">
          [ Terminate Sequence ]
        </h2>
        <h3 class="text-5xl md:text-7xl font-display uppercase font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(0,0,0,1)]">
          Initiate Contact.
        </h3>
      </div>

      <form @submit="handleTransmission" class="flex flex-col gap-8 w-full">
        
        <div class="relative bg-black/80 backdrop-blur-md border border-white/20 focus-within:border-[var(--color-quantum-neon)] transition-colors p-4">
          <label class="absolute -top-3 left-4 bg-black px-2 text-[8px] font-bold uppercase tracking-widest text-[var(--color-quantum-muted)]">
            Ident
          </label>
          <input 
            type="text" 
            placeholder="ENTER NAME"
            required
            class="w-full bg-transparent text-white font-display text-xl uppercase tracking-widest outline-none placeholder-white/20 hoverable"
          />
        </div>

        <div class="relative bg-black/80 backdrop-blur-md border border-white/20 focus-within:border-[var(--color-quantum-magenta)] transition-colors p-4">
          <label class="absolute -top-3 left-4 bg-black px-2 text-[8px] font-bold uppercase tracking-widest text-[var(--color-quantum-muted)]">
            Routing
          </label>
          <input 
            type="email" 
            placeholder="ENTER ADDRESS"
            required
            class="w-full bg-transparent text-white font-display text-xl uppercase tracking-widest outline-none placeholder-white/20 hoverable"
          />
        </div>

        <div class="relative bg-black/80 backdrop-blur-md border border-white/20 focus-within:border-[var(--color-quantum-neon)] transition-colors p-4">
          <label class="absolute -top-3 left-4 bg-black px-2 text-[8px] font-bold uppercase tracking-widest text-[var(--color-quantum-muted)]">
            Payload
          </label>
          <textarea 
            placeholder="ENTER ENCRYPTED MESSAGE..."
            required
            rows="3"
            class="w-full bg-transparent text-[var(--color-quantum-muted)] font-sans text-sm md:text-base outline-none resize-none placeholder-white/20 hoverable"
          ></textarea>
        </div>

        <!-- Magnetic Button Wrapper -->
        <div 
          class="w-full h-24 mt-4 relative flex justify-center items-center cursor-pointer"
          @mousemove="handleMagneticMove"
          @mouseleave="handleMagneticLeave"
        >
          <button 
            type="submit"
            ref="magneticBtnRef"
            :disabled="isSubmitting"
            class="w-64 h-16 rounded-full bg-white text-black font-display font-black text-xl uppercase tracking-widest hover:bg-[var(--color-quantum-neon)] hover:scale-110 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed outline-none hoverable flex justify-center items-center shadow-[0_0_20px_rgba(255,255,255,0.8)]"
          >
            <span ref="magneticTextRef" class="inline-block pointer-events-none">
              {{ isSubmitting ? 'UPLOADING...' : 'TRANSMIT' }}
            </span>
          </button>
        </div>

      </form>
    </div>

    <!-- Footer base -->
    <div class="absolute bottom-8 w-full px-12 flex flex-col md:flex-row justify-between items-center text-[var(--color-quantum-muted)] text-[10px] font-bold tracking-[0.2em] uppercase gap-4 z-10">
      <span>© {{ new Date().getFullYear() }} V. Varveroglou. Protocol V.4</span>
      
      <div class="flex gap-8">
        <a href="#" class="hoverable hover:text-[var(--color-quantum-neon)] transition-colors">LINKEDIN</a>
        <a href="#" class="hoverable hover:text-[var(--color-quantum-neon)] transition-colors">GITHUB</a>
        <a href="#" class="hoverable hover:text-[var(--color-quantum-neon)] transition-colors">TWITTER</a>
      </div>
    </div>

  </div>
</template>
