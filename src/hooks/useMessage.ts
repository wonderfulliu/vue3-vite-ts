import { ElMessage } from 'element-plus'
type MessageType = "success" | "info" | "warning" | "error"

export default (type: MessageType = 'success', message = '提示信息', duration = 3000) => {
  ElMessage({
    type,
    message,
    duration,
  })
}
