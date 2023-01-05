import * as fileTools from './file'
import * as storageTools from './storage'
import * as timeTools from './time'
import * as tools from './tools'
import { changeLocale } from '@/config/lpk'

const utils = {
  // 文件操作相关
  File: fileTools,
  // 存储操作相关
  Storage: storageTools,
  // 时间操作相关
  Time: timeTools,
  // 其他工具
  Tool: {
    ...tools,
    changeLocale
  },
}
export type IUtils = typeof utils
export default utils
