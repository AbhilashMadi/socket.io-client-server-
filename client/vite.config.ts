import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import url from "node:url"
import path from "node:path"

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "../public"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@chat-app": path.resolve(__dirname, "./src/components/chat-app")
    }
  }
})
