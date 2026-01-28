import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    lib: {
      entry: "src/mount.js",
      name: "MyReactWidget",
      fileName: () => "my-react-widget.js",
      formats: ["iife"]
    }
  }
})
