/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), tsconfigPaths(), visualizer()],
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
    testTimeout: 50000,
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['json', 'lcov', 'text', 'clover', 'html'],
      exclude: [
        'src/setupTests.tsx',
        'src/shared/testsUtils/**/*.{ts,tsx}',
        'src/**/index.{ts,tsx}',
        'src/**/*.test.{js,ts}',
        'src/**/__tests__/*.{ts,tsx}',
        'src/**/constants.ts',
        'scripts/**',
        'src/templates/**',
        'src/**/*.d.ts',
        '*.cjs',
        'build/*',
      ],
      thresholds: {
        100: true,
      },
    },
  },
});
