import { isArray } from 'lodash'
import { LOCALE, LOCALE_OPTIONS } from './const'
// 保存语言包的全局变量
type ILpk = Record<string, string | string[]>
let tbLpk: ILpk = {}

// 加载本地语言包内容
export const initLpk = () => {
  const lpkFiles: ILpkFile = import.meta.glob('@/locales/*', {eager: true})
  mergeLpk(lpkFiles)
}

// 判断当前语言环境
export const getLocale = (): string => {
  const defaultLocal = 'zh-CN'
  // 1. 首先从登录用户的信息中获取自定义语言
  // 2. 从本地存储中获取
  const storageLocal = util.Storage.getLocalStorage(LOCALE)
  // 3. 最终使用默认语言包
  let strLocal = storageLocal || defaultLocal
  return strLocal
}

/**
 * 合并语言包
 * 语言模块包含：基础模块 + 业务扩展模块
 * */
type ILpkFile = {
  [path: string]: {
    default: ILpk
  }
}
export const mergeLpk = (importLpkFiles: ILpkFile) => {
  const lpkEnv = getLocale()
  for(let lpkPath in importLpkFiles) {
    if(-1 === lpkPath.indexOf(lpkEnv)) {
      continue
    }
    const { default: lpkItem } = importLpkFiles[lpkPath]
    for(let lpkKey in lpkItem) {
      tbLpk[lpkKey] = lpkItem[lpkKey]
    }
  }
}

// 在 UI 中的{{}}中使用语言文件
export type Ilpk = typeof lpk
export const lpk = (key: string, option?: { index?: number, default?: string }): string => {
  const mixValue = tbLpk[key]
  if(isArray(mixValue)) {
    if(!mixValue.length) {
      return option?.default || key
    }
    return mixValue[option?.index || 0] || key
  }
  return mixValue || option?.default || key
}

// 切换语言
type ILocaleStr = 'en-US' | 'zh-CN'
export const changeLocale = (localeStr: ILocaleStr)  => {
  // 未找到可用的语言包，则不改变当前语言环境
  if(!LOCALE_OPTIONS.find(locale => locale === localeStr)) {
    return
  }
  // 1. 如果用户已经登录，需要调用 api 更新用户自定义语言环境信息
  // 2. 在本地缓存最新的语言包
  util.Storage.setLocalStorage(LOCALE, localeStr)
  // 3. UI 组件语言包切换
  // 4. 重新加载页面
  window.location.reload()
}
