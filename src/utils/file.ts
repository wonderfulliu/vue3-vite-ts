/**
 *  各种文件的相关操作
*/ 
import * as XLSX from 'xlsx'

/**
 * excel 转 json
 * @param rawFile Blob
 */
export const excelToJson = (rawFile: Blob) => {
  return new Promise((resolve) => {
    let reader = new FileReader()
    reader.readAsBinaryString(rawFile)
    reader.onload = (ev) => {
      let workBook = XLSX.read(ev.target!.result, { type: 'binary', cellDates: true })
      let workSheet = workBook.Sheets[workBook.SheetNames[0]]
      const data = XLSX.utils.sheet_to_json(workSheet)
      resolve(data)
    }
  })
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

// 数据导出为json
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
