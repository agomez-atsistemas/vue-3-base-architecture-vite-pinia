import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
const path = require('path')

export default defineConfig({
  plugins: [ vue(), svgLoader() ],
  server: {
    port: 8080
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setupTests.ts'],
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      },
      {
        find: '@tests',
        replacement: path.resolve(__dirname, 'tests')
      },
    ]
  }
});