import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import Layout from '@/components/Layout.vue'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean
    title?: string
    icon?: string
    auth?: Array<number>
    activeMenu?: string
    hidden?: boolean
  }
}

const Layout = {
  template: '<router-view></router-view>'
}
// 开发路由
export const navRoutes: Array<RouteRecordRaw> = [
  
]
// 功能实例路由
export const utilRoutes: Array<RouteRecordRaw> = [
  // 监控指标
  {
    path: 'dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    name: 'DashBoard',
    meta: {
      requiresAuth: false,
      title: 'DashBoard',
      icon: '闹钟'
    },
  },
  // JsonEditor
  {
    path: 'json-editor',
    component: () => import('@/views/Tools/Json_Editor.vue'),
    name: 'JsonEditor',
    meta: {
      requiresAuth: false,
      title: 'JsonEditor',
      icon: '编辑器'
    },
  },
  // 富文本编辑器-quill
  {
    path: 'quill',
    component: () => import('@/views/Tools/Quill_.vue'),
    name: 'Quill',
    meta: {
      requiresAuth: false,
      title: 'Quill',
      icon: '富文本'
    },
  },
  // 富文本编辑器-wangeditor
  {
    path: 'wang-editor',
    component: () => import('@/views/Tools/Wang_Editor.vue'),
    name: 'WangEditor',
    meta: {
      requiresAuth: false,
      title: 'WangEditor',
      icon: '富文本'
    },
  },
]
const routes: Array<RouteRecordRaw> = [
  // 开发路由
  // {
  //   path: '/',
  //   redirect: '/dashboard',
  //   component: () => import('@/views/index.vue'),
  //   children: [...navRoutes],
  // },
  // 功能实例路由
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/views/index.vue'),
    children: [...utilRoutes],
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/404/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
