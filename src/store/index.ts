import { createPinia } from 'pinia'
import PiniaPersist from '@/plugins/pinia-persist/persist'

const pinia = createPinia()
pinia.use(PiniaPersist)

export default pinia

// import { storeToRefs } from 'pinia'
// import { useMainStore } from '@/store/main'
// const mainStore = useMainStore()
// const { num, nums } = storeToRefs(mainStore)
