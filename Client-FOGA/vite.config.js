// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { sitemap } from 'vite-plugin-sitemap' // <--- 1. Import the sitemap plugin

// Define all the public routes/paths that the sitemap needs to include.
// IMPORTANT: Adjust this list to match your agfogapedu.org routes!
const mainRoutes = [
  '/', 
  '/about', 
  '/contact-us',
  '/departments/young-singles',
  '/ministries/men',
  '/ministries/children',
  '/ministries/youth',
  '/ministries/women',
  '/ministries/sunday-school',
  '/ministries/creative-arts',
  // ADD ALL OTHER MAIN ROUTES HERE
];


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    sitemap({ // <--- 2. Configure the plugin
      hostname: 'https://agfogapedu.org', // Your domain name
      dynamicRoutes: mainRoutes,
      outDir: 'dist', // Default Vite output directory
    }),
  ],
})