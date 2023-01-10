import { IUtils } from '@/utils'
import { Ilpk } from '@/config/lpk'
declare global {
  // 定义全局命名空间
  namespace GlobalType {
    // 定义全局的变量的类型
    type globalKeys = 'app' | 'lpk' | 'util' | 'ajax'
    type Utils = IUtils
    type timeId = NodeJS.Timeout
    type Lpk = Ilpk
  }
  // 扩展 Window 对象的属性
  interface Window {
    timeId: GlobalType.timeId
    util: GlobalType.Utils
    lpk: GlobalType.Lpk
  }
  // 扩展 HTMLDivElement
  interface HTMLDivElement {
    left: number
    setCapture():void
    releaseCapture():void
  }
  // 定义util变量的类型，使之在ts文件中能直接被访问而不报ts错误，而不是通过Window.util
  const util: GlobalType.Utils
  const lpk: GlobalType.Lpk
}

// 在template中可以直接访问util
declare module 'vue' {
  interface ComponentCustomProperties {
    util: GlobalType.Utils
    lpk: GlobalType.Lpk
  }
}

// 扩充 vue-router RouteMeta 接口
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    title?: string
    icon?: string
    auth?: Array<number>
    activeMenu?: string
    hidden?: boolean
  }
}

export {}
