import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],  
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
      exclude: ['src/setupTests.tsx', 'src/shared/testsUtils/**/*.{ts,tsx}'],
    },
  }
})
