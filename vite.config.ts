import { fileURLToPath, URL } from 'node:url'
// import os from 'os'
const os = require('os')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: getNetworkIp(),
  }
})

function getNetworkIp() {
  let needHost = ''; // 打开的host
  try {
      // 获得网络接口列表
      let network = os.networkInterfaces();
      // console.log("network",network)
      for (let dev in network) {
          let iface:any = network[dev];
          for (let i = 0; i < iface.length; i++) {
              let alias = iface[i];
              if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                  needHost = alias.address;
                  // console.log("alias.address",alias.address)
              }
              // console.log("alias",alias)
          }
      }
  } catch (e) {
      needHost = 'localhost';
  }
  return needHost;
}

