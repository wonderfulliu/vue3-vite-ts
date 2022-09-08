<script setup lang="ts">
type Props = {
  small: boolean // 是否使用小型分页
  total: number
}
const props = defineProps({
  total: {
    default: 0,
  },
  small: {
    default: true,
  },
  layout: {
    default: 'total, prev, pager, next, sizes',
  },
  // 最大页码按钮数
  pagerCount: {
    default: 7,
  },
  // 当前页
  currentPage: {
    default: 1,
  },
  // 每页显示条数
  pageSize: {
    default: 20,
  },
  // 每页显示个数选择器的选项设置
  pageSizes: {
    default: [10, 20, 30, 50],
  },
  // 只有一页时是否隐藏
  hideOnSinglePage: {
    default: false,
  },
})
const emit = defineEmits(['size-change', 'current-change'])
</script>

<template>
  <div class="pagination">
    <el-pagination
      :small="small"
      :total="total"
      :layout="layout"
      :pager-count="pagerCount"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :hide-on-single-page="hideOnSinglePage"
      @size-change="(size: number) => emit('size-change', size)"
      @current-change="(pageNo: number) => emit('current-change', pageNo)"
    />
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  @include flex;
  height: $paginationHeight;
  width: 100%;
  overflow-x: hidden;
}
</style>
