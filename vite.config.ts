import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  test: {
    // A pretend browser: Node has no document, and a component needs one.
    environment: "jsdom",
    // Runs once before every test file -- see src/test/setup.ts.
    setupFiles: ["./src/test/setup.ts"],
    // client.ts reads VITE_API_URL when it is imported. The real value
    // lives in .env, which GitHub's computer will never have.
    env: { VITE_API_URL: "http://api.test" },
  },
});