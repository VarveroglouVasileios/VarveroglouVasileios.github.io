<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const Hero3D = defineAsyncComponent(() => import('@/components/Hero3D.vue'))
const ContactSection = defineAsyncComponent(() => import('@/components/sections/ContactSection.vue'))
</script>

<template>
  <div>
    <Hero3D />
    <ContactSection />
  </div>
</template>
