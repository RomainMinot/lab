import path from 'node:path';
import Vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import Pages from 'vite-plugin-pages';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, ``)}/`,
      '~/': `${path.resolve(__dirname, `src`)}/`,
    },
  },
  plugins: [
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
        /\.md$/,
      ],
      imports: [
        'vue',
        'vue-router',
        'pinia',
        '@vueuse/core',
      ],
      dts: './src/types/auto-imports.d.ts',
    }),
    Components({
      dts: './src/types/components.d.ts',
      directoryAsNamespace: true,
      types: [{
        from: 'vue-router',
        names: ['RouterLink', 'RouterView'],
      }],
    }),
    Pages({
      extensions: [`vue`],
      dirs: 'src/views',
    }),
    UnoCSS(),
    Vue({
      include: [/\.vue$/],
      reactivityTransform: false,
    }),
    vueDevTools(),
  ],
});
