import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import compression from "vite-plugin-compression";

const securityHeaders = () => ({
  name: "security-headers",
  enforce: "post" as const,
  apply: "build" as const,
  transformIndexHtml: () => [
    {
      tag: "meta",
      attrs: { "http-equiv": "X-Content-Type-Options", content: "nosniff" },
      inject: "head" as const,
    },
    {
      tag: "meta",
      attrs: { "http-equiv": "X-Frame-Options", content: "DENY" },
      inject: "head" as const,
    },
    {
      tag: "meta",
      attrs: { "http-equiv": "X-XSS-Protection", content: "1; mode=block" },
      inject: "head" as const,
    },
    {
      tag: "meta",
      attrs: { "http-equiv": "Referrer-Policy", content: "strict-origin-when-cross-origin" },
      inject: "head" as const,
    },
    {
      tag: "meta",
      attrs: {
        "http-equiv": "Content-Security-Policy",
        content:
          "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.cloudinary.com wss://*.firebaseio.com",
      },
      inject: "head" as const,
    },
    {
      tag: "meta",
      attrs: { name: "Permissions-Policy", content: "camera=(), microphone=(), geolocation=()" },
      inject: "head" as const,
    },
  ],
});

export default defineConfig({
  plugins: [
    react(),
    securityHeaders(),
    compression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 10240,
    }),
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 10240,
    }),
  ],
  build: {
    target: "esnext",
    minify: "esbuild",
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore"],
          tiptap: [
            "@tiptap/react",
            "@tiptap/starter-kit",
            "@tiptap/extension-link",
            "@tiptap/extension-placeholder",
          ],
          query: ["@tanstack/react-query"],
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
          utils: ["clsx", "tailwind-merge", "class-variance-authority", "lodash.debounce"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
});
