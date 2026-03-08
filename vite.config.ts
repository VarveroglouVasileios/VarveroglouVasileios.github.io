import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // TresJS relies on Vue's template compiler to handle custom elements (<TresCanvas>, etc.).
    // The `isCustomElement` option suppresses "unknown element" warnings for every element
    // starting with "Tres" so the Vue template compiler passes them through untouched.
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('Tres'),
        },
      },
    }),
    // Tailwind CSS v4 Vite plugin – replaces the PostCSS-based setup
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Allow "@/..." imports resolved to the "src" directory
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Optimise TresJS & Three.js dependencies at dev-server start so the
  // browser doesn't have to transform them on every hot-reload.
  optimizeDeps: {
    include: ['three', '@tresjs/core', '@tresjs/cientos'],
  },
})
