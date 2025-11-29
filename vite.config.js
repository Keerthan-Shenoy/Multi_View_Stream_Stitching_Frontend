import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

const serverUrl = process.env.VITE_BACKEND_SERVER_URL || 'http://localhost:3000';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: serverUrl,
        changeOrigin: true,
      },
      '/output': {
        target: serverUrl,
        changeOrigin: true,
      },
    },
  },
});