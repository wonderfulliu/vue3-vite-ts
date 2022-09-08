import Cookies from 'js-cookie'

const _string = (value: any) => {
  if (value instanceof Object) {
    return JSON.stringify(value)
  }
  return value
}

export const setCookie = (
  name: string,
  value: any,
  options?: Cookies.CookieAttributes
): void => {
  const val = _string(value)
  Cookies.set(name, val, options)
}

export const getCookie = <T>(name: string): T | string | undefined => {
  const jsonStr = Cookies.get(name)
  try {
    const obj = JSON.parse(jsonStr as string)
    return obj
  } catch (error) {
    return jsonStr
  }
}

export const removeCookie = (
  name: string,
  options?: Cookies.CookieAttributes
): void => {
  Cookies.remove(name, options)
}

export const setLocalStorage = (key: string, value: string | object) => {
  window.localStorage.setItem(key, _string(value))
}
export const getLocalStorage = (key: string) => {
  const res = window.localStorage.getItem(key)
  if (res === null) return res
  try {
    return JSON.parse(res)
  } catch (error) {
    return res
  }
}
export const removeLocalStorage = (key: string) => {
  window.localStorage.removeItem(key)
}

export const getSessionStorage = (key: string) => {
  const res = window.sessionStorage.getItem(key)
  if (res === null) return res
  try {
    return JSON.parse(res)
  } catch (error) {
    return res
  }
}
export const setSessionStorage = (key: string, value: string | object) => {
  window.sessionStorage.setItem(key, _string(value))
}
export const removeSessionStorage = (key: string) => {
  window.sessionStorage.removeItem(key)
}
