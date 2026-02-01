import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        final: resolve(__dirname, 'final.html'),
        love: resolve(__dirname, 'love.html'),
        music: resolve(__dirname, 'music.html'),
        photos: resolve(__dirname, 'photos.html'),
      },
    },
  },
})