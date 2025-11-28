import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Set the base URL for GitHub Pages
  base: '/HackSeries_ImpactX/',
  plugins: [react()],
  server: {
    hmr: {
      overlay: false
    }
  },
  define: {
    global: 'globalThis',
    // Define process.env for compatibility
    'process.env': {}
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      react: 'react',
      'react-dom': 'react-dom'
    },
  },
  optimizeDeps: {
    include: ['buffer', 'react', 'react-dom', 'react-is', 'recharts'],
    // Exclude problematic dependencies from optimization
    exclude: []
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined,
        // Ensure proper handling of exports
        exports: 'named'
      }
    },
    // Disable minification to help debug the issue
    minify: false,
    // Ensure proper chunking
    chunkSizeWarningLimit: 1000
  }
})