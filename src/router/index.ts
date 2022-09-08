import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import Layout from '@/components/Layout.vue'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean
    title?: string
    auth?: Array<number>
    activeMenu?: string
    hidden?: boolean
  }
}

const Layout = {
  template: '<router-view></router-view>'
}

export const navRoutes: Array<RouteRecordRaw> = [
  // 监控指标
  {
    path: 'dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    name: 'DashBoard',
    meta: {
      requiresAuth: false,
      title: 'DashBoard',
    },
  },
]
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/views/index.vue'),
    children: [...navRoutes],
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
