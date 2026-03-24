import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    minify: "esbuild",
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-chakra": [
            "@chakra-ui/react",
            "@chakra-ui/icons",
            "@emotion/react",
            "@emotion/styled",
            "framer-motion",
          ],
          "vendor-firebase": ["firebase/app", "firebase/auth", "firebase/firestore"],
          "vendor-tiptap": [
            "@tiptap/react",
            "@tiptap/starter-kit",
            "@tiptap/extension-link",
            "@tiptap/extension-placeholder",
          ],
          "vendor-query": ["@tanstack/react-query"],
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
    include: ["@chakra-ui/react", "@emotion/react", "@emotion/styled", "framer-motion"],
    esbuildOptions: {
      treeShaking: true,
    },
  },
});
