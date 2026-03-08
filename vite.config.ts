import { templateCompilerOptions } from '@tresjs/core'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

/**
 * Vite configuration for OrbitFolio
 * TresJS requires templateCompilerOptions to resolve 3D components inside TresCanvas
 * @see https://docs.tresjs.org/guide/getting-started
 */
export default defineConfig({
  plugins: [
    vue({
      ...templateCompilerOptions,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['three', '@tresjs/core', '@tresjs/cientos'],
  },
})
