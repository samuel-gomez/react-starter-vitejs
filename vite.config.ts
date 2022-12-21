import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],  
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.tsx'],
    outputFile: 'test-report.xml',
    coverage: {
      reporter: [
        "json",
        "lcov",
        "text",
        "clover",
        "html"
      ],            
      exclude: ['src/setupTests.tsx', 'src/shared/testsUtils/**/*.{ts,tsx}', 'src/**/index.{ts,tsx}'],
    },
  }
})
