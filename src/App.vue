<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import ElevatorScene from '@/components/ElevatorScene.vue'
</script>

<template>
  <div class="relative min-h-screen">
    <!-- Fixed 3D background -->
    <div class="fixed inset-0 z-0">
      <TresCanvas
        window-size
        :clear-color="'#0a0a0f'"
        :clear-alpha="1"
        shadows
      >
        <ElevatorScene />
      </TresCanvas>
    </div>

    <!-- Scrollable content overlay (5 sections, 100vh each) -->
    <div class="relative z-10 pointer-events-none">
      <section class="h-screen" data-floor="0" />
      <section class="h-screen" data-floor="1" />
      <section class="h-screen" data-floor="2" />
      <section class="h-screen" data-floor="3" />
      <section class="h-screen" data-floor="4" />
    </div>
  </div>
</template>
