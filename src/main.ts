import { createApp } from 'vue'
import App from './App.vue'

// UI 框架
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

// 样式格式化
import 'normalize.css/normalize.css'
// 引入全局样式
import '@/styles/common.scss'

// 引入 vue-router
import router from '@/router'
import '@/router/permission'
// 引入 store
import pinia from '@/store'

const app = createApp(App)
app
  .use(router)
  .use(pinia)
  // size：使用的表单组件全部 small 格式，语言为中文
  .use(ElementPlus, { size: 'small', locale: zhCn })
  .mount('#app')
