import { createApp } from 'vue'
import App from './App.vue'

// 全局变量、语言包、Ajax、Tools等
import init from '@/config/init'

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

;(async () => {
  /**
   * 初始化系统基础配置信息
   * 1. 全局变量、语言包、Ajax、Tools的定义
   * 2. ...
   */
  init()
  const app = createApp(App)
  /**
   * 1. 注册全局组件
   * 2. 向根组件绑定全局对象
   * 3. 初始化状态管理、路由、UI组件库
   */ 
  app.config.globalProperties.util = window.util
  app
    .use(router)
    .use(pinia)
    // size：使用的表单组件全部 small 格式，语言为中文
    .use(ElementPlus, { size: 'small', locale: zhCn })
    .mount('#app')
})()
