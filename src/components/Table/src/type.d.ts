
import type { TableColumnCtx, VNode, RendererNode, RendererElement } from 'element-plus'

export interface ITitleItem {
  type?: '' | 'index' | 'selection' | 'expand'
  label?: string
  prop?: string
  width?: number | string
  fixed?: 'left' | 'right'
  resizable?: boolean
  formatter?: <T>(row?: T, column?: TableColumnCtx<T>, cellValue?: any, index?: number) => string | VNode<RendererNode, RendererElement, { [key: string]: any; }>
  align?: 'left' | 'center' | 'right'
  headerAlign?: 'left' | 'center' | 'right'
}
