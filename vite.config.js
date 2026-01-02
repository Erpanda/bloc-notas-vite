import { defineConfig } from 'vite';
import { resolve } from 'path';
export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home: resolve(__dirname, '/views/home.html'),
        login: resolve(__dirname, '/views/login.html'),
        register: resolve(__dirname, '/views/register.html'),
        dashboard: resolve(__dirname, '/views/dashboard.html'),
        crearTarea: resolve(__dirname, '/views/crearTarea.html'),
      }
    }
  }
});