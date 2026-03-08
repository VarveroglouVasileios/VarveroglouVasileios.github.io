<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, shallowRef } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'

const props = defineProps<{
  shapeIndex: number
}>()

const PARTICLE_COUNT = 15000

const pointsRef = shallowRef<THREE.Points | null>(null)
const positions = new Float32Array(PARTICLE_COUNT * 3)

// To hold the target positions for each of the 5 shapes
const shapeArrays: Float32Array[] = []

const generateParticles = (geometry: THREE.BufferGeometry, scale: number = 1) => {
  geometry.scale(scale, scale, scale)
  const material = new THREE.MeshBasicMaterial()
  const mesh = new THREE.Mesh(geometry, material)
  const sampler = new MeshSurfaceSampler(mesh).build()
  
  const array = new Float32Array(PARTICLE_COUNT * 3)
  const tempPosition = new THREE.Vector3()
  
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    sampler.sample(tempPosition)
    array[i * 3] = tempPosition.x
    array[i * 3 + 1] = tempPosition.y
    array[i * 3 + 2] = tempPosition.z
  }
  return array
}

onMounted(() => {
  // 0: Sphere
  shapeArrays.push(generateParticles(new THREE.SphereGeometry(2.5, 64, 64), 1))
  // 1: Cylinder
  shapeArrays.push(generateParticles(new THREE.CylinderGeometry(2, 2, 5, 64), 1))
  // 2: Torus
  shapeArrays.push(generateParticles(new THREE.TorusGeometry(2.5, 0.8, 64, 100), 1))
  // 3: Icosahedron
  shapeArrays.push(generateParticles(new THREE.IcosahedronGeometry(2.5, 0), 1))
  // 4: TorusKnot
  shapeArrays.push(generateParticles(new THREE.TorusKnotGeometry(1.8, 0.6, 150, 24), 1))

  // Initialize with shape 0
  const initialPositions = shapeArrays[0] as Float32Array
  for(let i = 0; i < positions.length; i++) {
    positions[i] = initialPositions[i] || 0
  }

  if (pointsRef.value) {
    pointsRef.value.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  }
})

watch(() => props.shapeIndex, (newIdx) => {
  if (!pointsRef.value || !pointsRef.value.geometry.attributes.position) return
  const currentPositions = pointsRef.value.geometry.attributes.position.array as Float32Array
  const startPositions = new Float32Array(currentPositions)
  const targetPositions = shapeArrays[newIdx % shapeArrays.length] as Float32Array
  
  const dummy = { progress: 0 }
  
  // Animate with GSAP using a dummy object to lerp values manually
  gsap.to(dummy, {
    progress: 1,
    duration: 2,
    ease: "power3.inOut",
    onUpdate: () => {
      for (let i = 0; i < currentPositions.length; i++) {
        currentPositions[i] = THREE.MathUtils.lerp(startPositions[i] || 0, targetPositions[i] || 0, dummy.progress)
      }
      if (pointsRef.value && pointsRef.value.geometry.attributes.position) {
        const positionAttr = pointsRef.value.geometry.attributes.position as THREE.BufferAttribute
        positionAttr.needsUpdate = true
      }
    }
  })
})

const mouseX = ref(0)
const mouseY = ref(0)

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mouseX.value = (e.clientX / window.innerWidth) * 2 - 1
    mouseY.value = -(e.clientY / window.innerHeight) * 2 + 1
  })
}

let rafId = 0
const clock = new THREE.Clock()

const loop = () => {
  rafId = requestAnimationFrame(loop)
  const delta = clock.getDelta()
  
  if (pointsRef.value) {
    pointsRef.value.rotation.y += delta * 0.1
    pointsRef.value.rotation.x += delta * 0.05
    
    const targetX = mouseY.value * 0.3
    const targetY = mouseX.value * 0.3
    pointsRef.value.rotation.x += (targetX - pointsRef.value.rotation.x) * 0.05
    pointsRef.value.rotation.y += (targetY - pointsRef.value.rotation.y) * 0.05
  }
}

onMounted(() => {
  loop()
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
})

</script>

<template>
  <TresPoints ref="pointsRef">
    <TresBufferGeometry />
    <TresPointsMaterial 
      :size="0.025" 
      color="#00ffcc" 
      :transparent="true" 
      :opacity="0.9" 
      :sizeAttenuation="true"
      :depthWrite="false"
      :blending="2" 
    />
  </TresPoints>
</template>
