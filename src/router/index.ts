/**
 * 1. 初始化基础模块的路由配置
 * 2. 初始化各业务模块的路由配置
 * 3. 对路由守卫进行处理
 * 4. keep-alive 的使用
 */
import {
  createRouter,
  createWebHashHistory,
  Router,
  RouteRecordRaw,
} from 'vue-router'

const Layout = {
  template: '<router-view></router-view>',
}
// 开发路由
export const navRoutes: Array<RouteRecordRaw> = []
// 功能实例路由
export const myRoutes: Array<RouteRecordRaw> = [
  // 监控指标
  {
    path: 'dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    name: 'DashBoard',
    meta: {
      requiresAuth: false,
      title: 'DashBoard',
      icon: '闹钟',
    },
  },
  {
    path: 'study',
    component: Layout,
    meta: {
      title: '学习',
      icon: '学习',
    },
    children: [],
  },
  {
    path: 'tool',
    component: Layout,
    meta: {
      title: '工具库',
      icon: '工具',
    },
    children: [
      // JsonEditor
      {
        path: 'json-editor',
        component: () => import('@/views/Tools/Json_Editor.vue'),
        name: 'JsonEditor',
        meta: {
          requiresAuth: false,
          title: 'JsonEditor',
          icon: '编辑器',
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
          icon: '富文本',
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
          icon: '富文本',
        },
      },
    ],
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
    children: [...myRoutes],
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: 'Page Not Found'
    },
    component: () => import('@/views/404/index.vue'),
  },
]

let router: Router | null = null
export const initRouter: () => Router = () => {
  if (router) return router
  router = createRouter({
    history: createWebHashHistory(),
    routes,
  })
  return router
}
