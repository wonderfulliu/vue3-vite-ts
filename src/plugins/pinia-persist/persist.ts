import { PiniaPluginContext } from 'pinia'
import { saveInStorage } from './util'
import { watch } from 'vue'

type Path = {
  key: string
  isWatch: boolean
  [propName: string]: any
}
type Storage = 'localStorage' | 'sessionStorage'
interface PersistStrategy {
  storage: Storage
  paths: Array<Path>
}
export interface PersistOptions {
  enabled?: boolean
  strategies?: Array<PersistStrategy>
}
declare type Store = PiniaPluginContext['store']
declare module 'pinia' {
  interface DefineStoreOptionsBase<S, Store> {
    persist?: PersistOptions
  }
}

function PiniaPersist(context: PiniaPluginContext) {
  const { options, store } = context
  if (options.persist?.enabled) {
    // 需要缓存某些字段
    const { strategies } = options.persist
    strategies &&
      strategies.forEach((item) => {
        const { storage, paths } = item
        const watchList: Array<object> = []
        const storeObj: {
          [propName: string]: any
        } = {}
        paths.length &&
          paths.forEach((path) => {
            const { key, isWatch } = path
            isWatch && watchList.push({ [key]: store[key] })
            storeObj[key] = store[key]
          })
        saveInStorage(storage, store.$id, storeObj)
        watch(
          () => watchList,
          (watchList: Array<{}>) => {
            const storeObj = {}
            watchList.forEach((item) => {
              Object.assign(storeObj, item)
            })
            saveInStorage(storage, store.$id, storeObj)
          },
          { deep: true }
        )
      })
  }
}

export default PiniaPersist
