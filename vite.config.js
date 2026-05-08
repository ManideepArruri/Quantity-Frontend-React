import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Vite config — proxies /api/v1 calls to the Spring Boot backend.
 *
 * In development:
 *   React app   runs on  http://localhost:5173
 *   Spring Boot runs on  http://localhost:8080
 *
 * The proxy rewrites /api/v1/... → http://localhost:8080/api/v1/...
 * This avoids CORS issues during local development.
 *
 * In production, point BASE_URL in api.js to your deployed backend URL.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});