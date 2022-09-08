import { RouteLocationNormalized } from 'vue-router'
import router from './index'

// 访问白名单
const whiteList = []

async function canUserAccess(to: RouteLocationNormalized) {
  // 校验要进入的页面是否需要权限
  const { requiresAuth, auth } = to.meta
  // 校验 token 是否有效
  // 需要权限
  if (requiresAuth) {
    // token 有效
    // token 无效
    return true
  }
  // 不需要权限
  return true
}

router.beforeEach(async (to, from) => {
  return canUserAccess(to)
})
