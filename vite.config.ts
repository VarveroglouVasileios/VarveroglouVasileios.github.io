import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { templateCompilerOptions } from '@tresjs/core'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => ({
  base: process.env.VITE_BASE ?? '/',
  server: {
    port: 8989,
  },
  plugins: [
    vue({
      ...templateCompilerOptions,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  build: {
    chunkSizeWarningLimit: 750,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return
          }

          // Keep all modules that import `three` in this chunk; otherwise they land in
          // `vendor` and Rollup emits vendor-3d ↔ vendor circular chunks (runtime TDZ).
          if (
            id.includes('three') ||
            id.includes('@tresjs') ||
            id.includes('@pmndrs') ||
            id.includes('camera-controls') ||
            id.includes('stats-gl')
          ) {
            return 'vendor-3d'
          }

          if (id.includes('gsap')) {
            return 'vendor-motion'
          }

          if (id.includes('vue-router')) {
            return 'vendor-router'
          }

          return 'vendor'
        },
      },
    },
  },
}))
