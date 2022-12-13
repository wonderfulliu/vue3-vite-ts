import jwt_decode, { JwtDecodeOptions } from 'jwt-decode'

// 防抖
export const debounce = (func: () => void, time = 500): void => {
  let timeId = window.timeId || null
  if (timeId) {
    clearTimeout(timeId)
  }
  window.timeId = setTimeout(() => {
    func()
  }, time)
}

// 小数加%，保留两位小数
export const toPer = (num: number): string => {
  if (!num) return 0 + '%'
  return (num * 100).toFixed(2) + '%'
}

// 范围随机数
export const genRandom = (minNum = 10, maxNum = 100): number => {
  const strNum: string = Math.random() * (maxNum - minNum + 1) + minNum + ''
  return parseInt(strNum, 10)
}

// jwt token 解析
export const jwtDecode = (token: string, options?: JwtDecodeOptions | undefined): {} => {
  return jwt_decode(token, options);
}
