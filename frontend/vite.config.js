import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/BLManagementSystem",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});