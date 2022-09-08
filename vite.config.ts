import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from "path"
// Provides Vue 3 JSX & TSX support with HMR.
import vueJsx from '@vitejs/plugin-vue-jsx'
// px 转为 vw
import postCssPxToViewPort from 'postcss-px-to-viewport'
// 自动前缀，浏览器兼容
import autoprefixer from 'autoprefixer'
// 自动引入 Vue api
import AutoImport from 'unplugin-auto-import/vite'
// 自动引入 Vue 组件
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({}),
    AutoImport({
      imports: ['vue'],
      dts: 'src/types/auto-imports.d.ts'
    }),
    Components({
      dts: 'src/types/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
  css: {
    /* CSS 预处理器 */
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/index.scss";'
      }
    },
    postcss: {
      plugins: [
        postCssPxToViewPort({
          unitToConvert: 'px',
          viewportWidth: 1920,
          unitPrecision: 5,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: /node_modules/i,
          include: undefined,
          landscape: false,
          landscapeUnit: 'vw',
          landscapeWidth: 1920,
        }),
        autoprefixer({
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'ff > 31',
            'ie >= 8',
            '> 1%',
          ],
          grid: true,
        }),
      ],
    },
  },
  // server: {
  //   port: 5000,
  //   proxy: {
  //     '/api': {
  //       target: 'http://10.0.2.44:9966',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '/api'),
  //     },
  //   },
  // },
})
