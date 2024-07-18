import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const isProduction = process.env.VITE_PRODUCTION === "true";
const isTest = process.env.VITE_TEST === "true";

const proxyConfig = {};

if (!isProduction) {
  proxyConfig["/api"] = {
    target: isTest ? "http://localhost:5005" : "http://localhost:3003",
    changeOrigin: true,
    secure: false,
    rewrite: (path) => path.replace(/^\/api/, "/api"),
  };
}
export default defineConfig({
  server: {
    host: "0.0.0.0",
    proxy: proxyConfig,
  },
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
});
