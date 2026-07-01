export default defineConfig({
  base: "/omri-new/",

  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  assetsInclude: [
    '**/*.svg',
    '**/*.csv',
    '**/*.png',
    '**/*.jpg',
    '**/*.jpeg',
    '**/*.webp',
  ],
})