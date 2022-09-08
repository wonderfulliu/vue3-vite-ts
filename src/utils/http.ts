import axios from 'axios'
import useMessage from '@/hooks/useMessage'
import { useGlobalStore } from '@/store/global'

const { VITE_API_BASE_URL, VITE_API_PREFIX } = import.meta.env

const instance = axios.create({
  // baseURL: VITE_API_BASE_URL,
  timeout: 80 * 1000,
  headers: {},
})

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // config.headers
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // console.log(response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return Promise.resolve(response)
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export const baseUrl = VITE_API_BASE_URL
export const prefix = VITE_API_PREFIX
export default instance
