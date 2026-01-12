import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: __dirname,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        lodgeDetail: resolve(__dirname, 'lodge-detail.html'),
        productDetail: resolve(__dirname, 'product-detail.html'),
        product: resolve(__dirname, 'product.html'),
      },
    },
  },
});
