import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import vueJsx from "@vitejs/plugin-vue-jsx";
import vitePluginImp from "vite-plugin-imp"
// https://vitejs.dev/config/

// VITE配置项


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "./",
    // resolve: {
    //   // 配置路径别名
    //   alias: {
    //     '@': path.resolve(__dirname, './src')
    //   }
    // },
    server: {
      port: 9000,
      open: true,
      proxy: {
        [env.VITE_BASIC_URL]: {
          target: "https://iot.fastbee.cn/prod-api",
          changeOrigin: true,
          ws: true,
          rewrite: (path) => {
            let reg = new RegExp(`^${env.VITE_BASIC_URL}`)
            return path.replace(reg, "");
          }
        }
      }
    },
    plugins: [vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
    vueJsx(),
    vitePluginImp({
      libList: [
        {

        }
      ]
    })
    ],
    // css: {
    //   preprocessorOptions: {
    //     less: {
    //       javascriptEnabled: true,
    //       // 全局通用样式
    //       additionalData: `@import "${path.resolve(__dirname, 'src/assets/styles/common.less')}";`
    //     }
    //   },
    // },
    build: {
      // target: 'es2015',
      // outDir: OUTPUT_DIR,
      assetsInlineLimit: 1024 * 10,
      minify: 'terser', // 如果需要用terser混淆，可打开这两行
      terserOptions: {
        compress: {
          drop_console: true
        }
      },
      reportCompressedSize: false
      // terserOptions: terserOptions,
      // rollupOptions: rollupOptions,
      // brotliSize: brotliSize,
      // chunkSizeWarningLimit: chunkSizeWarningLimit
    }
  }

})
