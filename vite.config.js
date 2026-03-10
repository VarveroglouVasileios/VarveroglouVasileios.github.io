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
var _a;
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { templateCompilerOptions } from '@tresjs/core';
import { fileURLToPath, URL } from 'node:url';
export default defineConfig({
    base: (_a = process.env.VITE_BASE) !== null && _a !== void 0 ? _a : '/',
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
    build: {
        rollupOptions: {
            output: {
                manualChunks: function (id) {
                    if (!id.includes('node_modules')) {
                        return;
                    }
                    if (id.includes('three') || id.includes('@tresjs')) {
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
