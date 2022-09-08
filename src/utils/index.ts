import jwt_decode from 'jwt-decode'

// 防抖
export const debounce = (func: () => void, time = 500) => {
  let timeId = window.timeId || null
  if (timeId) {
    clearTimeout(timeId)
  }
  window.timeId = setTimeout(() => {
    func()
  }, time)
}

// 数据导出为excel
export const dataToExcel = (
  data: { [propName: string]: any }[],
  title: string
) => {
  // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
  let str = `${title}\n`
  // 增加\t为了不让表格显示科学计数法或者其他格式
  for (let i = 0; i < data.length; i++) {
    for (const key in data[i]) {
      str += `${data[i][key] + '\t'},`
    }
    str += '\n'
  }
  // encodeURIComponent解决中文乱码
  const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
  // 通过创建a标签实现
  const link = document.createElement('a')
  link.href = uri
  // 对下载的文件命名
  link.download = '排产数据.csv'
  link.click()
}

// 导出数据为json
export const dataToJson = (data: any, filename = 'data') => {
  if (!data) {
    alert('保存的数据为空')
    return
  }
  if (typeof data === 'object') {
    data = JSON.stringify(data, undefined, 4)
  }
  let blob = new Blob([data], { type: 'text/json' }),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a')
  a.download = `${filename}.json`
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
  e.initMouseEvent(
    'click',
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  )
  a.dispatchEvent(e)
}

// 小数加%，保留两位小数
export const toPer = (num: number) => {
  if (!num) return 0 + '%'
  return (num * 100).toFixed(2) + '%'
}

// 范围随机数
export const genRandom = (minNum = 10, maxNum = 100) => {
  const strNum: string = Math.random() * (maxNum - minNum + 1) + minNum + ''
  return parseInt(strNum, 10)
}

// jwt token 解析
export const jwtDecode = (token: string): {} => {
  return jwt_decode(token);
}
