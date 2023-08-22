import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/trading-tools/',
  plugins: [react()],
  server: {
    port: 3000
  },
  resolve: {
      alias: {
        '@': pathResolve('src')
      }
  },
  
})
