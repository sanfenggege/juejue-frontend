import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { createStyleImportPlugin } from 'vite-plugin-style-import';

const __dirname = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createStyleImportPlugin({
      libs: [
        // If you don’t have the resolve you need, you can write it directly in the lib, or you can provide us with PR
        {
          libraryName: 'zarm',
          esModule: true,
          resolveStyle: (name) => {
            return `zarm/es/${name}/style/index`
          },
        },
      ],
    }),
  ],
  css: {
    modules: {
      localsConvention: 'dashesOnly'
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      }
    }
  },
  // need to do: it is optional to add.
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // src 路径
      'utils': path.resolve(__dirname, 'src/utils') // src 路径
    }
  },

  // need to do:
  // 这样配置完之后，开发环境下，/api/userInfo -> http://api.chennick.wang/api/userInfo。这样就解决了大家老大难的跨域问题。
  // 但是其实服务端只要设置好白名单，就不会有这样那样的跨域问题。
  // server: {
  //   proxy: {
  //     '/api': {
  //       // 当遇到 /api 路径时，将其转换成 target 的值
  //       // target: 'http://api.chennick.wang/api/',
  //       target: 'http://127.0.0.1:7001/api/',
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, '') // 将 /api 重写为空
  //     }
  //   }
  // },
})
