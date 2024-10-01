import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: import.meta.env.NODE_ENV === 'production'?'/simpletype':undefined //this is used by vite to set prefix on the static urls while creating the build
})
