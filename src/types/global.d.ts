import { IUtils } from '@/utils'
declare global {
  // 定义全局命名空间
  namespace GlobalType {
    // 定义全局的变量的类型
    type globalKeys = 'app' | 'lpk' | 'util' | 'ajax'
    type Utils = IUtils
    type timeId = NodeJS.Timeout
  }
  // 扩展 Window 对象的属性
  interface Window {
    timeId: GlobalType.timeId
    util: GlobalType.Utils
  }
  // 扩展 HTMLDivElement
  interface HTMLDivElement {
    left: number
    setCapture():void
    releaseCapture():void
  }
  // 定义util变量的类型，使之在ts文件中能直接被访问而不报ts错误，而不是通过Window.util
  const util: GlobalType.Utils
}

// 在template中可以直接访问util
declare module 'vue' {
  interface ComponentCustomProperties {
    util: GlobalType.Utils
  }
}

export {}
