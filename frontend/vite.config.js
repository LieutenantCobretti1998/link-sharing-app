import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Load environment variables
export default defineConfig(({ mode }) => {
  console.log(mode)
  return {
    plugins: [react()],
    server: {
      host: true,
      port: 3000,
      proxy: mode === 'development' ? {
        '/api': {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
          secure: false, // Set to true if your backend uses HTTPS
        }
      } : {},
    },
  }
})

