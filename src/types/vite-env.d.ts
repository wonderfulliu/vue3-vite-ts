/**
 * 该文件仅存放全局类型的声明
 * 文件中不会出现 import、export 关键字
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  timeId: NodeJS.Timeout
}
