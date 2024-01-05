import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default ({ command })=> {
  const isBuild = command === 'build' // 保证开发阶段可以使用mock，生产环境禁止开启

  return {
    plugins: [
      vue(),
      vueJsx(),
      viteMockServe({
        mockPath: 'mock', // 解析根目录下的mock文件夹
        localEnabled: !isBuild, // 开发环境
        prodEnabled: isBuild, // 生产环境
        injectCode: `
        import { setupProdMockServer } from '../mock/_createProductionServer'
  
        setupProdMockServer()
        `
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
}
