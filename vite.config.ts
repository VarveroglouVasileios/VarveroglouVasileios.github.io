import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { templateCompilerOptions } from '@tresjs/core'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return
          }

          if (id.includes('three') || id.includes('@tresjs')) {
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
})
