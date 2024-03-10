import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/": path.join(__dirname, "src/"),
    },
  },
  server: {
    proxy: {
      "/api/v1": "http://localhost:8080",
    },
  },
});
