<script setup lang="ts">
import { LayoutKey } from './type'
type IProps = {
  small?: boolean // 是否使用小型分页
  background?: boolean // 是否为分页按钮添加背景色	
  pageSize?: number // 每页显示条数
  total: number // 数据总条数
  pagerCount?: number // 最大页码按钮数
  layout?: string
  pageSizes?: number[] // 每页显示个数选择器的选项设置
  currentPage?: number // 当前页
  disabled?: boolean // 是否禁用分页	
  hideOnSinglePage?: boolean // 只有一页时是否隐藏
}
const props = withDefaults(defineProps<IProps>(), {
  small: true,
  total: 0,
  layout: (['total', 'prev', 'pager', 'next', 'sizes'] as LayoutKey[]).join(', '),
  pagerCount: 7,
  currentPage: 1,
  pageSize: 20,
  // pageSizes: [10, 20, 30, 40, 50, 100],
  hideOnSinglePage: false
})

const emit = defineEmits(['update:current-page', 'update:page-size'])

const currentPage = computed({
  get() {
    return props.currentPage
  },
  set(val) {
    emit('update:current-page', val)
  }
})
const pageSize = computed({
  get() {
    return props.pageSize
  },
  set(val) {
    emit('update:page-size', val)
  }
})
</script>

<template>
  <div class="pagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      :small="small"
      :disabled="disabled"
      :background="background"
      :layout="layout"
      :total="total"
      :pager-count="pagerCount"
      :hide-on-single-page="hideOnSinglePage"
      />
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  @include flex;
  width: 100%;
  overflow-x: hidden;
}
</style>
