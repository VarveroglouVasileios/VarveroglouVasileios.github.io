<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const Hero3D = defineAsyncComponent(() => import('@/components/Hero3D.vue'))
const ProjectsSection = defineAsyncComponent(() => import('@/components/sections/ProjectsSection.vue'))
</script>

<template>
  <div>
    <Hero3D />
    <ProjectsSection />
  </div>
</template>
