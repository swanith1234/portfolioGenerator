import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure the output folder is correctly set
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash][extname]", // CSS files will go under `assets/`
        chunkFileNames: "assets/[name].[hash].js", // JS chunks
        entryFileNames: "assets/[name].[hash].js",
      },
    },
  },
});
