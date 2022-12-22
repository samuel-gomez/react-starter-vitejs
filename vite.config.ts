/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: 'build',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.tsx'],
    reporters: ['default', 'vitest-sonar-reporter'],
    outputFile: 'test-report.xml',
    testTimeout: 10000,
    coverage: {
      100: true,
      reporter: ['json', 'lcov', 'text', 'clover', 'html'],
      exclude: ['src/setupTests.tsx', 'src/shared/testsUtils/**/*.{ts,tsx}', 'src/**/index.{ts,tsx}', 'src/**/__tests__/*.{ts,tsx}'],
    },
  },
});
