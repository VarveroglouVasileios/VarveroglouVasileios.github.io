<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue'
import { CameraControls, Html, Environment } from '@tresjs/cientos'
import * as THREE from 'three'
import gsap from 'gsap'

const props = defineProps<{
  activeObject: string | null
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()

const controlsRef = shallowRef()
const pullStringRef = shallowRef()
const isNightMode = ref(false)


const defaultCamPos = new THREE.Vector3(0, 15, 26)
const defaultLookAt = new THREE.Vector3(0, 0, 0)

// Object specific camera views to frame embedded UIs perpendicularly
const cameraViews: Record<string, { pos: THREE.Vector3, lookAt: THREE.Vector3 }> = {
  projects: { pos: new THREE.Vector3(0, 5, 2.5), lookAt: new THREE.Vector3(0, 1.5, -1.3) }, // Laptop
  cv: { pos: new THREE.Vector3(-3.5, 6, 4.5), lookAt: new THREE.Vector3(-3.5, 0.05, 3) }, // A4 Document
  contact: { pos: new THREE.Vector3(4, 4.5, 4.5), lookAt: new THREE.Vector3(4, 0.1, 3) }, // Phone
  tech: { pos: new THREE.Vector3(5.5, 5.5, 1.5), lookAt: new THREE.Vector3(5.5, 3, -3) }, // Standing Monitor
  about: { pos: new THREE.Vector3(-7, 3, 4), lookAt: new THREE.Vector3(-7, 0.5, 1) }, // Photo Frame
}

watch(() => props.activeObject, (newVal) => {
  if (!controlsRef.value) return
  
  // Extract the underlying camera-controls instance
  const ctrl = controlsRef.value.value || controlsRef.value.instance || controlsRef.value

  if (newVal && cameraViews[newVal]) {
    const view = cameraViews[newVal]
    // Use CameraControls built-in cinematic transition (true = smooth animation)
    if (ctrl && typeof ctrl.setLookAt === 'function') {
      ctrl.setLookAt(view.pos.x, view.pos.y, view.pos.z, view.lookAt.x, view.lookAt.y, view.lookAt.z, true)
    }
  } else {
    // Zoom out to default overview
    if (ctrl && typeof ctrl.setLookAt === 'function') {
      ctrl.setLookAt(defaultCamPos.x, defaultCamPos.y, defaultCamPos.z, defaultLookAt.x, defaultLookAt.y, defaultLookAt.z, true)
    }
  }
})
// Interactions
const hoveredIds = ref(new Set<string>())

function onPointerEnter(ev: any, id: string) {
  if (props.activeObject) return // Don't allow hover effect while zoomed in
  document.body.style.cursor = 'pointer'
  hoveredIds.value.add(id)
  
  if (ev.object.parent) {
     gsap.to(ev.object.parent.position, { y: ev.object.parent.userData.originalY ? ev.object.parent.userData.originalY + 0.3 : 0.3, duration: 0.3, ease: 'power2.out' })
  }
}

function onPointerLeave(ev: any, id: string) {
  if (props.activeObject) return
  document.body.style.cursor = 'default'
  hoveredIds.value.delete(id)
  
  if (ev.object.parent) {
     gsap.to(ev.object.parent.position, { y: ev.object.parent.userData.originalY || 0, duration: 0.3, ease: 'power2.out' })
  }
}

function onClick(ev: any, id: string) {
  if (props.activeObject !== id) {
    ev.stopPropagation()
    document.body.style.cursor = 'default' // Reset cursor on click
    emit('select', id)
  }
}

function toggleNightMode(ev: any) {
  if (props.activeObject) return
  ev.stopPropagation()
  isNightMode.value = !isNightMode.value
  
  if (pullStringRef.value) {
    gsap.fromTo(pullStringRef.value.position, { y: 4 }, { y: 3.7, duration: 0.15, yoyo: true, repeat: 1 })
  }
}

function onStringEnter(ev: any) {
  if (props.activeObject) return
  ev.stopPropagation()
  document.body.style.cursor = 'pointer'
}

function onStringLeave(ev: any) {
  if (props.activeObject) return
  ev.stopPropagation()
  document.body.style.cursor = 'default'
}

</script>

<template>
  <TresCanvas shadows alpha window-size clear-color="#0f172a">
    <TresPerspectiveCamera
      :position="[0, 15, 26]"
      :fov="26"
      :near="0.1"
      :far="1000"
    />
    <CameraControls 
      ref="controlsRef" 
      make-default 
      :min-distance="5"
      :max-distance="40"
      :max-polar-angle="Math.PI / 2 - 0.05"
      :min-polar-angle="0.1"
      :max-azimuth-angle="Math.PI / 3"
      :min-azimuth-angle="-Math.PI / 3"
    />
    
    <!-- Lights -->
    <TresAmbientLight :intensity="isNightMode ? 0.05 : 0.8" color="#ffffff" />
    
    <!-- Key Light (Sunlight) -->
    <TresDirectionalLight
      :position="[10, 15, 10]"
      :intensity="isNightMode ? 0.1 : 1.5"
      cast-shadow
      color="#fdf8f5"
    />

    <!-- Fill Light (Softer Opposite) -->
    <TresDirectionalLight
      :position="[-10, 10, -10]"
      :intensity="isNightMode ? 0 : 0.5"
      color="#e2e8f0"
    />

    <!-- Point Light highlights -->
    <TresPointLight :position="[4, 4, 2]" color="#fff" :intensity="isNightMode ? 0 : 1" :distance="15" />

    <!-- Lamp SpotLight (Active in Night Mode) -->
    <TresSpotLight
      v-if="isNightMode"
      :position="[-5, 7, -5]"
      :intensity="5"
      color="#fef08a"
      cast-shadow
      :angle="Math.PI / 4"
      :penumbra="0.6"
      :distance="30"
    />

    <!-- Environment Map for realistic reflections -->
    <Environment preset="city" />

    <!-- Room / Studio Backdrop -->
    <!-- Floor -->
    <TresMesh receive-shadow :position="[0, -5, 0]" :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[100, 100]" />
      <TresMeshStandardMaterial color="#020617" :roughness="0.8" />
    </TresMesh>
    
    <!-- Back Wall -->
    <TresMesh receive-shadow :position="[0, 20, -15]">
      <TresPlaneGeometry :args="[100, 50]" />
      <TresMeshStandardMaterial color="#0f172a" :roughness="0.9" />
    </TresMesh>

    <!-- The Desk (Softer Slate/Wood for Contrast) -->
    <TresGroup :position="[0, -0.5, 0]">
      <TresMesh receive-shadow cast-shadow>
        <TresBoxGeometry :args="[25, 1, 15]" />
        <TresMeshStandardMaterial color="#94a3b8" :roughness="0.7" />
      </TresMesh>
      
      <!-- Desk Legs -->
      <!-- Front Left -->
      <TresMesh cast-shadow receive-shadow :position="[-11, -2.5, 6]">
        <TresBoxGeometry :args="[0.8, 4, 0.8]" />
        <TresMeshStandardMaterial color="#334155" :roughness="0.5" />
      </TresMesh>
      <!-- Front Right -->
      <TresMesh cast-shadow receive-shadow :position="[11, -2.5, 6]">
        <TresBoxGeometry :args="[0.8, 4, 0.8]" />
        <TresMeshStandardMaterial color="#334155" :roughness="0.5" />
      </TresMesh>
      <!-- Back Left -->
      <TresMesh cast-shadow receive-shadow :position="[-11, -2.5, -6]">
        <TresBoxGeometry :args="[0.8, 4, 0.8]" />
        <TresMeshStandardMaterial color="#334155" :roughness="0.5" />
      </TresMesh>
      <!-- Back Right -->
      <TresMesh cast-shadow receive-shadow :position="[11, -2.5, -6]">
        <TresBoxGeometry :args="[0.8, 4, 0.8]" />
        <TresMeshStandardMaterial color="#334155" :roughness="0.5" />
      </TresMesh>
    </TresGroup>

    <!-- Modern Minimalist Desk Lamp -->
    <TresGroup :position="[-8, 0, -5]">
      <!-- Slim Base -->
      <TresMesh cast-shadow receive-shadow :position="[0, 0.05, 0]">
        <TresCylinderGeometry :args="[0.8, 0.8, 0.1, 32]" />
        <TresMeshStandardMaterial color="#1e293b" :roughness="0.5" :metalness="0.8" />
      </TresMesh>
      
      <!-- Thin Vertical Stem -->
      <TresMesh cast-shadow receive-shadow :position="[0, 3.5, 0]">
        <TresCylinderGeometry :args="[0.05, 0.05, 7, 16]" />
        <TresMeshStandardMaterial color="#334155" :roughness="0.4" :metalness="0.7" />
      </TresMesh>

      <!-- Horizontal Light Bar -->
      <TresGroup :position="[1.5, 7, 0]">
        <!-- Metal Housing -->
        <TresMesh cast-shadow receive-shadow :position="[0, 0, 0]">
          <TresBoxGeometry :args="[4, 0.08, 0.4]" />
          <TresMeshStandardMaterial color="#0f172a" :roughness="0.3" :metalness="0.6" />
        </TresMesh>
        
        <!-- LED Strip (Glowing Surface) -->
        <TresMesh :position="[0, -0.045, 0]" :rotation="[Math.PI / 2, 0, 0]">
          <TresPlaneGeometry :args="[3.8, 0.3]" />
          <TresMeshBasicMaterial :color="isNightMode ? '#fef08a' : '#ffffff'" />
        </TresMesh>
      </TresGroup>

      <!-- Interactive Pull String hanging off the end of the light bar -->
      <!-- Wrapper for hitbox -->
      <TresMesh 
        ref="pullStringRef"
        :position="[3.3, 4, 0]" 
        @click="(ev) => toggleNightMode(ev)"
        @pointer-enter="(ev) => onStringEnter(ev)"
        @pointer-leave="(ev) => onStringLeave(ev)"
      >
        <!-- The string -->
        <TresCylinderGeometry :args="[0.015, 0.015, 3]" />
        <TresMeshStandardMaterial color="#334155" />
        <!-- The glowing red handle -->
        <TresMesh :position="[0, -1.5, 0]">
          <TresCylinderGeometry :args="[0.08, 0.08, 0.3]" />
          <TresMeshStandardMaterial color="#ef4444" :roughness="0.2" />
        </TresMesh>
        <!-- Invisible thicker hitbox so the user doesn't have to pixel-hunt -->
        <TresMesh :position="[0, -0.5, 0]">
          <TresCylinderGeometry :args="[0.5, 0.5, 4]" />
          <TresMeshBasicMaterial :transparent="true" :opacity="0" :depthWrite="false" />
        </TresMesh>
      </TresMesh>
    </TresGroup>

    <!-- Desk Mat (Darker Grey) -->
    <TresMesh receive-shadow :position="[0, 0.02, -0.5]">
      <TresBoxGeometry :args="[12, 0.04, 6]" />
      <TresMeshStandardMaterial color="#64748b" :roughness="0.9" />
    </TresMesh>

    <!-- About Me: Photo Frame -->
    <TresGroup 
      :position="[-7, 0.5, 1]" 
      :rotation="[-0.1, 0.5, 0]"
      :userData="{ originalY: 0.5 }"
    >
      <Html :position="[0, 3.5, 0]" center :distance-factor="15" v-if="props.activeObject !== 'about'">
        <div class="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-slate-200 text-slate-800 font-bold text-sm select-none animate-bounce pointer-events-none transition-opacity duration-300 hover:scale-110" :class="{'opacity-100': hoveredIds.has('about'), 'opacity-60': !hoveredIds.has('about')}">
          About Me
        </div>
      </Html>

      <!-- Hitbox -->
      <TresMesh v-if="props.activeObject !== 'about'" :position="[0, 0, 0]" @pointer-enter="(ev) => onPointerEnter(ev, 'about')" @pointer-leave="(ev) => onPointerLeave(ev, 'about')" @click="(ev) => onClick(ev, 'about')">
         <TresBoxGeometry :args="[4.5, 5, 2]" />
         <TresMeshBasicMaterial :transparent="true" :opacity="0" :depthWrite="false" />
      </TresMesh>

      <!-- Frame Border -->
      <TresMesh cast-shadow receive-shadow :position="[0, 0, 0]">
        <TresBoxGeometry :args="[3.4, 4.0, 0.26]" />
        <TresMeshStandardMaterial color="#78350f" :roughness="0.6" />
      </TresMesh>
      
      <!-- Photo Canvas Backdrop Plane & UI -->
      <TresMesh receive-shadow :position="[0, 0, 0.13]">
        <TresPlaneGeometry :args="[3.0, 3.6]" />
        <TresMeshBasicMaterial color="#f8fafc" />
        <Html transform wrapperClass="html-ui-wrapper" :position="[0, 0, 0.05]" :scale="0.01">
           <div style="width: 300px; height: 360px;" class="bg-slate-50 flex flex-col items-center justify-center px-4 shadow-inner text-slate-800">
              <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 text-white flex items-center justify-center text-5xl font-bold font-serif shadow-lg mb-6 ring-4 ring-slate-100">
                V
              </div>
              <h2 class="text-xl font-bold font-serif mb-2 text-center text-slate-900 border-b-2 border-slate-200 pb-2 w-full">Vasileios V.</h2>
              <p class="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-4 text-center text-blue-600">Creative Dev</p>
              <div class="text-[11px] text-slate-600 text-center space-y-3 font-medium leading-relaxed">
                 <p>Building highly immersive, interactive web experiences.</p>
                 <p>Passionate about WebGL, complex animations, and award-winning UI/UX.</p>
              </div>
           </div>
        </Html>
      </TresMesh>
    </TresGroup>

    <!-- Projects: Laptop (Silver) -->
    <TresGroup 
      :position="[0, 0, -2]" 
      :userData="{ originalY: 0 }"
    >
      <Html :position="[0, 5, -1.5]" center :distance-factor="15" v-if="props.activeObject !== 'projects'">
        <div class="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-slate-200 text-slate-800 font-bold text-sm select-none animate-bounce pointer-events-none transition-opacity duration-300" :class="{'opacity-100': hoveredIds.has('projects'), 'opacity-60': !hoveredIds.has('projects')}">
          Projects
        </div>
      </Html>

      <!-- Hitbox over entire group to catch pointer events smoothly -->
      <TresMesh v-if="props.activeObject !== 'projects'" :position="[0, 1.5, -0.5]" @pointer-enter="(ev) => onPointerEnter(ev, 'projects')" @pointer-leave="(ev) => onPointerLeave(ev, 'projects')" @click="(ev) => onClick(ev, 'projects')">
         <TresBoxGeometry :args="[7.2, 5.8, 6.5]" />
         <TresMeshBasicMaterial :transparent="true" :opacity="0" :depthWrite="false" />
      </TresMesh>

      <!-- Base -->
      <TresMesh cast-shadow receive-shadow :position="[0, 0.1, 0]">
        <TresBoxGeometry :args="[5.2, 0.26, 3.9]" />
        <TresMeshStandardMaterial color="#e2e8f0" :roughness="0.2" :metalness="0.6" />
      </TresMesh>
      
      <!-- Screen hinge logic -->
      <TresMesh cast-shadow receive-shadow :position="[0, 1.95, -1.82]" :rotation="[-0.2, 0, 0]">
        <TresBoxGeometry :args="[5.2, 3.9, 0.26]" />
        <TresMeshStandardMaterial color="#cbd5e1" :roughness="0.2" :metalness="0.5" />
      </TresMesh>
      
      <!-- Screen with Black Backing and Embedded HTML UI ALWAYS VISIBLE -->
      <TresMesh :position="[0, 1.95, -1.68]" :rotation="[-0.2, 0, 0]">
         <TresPlaneGeometry :args="[5.0, 3.7]" />
         <TresMeshBasicMaterial color="#0f172a" />
         <Html transform :position="[0, 0, 0.05]" :scale="0.01">
            <div style="width: 500px; height: 370px;" class="bg-slate-900 rounded overflow-hidden flex flex-col text-slate-200 font-sans pointer-events-auto select-none shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                <!-- Header -->
                <div class="bg-slate-800 p-2 flex justify-between items-center border-b border-slate-700">
                    <div class="flex gap-1.5 border-slate-700 pb-0">
                        <div class="w-3 h-3 rounded-full bg-red-400"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div class="w-3 h-3 rounded-full bg-emerald-400"></div>
                    </div>
                    <span class="text-xs font-semibold text-slate-400">projects.dev - VS Code</span>
                    <div class="w-10"></div>
                </div>
                <!-- Body -->
                <div class="flex flex-1 overflow-hidden">
                    <div class="w-1/3 bg-[#1e293b] p-4 border-r border-slate-700 shadow-xl z-10 flex flex-col gap-2">
                        <h3 class="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest pl-1">Explorer</h3>
                        <div class="text-sm space-y-1">
                            <div class="px-2 py-2 bg-blue-500/20 text-blue-300 rounded cursor-pointer border border-blue-500/30 flex items-center gap-2"><span class="text-blue-400">❖</span> Nexus 3D Engine</div>
                            <div class="px-2 py-2 text-slate-400 cursor-pointer hover:bg-slate-700/50 rounded transition-colors flex items-center gap-2"><span class="text-slate-500">📄</span> OrbitFolio</div>
                            <div class="px-2 py-2 text-slate-400 cursor-pointer hover:bg-slate-700/50 rounded transition-colors flex items-center gap-2"><span class="text-slate-500">📄</span> VueDash UI</div>
                        </div>
                    </div>
                    <div class="w-2/3 p-6 flex flex-col justify-center items-center text-center bg-[#0f172a] relative">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-4xl text-white mb-4 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-10">🧊</div>
                        <h2 class="text-xl font-bold text-white mb-2 leading-tight z-10">Nexus 3D Engine</h2>
                        <p class="text-xs text-slate-400 text-balance px-4 mb-5 z-10">A custom WebGL rendering pipeline built from scratch with modular shaders.</p>
                        <button class="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-lg active:scale-95 duration-150 z-10">View Source Code</button>
                    </div>
                </div>
            </div>
         </Html>
      </TresMesh>
    </TresGroup>

    <!-- Keyboard (White) -->
    <TresMesh cast-shadow receive-shadow :position="[0, 0.1, 1]">
      <TresBoxGeometry :args="[3, 0.1, 1.2]" />
      <TresMeshStandardMaterial color="#f8fafc" :roughness="0.6" />
    </TresMesh>

    <!-- Mouse -->
    <TresMesh cast-shadow receive-shadow :position="[2.5, 0.1, 1]">
      <TresBoxGeometry :args="[0.6, 0.15, 1]" />
      <TresMeshStandardMaterial color="#f8fafc" :roughness="0.5" />
    </TresMesh>

    <!-- CV: A4 Document -->
    <TresGroup 
      :position="[-3.5, 0, 3]"
      :rotation="[0, 0.2, 0]"
      :userData="{ originalY: 0 }"
    >
      <Html :position="[0, 1.5, 0]" center :distance-factor="15" v-if="props.activeObject !== 'cv'">
        <div class="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-slate-200 text-slate-800 font-bold text-sm select-none pointer-events-none transition-opacity duration-300" :class="{'opacity-100': hoveredIds.has('cv'), 'opacity-60': !hoveredIds.has('cv')}">
          📄 CV
        </div>
      </Html>

      <TresMesh v-if="props.activeObject !== 'cv'" :position="[0, 0.5, 0]" @pointer-enter="(ev) => onPointerEnter(ev, 'cv')" @pointer-leave="(ev) => onPointerLeave(ev, 'cv')" @click="(ev) => onClick(ev, 'cv')">
         <TresBoxGeometry :args="[5.2, 2, 6.5]" />
         <TresMeshBasicMaterial :transparent="true" :opacity="0" :depthWrite="false" />
      </TresMesh>

      <!-- Paper -->
      <TresMesh cast-shadow receive-shadow :position="[0, 0.05, 0]">
        <TresBoxGeometry :args="[3.25, 0.02, 4.55]" />
        <TresMeshStandardMaterial :color="hoveredIds.has('cv') ? '#f8fafc' : '#ffffff'" :roughness="1" />
      </TresMesh>
      
      <!-- Embedded HTML CV ALWAYS VISIBLE -->
      <TresMesh :position="[0, 0.065, 0]" :rotation="[-1.57, 0, 0]">
         <TresPlaneGeometry :args="[3.0, 4.3]" />
         <TresMeshBasicMaterial color="#ffffff" />
         <Html transform :position="[0, 0, 0.05]" :scale="0.01">
            <div style="width: 300px; height: 430px; font-family: 'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', sans-serif;" class="p-6 text-slate-800 flex flex-col pointer-events-auto select-none overflow-hidden bg-white">
             <div class="flex justify-between items-baseline mb-6 border-b-2 border-slate-300/50 pb-2">
                 <h1 class="text-3xl font-bold tracking-tighter text-slate-900">Vasileios.</h1>
                 <span class="text-xs text-slate-500 font-sans uppercase font-bold tracking-widest">Creative Dev</span>
             </div>
             <p class="text-sm leading-relaxed mb-6 text-slate-700">
                Hi! I'm a developer blending <span class="text-blue-600 font-bold">design</span> and <span class="text-emerald-600 font-bold">engineering</span> to build immersive digital experiences. I specialize in merging flat UI with rich 3D worlds.
             </p>
             <h2 class="text-sm font-bold mb-4 underline decoration-wavy decoration-emerald-400 text-slate-800">Experience</h2>
             <ul class="text-xs space-y-4 list-none pl-0">
                 <li class="relative pl-4 border-l-2 border-slate-300">
                    <strong class="font-bold text-slate-900 block text-sm">Studio Abstract</strong>
                    <span class="text-emerald-600 text-[10px] font-bold block mb-1">Sr. WebGL Dev (2023-Present)</span>
                    <span class="text-slate-600 text-[11px] leading-tight block">Leading team to deliver award-winning 3D experiences.</span>
                 </li>
                 <li class="relative pl-4 border-l-2 border-slate-300">
                    <strong class="font-bold text-slate-900 block text-sm">TechFlow Inc</strong>
                    <span class="text-blue-600 text-[10px] font-bold block mb-1">Frontend Eng (2020-2023)</span>
                    <span class="text-slate-600 text-[11px] leading-tight block">Built scalable Vue.js apps & optimized rendering by 40%.</span>
                 </li>
             </ul>
         </div>
         </Html>
      </TresMesh>

      <!-- pen next to it -->
      <TresMesh cast-shadow receive-shadow :position="[2.3, 0.05, 0]" :rotation="[0, -0.2, 1.57]">
         <TresCylinderGeometry :args="[0.065, 0.065, 1.95, 16]" />
         <TresMeshStandardMaterial color="#94a3b8" />
      </TresMesh>
    </TresGroup>

    <!-- Contact: Smartphone -->
    <TresGroup 
      :position="[4, 0, 3]"
      :rotation="[0, -0.4, 0]"
      :userData="{ originalY: 0 }"
    >
      <Html :position="[0, 1.5, 0]" center :distance-factor="15" v-if="props.activeObject !== 'contact'">
        <div class="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-slate-200 text-slate-800 font-bold text-sm select-none pointer-events-none transition-opacity duration-300" :class="{'opacity-100': hoveredIds.has('contact'), 'opacity-60': !hoveredIds.has('contact')}">
          Contact
        </div>
      </Html>

       <TresMesh v-if="props.activeObject !== 'contact'" :position="[0, 0.5, 0]" @pointer-enter="(ev) => onPointerEnter(ev, 'contact')" @pointer-leave="(ev) => onPointerLeave(ev, 'contact')" @click="(ev) => onClick(ev, 'contact')">
         <TresBoxGeometry :args="[3.25, 2, 4]" />
         <TresMeshBasicMaterial :transparent="true" :opacity="0" :depthWrite="false" />
      </TresMesh>

      <!-- Base -->
      <TresMesh cast-shadow receive-shadow :position="[0, 0.05, 0]">
        <TresBoxGeometry :args="[1.56, 0.13, 3.12]" />
        <TresMeshStandardMaterial color="#f8fafc" :roughness="0.3" :metalness="0.5" />
      </TresMesh>
      
      <!-- Screen with Black Backing and HTML -->
      <TresMesh :position="[0, 0.115, 0]" :rotation="[-1.57, 0, 0]">
         <TresPlaneGeometry :args="[1.44, 2.92]" />
         <TresMeshBasicMaterial color="#000000" />
         <Html transform :position="[0, 0, 0.05]" :scale="0.01">
            <div style="width: 144px; height: 292px;" class="bg-slate-50 flex flex-col pointer-events-auto select-none shadow-inner rounded-xl overflow-hidden border-[6px] border-black">
                <!-- Status Bar -->
                <div class="bg-black text-white text-[8px] font-bold flex justify-between items-center px-4 py-1">
                    <span>9:41</span>
                    <span class="flex gap-1 items-center"><span class="w-1.5 h-1.5 bg-white rounded-full"></span><span class="w-3 h-2 bg-white rounded-sm border-[0.5px] border-white/50"></span></span>
                </div>
                <!-- App Body -->
                <div class="flex-1 flex flex-col items-center justify-start pt-6 px-3 bg-gradient-to-b from-purple-50 to-white relative">
                    <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl mb-3 shadow-[0_4px_10px_rgba(168,85,247,0.2)] border border-purple-100 z-10">
                        👋
                    </div>
                    <h2 class="text-sm font-bold text-slate-800 text-center mb-1">Let's Connect</h2>
                    <p class="text-[9px] text-slate-500 text-center mb-5 leading-tight">Available for freelance opportunities.</p>
                    
                    <button class="w-full bg-slate-900 text-white text-[10px] font-semibold py-2 rounded-lg mb-2 hover:bg-slate-700 transition-colors flex items-center justify-center gap-1 shadow-md active:scale-95 duration-150">
                        <span class="text-xs">✉️</span> hello@varver.dev
                    </button>
                    <button class="w-full bg-[#0a66c2] text-white text-[10px] font-semibold py-2 rounded-lg hover:bg-[#004182] transition-colors flex items-center justify-center gap-1 shadow-md active:scale-95 duration-150">
                        <span class="text-xs">🔗</span> /in/vvarver
                    </button>
                    
                    <!-- Decorative shapes -->
                    <div class="absolute -top-6 -left-6 w-20 h-20 bg-purple-200/50 rounded-full blur-xl pointer-events-none"></div>
                    <div class="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-200/50 rounded-full blur-xl pointer-events-none"></div>
                </div>
                <!-- Home indicator -->
                <div class="h-2 bg-white flex justify-center items-center pb-2">
                    <div class="w-10 h-[3px] bg-slate-300 rounded-full"></div>
                </div>
            </div>
         </Html>
      </TresMesh>
    </TresGroup>

    <!-- Tech: Standing Monitor -->
    <TresGroup 
      :position="[5.5, 0, -3.5]"
      :rotation="[0, -0.6, 0]"
      :userData="{ originalY: 0 }"
    >
      <Html :position="[0, 6, 0]" center :distance-factor="15" v-if="props.activeObject !== 'tech'">
        <div class="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-slate-200 text-slate-800 font-bold text-sm select-none pointer-events-none transition-opacity duration-300" :class="{'opacity-100': hoveredIds.has('tech'), 'opacity-60': !hoveredIds.has('tech')}">
          Technologies
        </div>
      </Html>

      <TresMesh v-if="props.activeObject !== 'tech'" :position="[0, 2, 0]" @pointer-enter="(ev) => onPointerEnter(ev, 'tech')" @pointer-leave="(ev) => onPointerLeave(ev, 'tech')" @click="(ev) => onClick(ev, 'tech')">
         <TresBoxGeometry :args="[5.85, 5.85, 2.6]" />
         <TresMeshBasicMaterial :transparent="true" :opacity="0" :depthWrite="false" />
      </TresMesh>

      <!-- Base -->
      <TresMesh cast-shadow receive-shadow :position="[0, 0.1, 0]">
        <TresCylinderGeometry :args="[1.3, 1.3, 0.26, 32]" />
        <TresMeshStandardMaterial color="#cbd5e1" :roughness="0.3" :metalness="0.4" />
      </TresMesh>
      
      <!-- Stand -->
      <TresMesh cast-shadow receive-shadow :position="[0, 1.95, 0]">
        <TresCylinderGeometry :args="[0.26, 0.26, 3.9, 16]" />
        <TresMeshStandardMaterial color="#94a3b8" :roughness="0.4" :metalness="0.5" />
      </TresMesh>
      
      <!-- Monitor Back -->
      <TresMesh cast-shadow receive-shadow :position="[0, 3.9, 0.26]">
        <TresBoxGeometry :args="[6.76, 4.16, 0.39]" />
        <TresMeshStandardMaterial color="#e2e8f0" :roughness="0.2" :metalness="0.6" />
      </TresMesh>

      <!-- Screen with Black plane and UI -->
      <TresMesh :position="[0, 3.9, 0.46]">
         <TresPlaneGeometry :args="[6.5, 3.9]" />
         <TresMeshBasicMaterial color="#0f172a" />
         <Html transform :position="[0, 0, 0.05]" :scale="0.01">
            <div style="width: 650px; height: 390px;" class="bg-[#0f172a] shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] border border-slate-800 overflow-hidden flex flex-col font-mono text-emerald-400 pointer-events-auto select-none rounded-sm">
                <!-- Top bar -->
                <div class="bg-[#161b22] px-4 py-2 flex justify-between items-center text-xs text-slate-400 border-b border-slate-800">
                    <div class="flex gap-2 items-center">
                        <span class="w-3 h-3 rounded-full bg-slate-700 hover:bg-red-500 cursor-pointer"></span>
                        <span class="w-3 h-3 rounded-full bg-slate-700 hover:bg-yellow-500 cursor-pointer"></span>
                        <span class="w-3 h-3 rounded-full bg-slate-700 hover:bg-green-500 cursor-pointer"></span>
                    </div>
                    <span class="font-bold tracking-widest text-[#8b949e]">~ bash - root@nexus</span>
                    <span class="font-bold cursor-pointer hover:text-white transition-colors">✕</span>
                </div>
                <!-- Content -->
                <div class="flex-1 p-6 space-y-4 overflow-y-auto text-sm">
                    <p><span class="text-purple-400 font-bold">root@nexus</span>:<span class="text-blue-400 font-bold">~/stack</span>$ ls -la</p>
                    <div class="grid grid-cols-2 gap-x-6 gap-y-2 text-[#8b949e] pl-4">
                        <span><span class="text-blue-400">drwxr-xr-x</span>  vue3</span>
                        <span><span class="text-blue-400">drwxr-xr-x</span>  three.js</span>
                        <span><span class="text-blue-400">drwxr-xr-x</span>  tailwind</span>
                        <span><span class="text-blue-400">drwxr-xr-x</span>  gsap</span>
                        <span><span class="text-slate-400">-rw-r--r--</span>  typescript</span>
                        <span><span class="text-slate-400">-rw-r--r--</span>  vite</span>
                    </div>
                    <p class="mt-6"><span class="text-purple-400 font-bold">root@nexus</span>:<span class="text-blue-400 font-bold">~/stack</span>$ neofetch</p>
                    <div class="flex gap-8 mt-5 pl-4">
                        <div class="text-emerald-500 whitespace-pre leading-[1.2] text-[10px] font-bold self-center">
   /#
  /  ##
 /  /  ##
/  /  /  ##
\  \  \  ##
 \  \  ##
  \  ##
   \#
                        </div>
                        <div class="text-[13px] text-[#8b949e] leading-relaxed flex flex-col justify-center">
                            <div><span class="text-emerald-400 font-bold w-24 inline-block">OS:</span> WebKit/Blink App</div>
                            <div><span class="text-emerald-400 font-bold w-24 inline-block">Kernel:</span> Vue Engine v3.5</div>
                            <div><span class="text-emerald-400 font-bold w-24 inline-block">Uptime:</span> 99.9%</div>
                            <div><span class="text-emerald-400 font-bold w-24 inline-block">Shell:</span> ZSH 5.9</div>
                            <div><span class="text-emerald-400 font-bold w-24 inline-block">Resolution:</span> 4K Ultra HD</div>
                            <div><span class="text-emerald-400 font-bold w-24 inline-block">Theme:</span> OrbitFolio Dark</div>
                        </div>
                    </div>
                    <p class="mt-6"><span class="text-purple-400 font-bold">root@nexus</span>:<span class="text-blue-400 font-bold">~/stack</span>$ <span class="animate-pulse">_</span></p>
                </div>
            </div>
         </Html>
      </TresMesh>
    </TresGroup>

    <!-- Potted Plant (Accent) -->
    <TresGroup :position="[-8, 0, -4.5]" :rotation="[0, 0, 0]">
      <!-- Pot (White) -->
      <TresMesh cast-shadow receive-shadow :position="[0, 0.8, 0]">
        <TresCylinderGeometry :args="[1.2, 0.8, 1.6, 32]" />
        <TresMeshStandardMaterial color="#f8fafc" :roughness="0.5" />
      </TresMesh>
      <!-- Soil -->
      <TresMesh receive-shadow :position="[0, 1.6, 0]">
        <TresCylinderGeometry :args="[1.15, 1.15, 0.1, 32]" />
        <TresMeshStandardMaterial color="#1c1917" :roughness="1" />
      </TresMesh>
      <!-- Leaves (Stylized spheres) -->
      <TresMesh cast-shadow receive-shadow :position="[0, 2.5, 0]">
        <TresSphereGeometry :args="[1.2, 16, 16]" />
        <TresMeshStandardMaterial color="#10b981" :roughness="0.5" />
      </TresMesh>
      <TresMesh cast-shadow receive-shadow :position="[-0.8, 2.2, 0.5]">
        <TresSphereGeometry :args="[0.8, 16, 16]" />
        <TresMeshStandardMaterial color="#34d399" :roughness="0.5" />
      </TresMesh>
      <TresMesh cast-shadow receive-shadow :position="[0.7, 2, -0.6]">
        <TresSphereGeometry :args="[0.9, 16, 16]" />
        <TresMeshStandardMaterial color="#6ee7b7" :roughness="0.5" />
      </TresMesh>
    </TresGroup>

  </TresCanvas>
</template>
