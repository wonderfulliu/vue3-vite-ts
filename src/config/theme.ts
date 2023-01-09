/* 初始化 css 主题 */
import { THEME, THEME_OPTIONS } from '../constant/const'

// 默认主题
const DefaultTheme: string = THEME_OPTIONS[0]
// 当前使用主题
let curTheme: ITheme = '' as ITheme

// 初始化系统主题
export const initTheme = () => {
  curTheme = getTheme()
  setTheme(curTheme)
}

// 切换主题
type ITheme = 'blue' | 'cyan'
export const changeTheme = (themeStr: ITheme) => {
  // 未找到可用的主题，则不改变当前主题样式
  if (!THEME_OPTIONS.find((theme) => theme === themeStr)) {
    return
  }
  curTheme = themeStr
  // 1. 如果用户已经登录，需要调用 api 更新用户自定义主题
  // 2. 设置主题
  setTheme(curTheme)
}

// 设置主题
export const setTheme = (themeStr: ITheme) => {
  // 1. 在本地缓存最新的主题
  util.Storage.setLocalStorage(THEME, themeStr)
  // 2. UI 组件主题切换
  // 3. 设置主题样式
  document.documentElement.setAttribute('data-theme', curTheme)
}

// 获取当前正在使用的主题
export const getTheme = () => {
  if (curTheme) {
    return curTheme
  }
  // 首先从登录用户的自定义信息中获取
  curTheme = '' as ITheme
  // 其次从本地存储中获取
  curTheme = curTheme || util.Storage.getLocalStorage(THEME)
  // 最后使用默认主题
  curTheme = curTheme || DefaultTheme
  return curTheme
}
