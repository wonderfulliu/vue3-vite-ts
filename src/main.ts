import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 样式格式化
import 'normalize.css/normalize.css'

// 引入 store
import pinia from '@/store'

const app = createApp(App)
app.use(pinia).mount('#app')
