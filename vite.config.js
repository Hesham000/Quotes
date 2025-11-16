import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy to avoid CORS issues when calling the external Motivational Spark API
      '/api/quotes': {
        target: 'https://motivational-spark-api.vercel.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/quotes/, '/api/quotes'),
      },
    },
  },
})

