import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  plugins: [injectHTML()],
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
  },
});
