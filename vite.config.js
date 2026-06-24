import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/SA-PruebaReact/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTest.js',
    alias: [
      {
        find: /^\/img\/.+/,
        replacement: path.resolve(__dirname, 'src/mocks/fileMock.js'),
      },
    ],
  },

})
