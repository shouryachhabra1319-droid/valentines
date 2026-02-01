import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        love: resolve(__dirname, "love.html"),
        music: resolve(__dirname, "music.html"),
        photos: resolve(__dirname, "photos.html"),
        final: resolve(__dirname, "final.html"),
      },
    },
  },
});
