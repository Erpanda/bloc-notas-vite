import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',        // raíz del proyecto
  build: {
    outDir: 'dist', // carpeta de salida
    emptyOutDir: true
  }
});
