import { createPinia } from 'pinia'
import PiniaPersist from '@/plugins/pinia-persist/persist'

const pinia = createPinia()
pinia.use(PiniaPersist)

export default pinia

// import { storeToRefs } from 'pinia'
// import { useMainStore } from '@/store/main'
// const mainStore = useMainStore()
// const { num, nums } = storeToRefs(mainStore)

// 数据持久化配置
// persist: {
//   enabled: true,
//   strategies: [
//     {
//       storage: 'localStorage',
//       paths: [
//         { key: 'tableTitle', isWatch: true },
//       ],
//     },
//   ],
// },
