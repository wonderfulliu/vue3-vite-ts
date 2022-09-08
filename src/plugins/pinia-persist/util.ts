import { setLocalStorage, setSessionStorage } from '@/utils/storage'
type Storage = 'localStorage' | 'sessionStorage'

export const saveInStorage = (
  storage: Storage,
  key: string,
  value: string | object
) => {
  if(storage === 'localStorage') {
    setLocalStorage(key, value)
  }
  if(storage === 'sessionStorage') {
    setSessionStorage(key, value)
  }
}
