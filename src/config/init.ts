import util from '@/utils'

export default async () => {
  // 定义全局变量相关的类型
  type globalKeys = {
    [K in GlobalType.globalKeys]?: any
  }
  // 实际：挂载在全局对象上的变量（有可能未定义TS，无TS提示）
  const iGlobalVars: globalKeys = {
    util, // 全局工具函数
  }

  Object.keys(iGlobalVars).forEach((key) => {
    ;(window as any)[key] = iGlobalVars[key as GlobalType.globalKeys]
  })
}

// export const initGlobalComponents = () => {
//   const globalComponents = import.meta.glob('@/components/*.vue', {
//     eager: true,
//   })
//   console.log(globalComponents)
// }
