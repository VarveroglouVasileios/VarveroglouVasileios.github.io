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
import { templateCompilerOptions } from '@tresjs/core';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';
/**
 * Vite configuration for OrbitFolio
 * TresJS requires templateCompilerOptions to resolve 3D components inside TresCanvas
 * @see https://docs.tresjs.org/guide/getting-started
 */
export default defineConfig({
    plugins: [
        vue(__assign({}, templateCompilerOptions)),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    optimizeDeps: {
        include: ['three', '@tresjs/core', '@tresjs/cientos'],
    },
});
