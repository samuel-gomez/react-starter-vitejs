/// <reference types="vitest" />
/// <reference types="vite/client" />

import { type PluginOption } from 'vite';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => ({
  define: {
    'process.env.APP_MODE': JSON.stringify(mode),
  },
  server: {
    port: 3000,
  },
  plugins: [react(), tsconfigPaths(), visualizer() as PluginOption],
  build: {
    outDir: 'build',
  },
  preview: {
    port: 5002,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.tsx'],
    reporters: ['default', 'vitest-sonar-reporter'],
    outputFile: 'test-report.xml',
    testTimeout: 20000,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      100: true,
      reporter: ['json', 'lcov', 'text', 'clover', 'html'],
      exclude: [
        'src/setupTests.tsx',
        'src/shared/testsUtils/**/*.{ts,tsx}',
        'src/**/index.{ts,tsx}',
        'src/**/index.{ts,tsx}',
        'src/**/*.test.{js,ts}',
        'src/**/__tests__/*.{ts,tsx}',
        'src/**/constants.ts',
        'scripts/**',
      ],
    },
  },
}));
