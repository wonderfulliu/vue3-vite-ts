import { createApp } from 'vue'
import App from './App.vue'

// UI 框架
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 样式格式化
import 'normalize.css/normalize.css'

// 引入 vue-router
import router from '@/router'
import '@/router/permission'
// 引入 store
import pinia from '@/store'

// 引入全局样式
import '@/styles/common.scss'

const app = createApp(App)
app.use(router).use(pinia).use(ElementPlus).mount('#app')
