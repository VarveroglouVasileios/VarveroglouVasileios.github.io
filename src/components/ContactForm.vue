<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap'
import { Rocket } from 'lucide-vue-next'

const formOverlay = ref<HTMLElement | null>(null)
const isSubmitting = ref(false)
const isSubmitted = ref(false)

const handleTransmission = async (e: Event) => {
  e.preventDefault()
  isSubmitting.value = true
  
  // Fake deep space transmission
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  isSubmitting.value = false
  isSubmitted.value = true
  
  if (formOverlay.value) {
    gsap.fromTo(formOverlay.value, 
      { opacity: 0, scale: 0.9, backdropFilter: 'blur(0px)' },
      { opacity: 1, scale: 1, backdropFilter: 'blur(20px)', duration: 0.8, ease: 'expo.out' }
    )
  }

  setTimeout(() => {
    isSubmitted.value = false
  }, 4000)
}
</script>

<template>
  <div class="w-full flex justify-center py-20 relative overflow-hidden">
    
    <!-- Background Grid glow -->
    <div class="absolute inset-0 z-0 bg-gradient-radial from-orbit-glow/10 to-transparent opacity-50 pointer-events-none"></div>

    <div class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10 p-8 md:p-16 hologram-card rounded-[3rem] border-white/20">
      
      <!-- Text side -->
      <div class="flex flex-col justify-center">
        <h2 class="text-[10px] uppercase tracking-[0.4em] text-orbit-glow font-bold mb-6">
          [ Comm Channel Open ]
        </h2>
        <h3 class="text-4xl md:text-6xl font-display uppercase font-bold text-white tracking-tight leading-none mb-6 drop-shadow-2xl">
          Transmit <br/>
          <span class="text-orbit-sun">Coordinates.</span>
        </h3>
        <p class="text-orbit-text/60 font-light text-lg mb-12 max-w-sm leading-relaxed">
          Seeking a robust full-stack architect for your next major orbital deployment? Send the details through the secure channel.
        </p>

        <div class="flex gap-6">
          <a href="#" class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-white hover:text-black transition-all hover:scale-110 hoverable">
            GH
          </a>
          <a href="#" class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-white hover:text-black transition-all hover:scale-110 hoverable">
            IN
          </a>
          <a href="#" class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-white hover:text-black transition-all hover:scale-110 hoverable">
            X
          </a>
        </div>
      </div>

      <!-- Form Side -->
      <div class="relative w-full">
        
        <!-- Transmission Success Overlay -->
        <div 
          v-if="isSubmitted"
          ref="formOverlay"
          class="absolute inset-0 z-20 flex flex-col items-center justify-center text-center bg-orbit-core/80 rounded-2xl border border-orbit-glow/50 shadow-[0_0_40px_rgba(59,130,246,0.3)]"
        >
          <div class="w-16 h-16 rounded-full bg-orbit-glow/20 flex items-center justify-center mb-6 border border-orbit-glow orbit-glow-text">
            <svg class="w-8 h-8 text-orbit-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 class="text-2xl font-display font-bold text-white uppercase tracking-tight mb-2">Signal Received</h4>
          <p class="text-orbit-text/70 text-sm">Transmission reached central command.</p>
        </div>

        <form @submit="handleTransmission" class="flex flex-col gap-6 w-full">
          <div class="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-orbit-glow focus-within:bg-white/10 transition-colors">
            <label class="block text-[9px] uppercase tracking-widest text-orbit-glow font-bold pt-4 px-6 opacity-80">Callsign / Name</label>
            <input 
              type="text" 
              required
              class="w-full bg-transparent px-6 pb-4 pt-1 text-white font-bold tracking-wider outline-none hoverable"
            />
          </div>

          <div class="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-orbit-glow focus-within:bg-white/10 transition-colors">
            <label class="block text-[9px] uppercase tracking-widest text-orbit-glow font-bold pt-4 px-6 opacity-80">Frequency / Email</label>
            <input 
              type="email" 
              required
              class="w-full bg-transparent px-6 pb-4 pt-1 text-white font-bold tracking-wider outline-none hoverable"
            />
          </div>

          <div class="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-orbit-glow focus-within:bg-white/10 transition-colors">
            <label class="block text-[9px] uppercase tracking-widest text-orbit-glow font-bold pt-4 px-6 opacity-80">Encrypted Message</label>
            <textarea 
              required
              rows="3"
              class="w-full bg-transparent px-6 pb-4 pt-1 text-white font-bold tracking-wider outline-none resize-none hoverable"
            ></textarea>
          </div>

          <button 
            type="submit"
            :disabled="isSubmitting"
            class="relative w-full h-16 rounded-2xl bg-orbit-sun text-white font-display font-black text-lg uppercase tracking-widest overflow-hidden group hoverable disabled:opacity-50 disabled:cursor-not-allowed border outline-none"
            :class="isSubmitting ? 'border-orbit-sun/50' : 'border-orbit-sun shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)]'"
          >
            <div class="absolute inset-0 bg-white/20 transform -translate-x-full skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span v-if="isSubmitting" class="animate-pulse">Transmitting...</span>
            <span v-else class="flex items-center justify-center gap-3">
              Engage Thrusters
              <Rocket class="w-5 h-5" />
            </span>
          </button>
        </form>

      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(150%) skewX(12deg);
  }
}
</style>
