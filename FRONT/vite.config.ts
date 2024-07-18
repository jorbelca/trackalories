// https://vitejs.dev/config/

import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],

  build: {
    outDir: "./build",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy:
      process.env.VITE_PRODUCTION === "true"
        ? {}
        : {
            "/api": {
              target: "http://localhost:3003",
              changeOrigin: true,
              secure: false,
              rewrite: (path) => path.replace(/^\/api/, "/api"),
            },
          },
  },
});
