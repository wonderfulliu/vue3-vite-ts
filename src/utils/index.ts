import * as fileTools from './file'
import * as storageTools from './storage'
import * as timeTools from './time'
import * as tools from './tools'

const utils = {
  ...fileTools,
  ...storageTools,
  ...timeTools,
  ...tools,
}
export type IUtils = typeof utils
export default utils
