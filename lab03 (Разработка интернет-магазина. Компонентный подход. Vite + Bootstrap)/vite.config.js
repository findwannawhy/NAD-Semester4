import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/stocks': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  }
}) 