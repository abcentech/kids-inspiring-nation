import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router')) return 'router'
            if (id.includes('framer-motion')) return 'motion'
            if (id.includes('recharts')) return 'charts'
            if (id.includes('lucide-react')) return 'icons'
            // Keep three.js in its own chunk so it ships ONLY with the lazy
            // WebGL crest (Crest3D) — never in the eager vendor bundle.
            if (id.includes('/three/') || id.includes('@react-three')) return 'three'
            return 'vendor'
          }
        },
      },
    },
  },
})
