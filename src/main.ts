import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'
import axios from 'axios'
//创建app实例
const app = createApp(App)
//使用pinia store
import pinia from '@/store/index'
app.use(pinia)
//封装axios请求
import './utils/request.ts'
//使用vue-router路由
import router from '@/router/index'
app.use(router)

import skeletonDirective from '@/utils/skeletonDirective'
app.use(skeletonDirective)
// 注册所以elementui图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)



// 引入全局方法
import utils from '@/utils'
app.provide('format', utils.format)
app.provide('debounce', utils.debounce)

app.config.globalProperties.$axios = axios
app.mount('#app')
