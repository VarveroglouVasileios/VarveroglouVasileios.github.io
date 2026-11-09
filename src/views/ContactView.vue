<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const ContactSection = defineAsyncComponent(() => import('@/components/sections/ContactSection.vue'))
</script>

<template>
  <div>
    <ContactSection heading-tag="h1" />
  </div>
</template>
