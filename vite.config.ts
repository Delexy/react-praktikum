import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@hooks": "/src/hooks",
      "@components": "/src/components",
      "@projectTypes": "/src/types",
      "@utils": "/src/utils",
    },
  },
});
