/*
  模块状态管理
*/ 
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      num: <number>1
    }
  },
  getters: {
    /*
      接收参数 state，则 getters 的返回值类型自动推导
      若使用 this，则需要手动标记返回值的类型
    */
    nums(): number {
      return (this.num + 1)
    }
  },
  actions: {
    changeNum(): void {
      this.num += 1
    }
  },
})
