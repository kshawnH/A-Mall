import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 实现组件内的动态导入，将vant-ui中的组件自动注册成全局组件
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
// 自动导入插件
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      dirs: ['src/components'], // 希望components下的文件夹 自动变成全局组件
      resolvers: [VantResolver()]
    }),
    AutoImport({
      // vue  vue-router pinia 中的方法都不需要手动的import 直接使用方法即可
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: false // 开启后，生成eslint配置文件;
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    // 需要安装less 来使用 pnpm install less
    preprocessorOptions: {
      less: {
        additionalData: '@import "/src/assets/var.less";'
      }
    }
  }
})
