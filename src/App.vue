<script setup lang="ts">
import { ref } from 'vue'
import DeskScene from './components/DeskScene.vue'

const activeObject = ref<string | null>(null)

function handleSelect(id: string) {
  activeObject.value = id
}

function zoomOut() {
  activeObject.value = null
}
</script>

<template>
  <div class="relative w-full h-screen bg-[#f1f5f9] overflow-hidden font-sans">
    <div class="absolute inset-0 z-0 select-none">
      <DeskScene :activeObject="activeObject" @select="handleSelect" />
    </div>
    
    <!-- Title: Only show when zoomed out -->
    <div 
      class="absolute left-10 top-10 z-10 pointer-events-none transition-opacity duration-500"
      :class="activeObject ? 'opacity-0' : 'opacity-100'"
    >
      <h1 class="text-4xl md:text-6xl font-bold tracking-tight text-slate-800 mb-2">Vasileios<br/><span class="text-blue-500">Varveroglou</span></h1>
      <p class="text-lg text-slate-500">Creative UI/UX Developer & 3D Generalist</p>
    </div>

    <!-- Global Back to Desk Button (Shows when zoomed into an object) -->
    <button 
      @click="zoomOut" 
      class="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 bg-slate-900/80 backdrop-blur-md hover:bg-slate-800 text-white rounded-full font-bold transition-all duration-500 z-50 shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex items-center gap-3 border border-slate-700/50 active:scale-95 cursor-pointer pointer-events-auto"
      :class="activeObject ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      <span>Back to Desk</span>
    </button>

  </div>
</template>

<style>
/* Optional custom scrollbar for prose if needed */
</style>
