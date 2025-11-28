import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false
    }
  },
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      react: 'react',
      'react-dom': 'react-dom'
    },
  },
  optimizeDeps: {
    include: ['buffer', 'react', 'react-dom', 'react-is'],
  },
  build: {
    rollupOptions: {
      external: ['react-is'],
      output: {
        manualChunks: undefined
      }
    }
  }
})