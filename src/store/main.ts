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
