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
        about: resolve(__dirname, 'about.html'),
        accommodation: resolve(__dirname, 'accommodation.html'),
        activities: resolve(__dirname, 'activities.html'),
        bookings: resolve(__dirname, 'bookings.html'),
        contact: resolve(__dirname, 'contact.html'),
        events: resolve(__dirname, 'events.html'),
        lodgeDetail: resolve(__dirname, 'lodge-detail.html'),
        productDetail: resolve(__dirname, 'product-detail.html'),
        product: resolve(__dirname, 'product.html'),
        shop: resolve(__dirname, 'shop.html'),
      },
    },
  },
});
