var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { templateCompilerOptions } from '@tresjs/core';
import { fileURLToPath, URL } from 'node:url';
export default defineConfig(function (_a) {
    var _b;
    var mode = _a.mode;
    return ({
        base: (_b = process.env.VITE_BASE) !== null && _b !== void 0 ? _b : '/',
        server: {
            port: 8989,
        },
        plugins: [
            vue(__assign({}, templateCompilerOptions)),
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
                    manualChunks: function (id) {
                        if (!id.includes('node_modules')) {
                            return;
                        }
                        // Keep all modules that import `three` in this chunk; otherwise they land in
                        // `vendor` and Rollup emits vendor-3d ↔ vendor circular chunks (runtime TDZ).
                        if (id.includes('three') ||
                            id.includes('@tresjs') ||
                            id.includes('@pmndrs') ||
                            id.includes('camera-controls') ||
                            id.includes('stats-gl')) {
                            return 'vendor-3d';
                        }
                        if (id.includes('gsap')) {
                            return 'vendor-motion';
                        }
                        if (id.includes('vue-router')) {
                            return 'vendor-router';
                        }
                        return 'vendor';
                    },
                },
            },
        },
    });
});
