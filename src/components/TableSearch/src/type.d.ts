
import type { TableColumnCtx, VNode, RendererNode, RendererElement } from 'element-plus'

export type TitleItem = {
  label: string // 表头显示内容
  prop: string // 表头字段
  width?: number | string // 表头宽度
  hidden?: boolean // 表头显示隐藏
  sort?: boolean // 是否显示排序 icon
  tableName?: string // 表名
  filter?: boolean // 是否显示过滤 icon
  visible?: boolean // 控制过滤搜索框的显示隐藏
  searchType?: searchType[] // 该表头字段的搜索类型
  radioList?: radioItem[] // 搜索类型为单选类型
  checkBoxList?: checkboxItem[] // 搜索类型为多选类型
  searchContent?: any // 搜索类型为 input 时搜索的内容
  [propName: string]: any
}
