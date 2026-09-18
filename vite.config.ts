import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/information-dashboard.ts',
      name: 'InformationDashboard',
      fileName: 'information-dashboard',
    },
    target: 'es2023',
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
});
