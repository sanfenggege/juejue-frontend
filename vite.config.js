import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { styleImport } from 'vite-plugin-style-import';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    //need to do: 注释掉这个styleImport后，在App.jsx中添加 import 'zarm/dist/zarm.css';就解决了报错问题。（神奇的bug，不知道为什么啊！！！）
    // styleImport(
    //   {
    //     libs: [
    //       {
    //         libraryName: 'zarm',
    //         esModule: true,
    //         resolveStyle: (name) => {
    //           return `zarm/es/${name}/style/css`;
    //         },
    //       }
    //     ]
    //   }
    // ),
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // src 路径
      'config': path.resolve(__dirname, 'src/config') // src 路径
    }
  },
  // need to do:
  // 这样配置完之后，开发环境下，/api/userInfo -> http://api.chennick.wang/api/userInfo。这样就解决了大家老大难的跨域问题。
  // 但是其实服务端只要设置好白名单，就不会有这样那样的跨域问题。
  server: {
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值
        // target: 'http://api.chennick.wang/api/',
        target: 'http://127.0.0.1:7001/api/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') // 将 /api 重写为空
      }
    }
  },
})
