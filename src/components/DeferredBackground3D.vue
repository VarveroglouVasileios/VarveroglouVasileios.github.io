<script setup lang="ts">
import Background3D from '@/components/Background3D.vue'
import { useScrollSectionTheme } from '@/composables/useScrollSectionTheme'

const { activeSection } = useScrollSectionTheme()
</script>

<template>
  <!-- Background renders immediately; Tres 5 + Vue 3.5.x align provide/inject with TresCanvas. -->
  <Background3D :section-key="activeSection" />
</template>
