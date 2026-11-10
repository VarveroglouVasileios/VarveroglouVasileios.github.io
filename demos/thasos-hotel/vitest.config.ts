import { defineConfig } from 'vitest/config'

// Kept separate from vite.config.ts: vitest ships its own Vite typings.
export default defineConfig({ test: { environment: 'node', include: ['src/**/*.test.ts'] } })
