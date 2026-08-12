import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel serves the site from the domain root; GitHub Pages serves it from /<repo>/.
const base = process.env.BASE_PATH ?? (process.env.VERCEL ? '/' : '/brucemoseti-personal-website/')

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
