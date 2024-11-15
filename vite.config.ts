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
      "@images": "/src/images",
      "@services": "/src/services",
      "@pages": "/src/pages",
    },
  },
});
