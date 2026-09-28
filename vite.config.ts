/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

/**
 * GitHub Pages project site base path.
 * The repository is served at https://<owner>.github.io/Interactive-Geometry-Grade8/
 * so every emitted asset URL must be prefixed with that path.
 *
 * Combined with HashRouter, this guarantees deep links work on Pages without
 * any server-side rewrite rules.
 */
export const GITHUB_PAGES_BASE = '/Interactive-Geometry-Grade8/';

export default defineConfig({
  base: GITHUB_PAGES_BASE,
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    /**
     * Dev-server only — has no effect on the static production build that is
     * published to GitHub Pages. Allows the app to be previewed through a
     * remote sandbox/tunnel host in addition to localhost.
     */
    allowedHosts: ['localhost', '127.0.0.1', '.e2b.app'],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        /**
         * KaTeX is large and changes rarely; splitting it from app code keeps
         * the cacheable vendor chunks stable as lesson content grows.
         */
        manualChunks: (id: string) => {
          if (id.includes('node_modules/katex')) return 'katex';
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
            return 'react';
          }
          return undefined;
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    css: false,
  },
});
