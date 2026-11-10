<script setup lang="ts">
defineProps<{ dish: string }>()
</script>

<template>
  <svg aria-hidden="true" class="dish-art" :class="`dish-${dish}`" viewBox="0 0 260 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="130" cy="72" rx="76" ry="53" stroke="currentColor" stroke-width="1.4"/>
    <ellipse cx="130" cy="72" rx="67" ry="45" stroke="currentColor" stroke-width="1" stroke-dasharray="1.5 3.5"/>
    <g v-if="dish === 'octopus'" stroke="currentColor" stroke-width="2.8" stroke-linecap="round">
      <path d="M92 96c-11-19 8-26 23-20s31 9 32-5c1-11-14-16-24-13-18 6-18-12-7-19 15-10 40-2 48 13 15 27-7 46-27 46-12 0-22-10-31-7-5 2-5 7-1 10"/>
      <path d="M121 46c8-4 20-1 26 5m-14 42c15 3 30-5 34-19M93 72l5-10m-10 3 9 1m66 34 12-5"/>
      <circle cx="112" cy="86" r="2"/><circle cx="124" cy="91" r="2"/><circle cx="143" cy="91" r="2"/>
    </g>
    <g v-else-if="dish === 'moussaka'" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round">
      <path d="m87 64 66-20 22 24-63 20zM87 64v21l25 21 63-22V68m-63 20v18M90 73l22 19 62-20m-84 7 22 19 62-21"/>
      <path d="m102 62 13 10m1-15 13 10m0-15 14 10m0-15 14 11m-37 16 47-15m-31 20 39-13"/>
    </g>
    <g v-else stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
      <ellipse cx="130" cy="72" rx="44" ry="27"/>
      <path d="M101 76c-8-8 3-18 27-19 22-1 37 7 32 14-5 8-42 14-48 4-4-8 22-13 34-8m-24 22c19 2 38-2 45-11"/>
      <circle cx="130" cy="70" r="2"/><circle cx="139" cy="74" r="2"/><circle cx="123" cy="77" r="2"/>
      <path d="m80 64 13-8m-8-1 3 5m73 35 14 4m-4-6-3 5"/>
    </g>
  </svg>
</template>
