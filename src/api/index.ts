import http, { baseUrl, prefix } from '@/utils/http'

const urls = {
  // 获取颜色列表
  test: `${baseUrl}${prefix}/test`,
}

// 根据uniTicket获取token与refreshToken
export const Test = (payload: any) => {
  return http({
    method: 'post',
    url: urls.test,
    data: payload
  })
}
