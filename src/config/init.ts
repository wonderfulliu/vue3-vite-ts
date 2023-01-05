import util from '@/utils'
import { initLpk, lpk } from './lpk'

// window 对象上绑定全局变量
export const initGlobalVars = () => {
  // 定义全局变量相关的类型
  type globalKeys = {
    [K in GlobalType.globalKeys]?: any
  }
  // 实际：挂载在全局对象上的变量（有可能未定义TS，无TS提示）
  const iGlobalVars: globalKeys = {
    util, // 全局工具函数
    lpk, // 国际化
  }

  Object.keys(iGlobalVars).forEach((key) => {
    ;(window as any)[key] = iGlobalVars[key as GlobalType.globalKeys]
  })
}

export default async () => {
  // window 对象上绑定全局变量
  initGlobalVars()
  // 语言包初始化
  initLpk()
  // 定制主题
  // 定义全局组件
}
