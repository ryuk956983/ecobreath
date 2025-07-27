import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
   server: {
    host: '0.0.0.0',     // allow external devices to connect
    port: 3000,           // or any port you're using
    strictPort: true,     // fail if port is already in use
  },
})