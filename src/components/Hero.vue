<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const heroTitleRef = ref<HTMLElement | null>(null)
const heroSubtitleRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!heroTitleRef.value || !heroSubtitleRef.value) return

  const title1 = heroTitleRef.value.children[0] as HTMLElement
  const title2 = heroTitleRef.value.children[1] as HTMLElement

  const splitText = (el: HTMLElement) => {
    const text = el.innerText
    el.innerHTML = ''
    text.split('').forEach(char => {
      const span = document.createElement('span')
      span.innerText = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      span.style.willChange = 'transform, opacity'
      el.appendChild(span)
    })
    return Array.from(el.children)
  }

  const chars1 = splitText(title1)
  const chars2 = splitText(title2)

  const tl = gsap.timeline()
  
  // Stagger reveal of the huge typography letter by letter
  tl.fromTo([...chars1, ...chars2], 
    { 
      y: 150, 
      opacity: 0,
      rotationX: -90,
      transformOrigin: '50% 100% -50'
    },
    { 
      y: 0, 
      opacity: 1, 
      rotationX: 0,
      duration: 1.5,
      stagger: 0.05,
      ease: 'expo.out',
      delay: 0.2
    }
  )

  tl.fromTo(heroSubtitleRef.value,
    { opacity: 0, x: -30 },
    { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
    '-=1'
  )
})
</script>

<template>
  <div class="relative w-full h-screen flex flex-col justify-center items-center pointer-events-none px-4 text-white z-10">
    
    <div class="flex flex-col items-center">
      <div 
        ref="heroTitleRef" 
        class="text-[15vw] md:text-[12vw] font-display font-black uppercase tracking-tighter leading-[0.8] text-center drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]"
      >
        <h1 class="will-change-transform">Vasileios</h1>
        <h1 class="will-change-transform ml-0 md:ml-32">Varveroglou</h1>
      </div>

      <div 
        ref="heroSubtitleRef" 
        class="mt-12 md:mt-16 flex items-center gap-6 drop-shadow-[0_0_10px_rgba(0,0,0,1)] bg-black/40 px-8 py-3 rounded-full backdrop-blur-md border border-white/10"
      >
        <div class="w-12 h-[2px] bg-white opacity-50"></div>
        <p class="font-sans text-xs md:text-sm uppercase tracking-[0.4em] font-bold text-white">
          Full-Stack WebGL Architect
        </p>
        <div class="w-12 h-[2px] bg-[var(--color-quantum-neon)] opacity-80"></div>
      </div>
    </div>
    
  </div>
</template>
