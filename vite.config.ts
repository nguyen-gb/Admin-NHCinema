// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config'
import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [react(), visualizer()] as any,
  test: {
    environment: 'jsdom',
    setupFiles: path.resolve(__dirname, './vitest.setup.js')
  },
  server: {
    port: 3002
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
