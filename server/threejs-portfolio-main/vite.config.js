export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    sourcemap: false,  // Disable sourcemaps for build
  },
});
