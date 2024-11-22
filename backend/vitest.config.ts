import { defineConfig } from 'vitest/config.js'

export default defineConfig({
  test: {
    setupFiles: ['./tests/testSetup.js'],
  },
})
