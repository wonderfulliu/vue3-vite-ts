<script setup lang="ts">
import Sortable from 'sortablejs';
import { ITitleItem } from './type'
import { VNodeRef } from "vue";
import { Operation } from '@element-plus/icons-vue'

interface IProps {
  // table
  data: any[] | undefined
  stripe?: boolean
  border?: boolean
  size?: 'large' | 'default' | 'small'
  fit?: boolean
  showHeader?: boolean
  // 自定义
  tableTitle?: ITitleItem[]
  showIndex?: boolean
  showCheckbox?: boolean
  showAction?: boolean
  actionFixed?: "left" | 'right'
  actionWidth?: number | string
  drag?: boolean
  title?: boolean
  titleText?: any,
  pagination?: boolean
  total?: number
}
const props = withDefaults(defineProps<IProps>(), {
  // table
  data: undefined,
  stripe: true,
  border: true,
  size: 'small',
  fit: true,
  showHeader: true,
  // 自定义
  showIndex: true,
  showCheckbox: true,
  showAction: true,
  actionFixed: 'right',
  actionWidth: '150px',
  drag: true,
  title: true,
  titleText: 'TableTitle',
  pagination: true,
  total: 0
})

interface IEmits {
  (event: 'pageChange', page: number): void
  (event: 'sizeChange', size: number): void
  (event: 'selectionChange', size: number): void
}

const emit = defineEmits<IEmits>()

/**
 * table 方法 
 */ 

/** 
 * 分页
 */ 
const currentPage = ref(1) // 当前页
const pageSize = ref(20) // 每页显示数量
const pageData = computed(() => {
  return props.data.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value)
})
watch(currentPage, (page) => {
  emit('pageChange', page)
})
watch(pageSize, (size) => {
  emit('sizeChange', size)
})

/** 
 * 列拖拽
 */ 
let tableUpdate = ref(true)
const title = [...props.tableTitle!] as ITitleItem[]
const columnDrop = function () {
  const wrapperTr = document.querySelector('.el-table__header-wrapper tr') as HTMLElement;
  new Sortable(wrapperTr, {
    group: "title",
    animation: 300,
    delay: 0,
    handle: '.drag-icon',
    filter: '.ignore-drag',
    onEnd: evt => {
      let n = 0
      if (props.showIndex) n++
      if (props.showCheckbox) n++
      let titleLength: [number, number] = [0, 99]
      const oldIndex = evt.oldIndex as number - n
      const newIndex = evt.newIndex as number - n
      const oldItem = title[oldIndex];
      title.splice(oldIndex, 1);
      title.splice(newIndex, 0, oldItem);
      tableUpdate.value = false
      props.tableTitle?.splice(...titleLength, ...title)
      tableUpdate.value = true
    }
  });
}

/** 
 * table 实例
 */ 
const tableRef = ref<VNodeRef>()
// 向外暴露table组件实例
defineExpose({
  tableRef,
})

onMounted(() => {
  // 列拖拽
  columnDrop()
})
</script>

<template>
  <div class="table-container">
    <div v-if="props.title" class="title-content">
      <Title :title="props.titleText" />
      <div class="extra">
        <slot name="extra"></slot>
        <!-- <el-button type="primary" plain circle>
          <Icon>
            <Operation />
          </Icon>
        </el-button> -->
      </div>
    </div>
    <div
      :class="[props.title ? (props.pagination ? 'table-content' : 'table-content-nopagination') : (props.pagination ? 'table-content-notitle' : 'table-content-noall')]">
      <el-table ref="tableRef" v-show="tableUpdate" :data="pageData" :stripe="stripe" :border="border" :size="size"
        :fit="fit" :show-header="showHeader" height="100%" style="width: 100%" :header-cell-style="{ color: '#1F242E' }">
        <!-- 是否展示序号 -->
        <el-table-column v-if="showIndex" type="index" label="#" class-name="ignore-drag" />
        <!-- 多选框 -->
        <el-table-column v-if="showCheckbox" type="selection" class-name="ignore-drag" />
        <!-- table 表格内容 -->
        <slot>
          <template v-for="titleItem in tableTitle">
            <el-table-column :type="titleItem.type" :label="titleItem.label" :prop="titleItem.prop"
              :width="titleItem.width" :resizable="titleItem.resizable" :formatter="titleItem.formatter"
              :align="titleItem.align" :header-align="titleItem.headerAlign">
              <!-- 自定义表头 -->
              <template #header>
                <Icon v-if="drag" icon="拖拽" font-size="12" class="drag-icon" />
                <span> {{ titleItem.label }} </span>
              </template>
              <!-- 自定义单元格内的内容 -->
              <template #default="scope">
                <slot :name="titleItem.prop" :scope="scope">
                  {{ scope.row[titleItem.prop!] }}
                </slot>
              </template>
            </el-table-column>
          </template>
        </slot>
        <!-- 操作 -->
        <!-- <slot name="action"></slot> -->
        <el-table-column v-if="showAction" label="操作" :fixed="actionFixed" :width="actionWidth"
          class-name="ignore-drag">
          <template #default="scope">
            <slot name="action" :scope="scope"></slot>
          </template>
        </el-table-column>
        <!-- 当数据为空时自定义的内容 -->
        <template #empty>
          <slot name="empty"></slot>
        </template>
        <!-- 插入至表格最后一行之后的内容 -->
        <template #append>
          <slot name="append"></slot>
        </template>
      </el-table>
    </div>
    <div v-if="props.pagination" class="pagination-content">
      <slot name="pagination">
        <Pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total || data?.length" />
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$titleHeight: 70px; // header 高度
$paginationHeight: 80px; // 分页高度

.table-container {
  height: 100%;

  .drag-icon {
    cursor: move;
  }

  .title-content {
    height: $titleHeight;
    padding: 0 16px;
    @include flex($jc: space-between);

    .extra {
      display: flex;
    }
  }

  .pagination-content {
    height: $paginationHeight;
    padding: 0 16px;
    @include flex();
  }

  .table-content {
    height: calc(100% - $paginationHeight - $titleHeight);
  }

  .table-content-nopagination {
    height: calc(100% - $titleHeight);
  }

  .table-content-notitle {
    height: calc(100% - $paginationHeight);
  }

  .table-content-noall {
    height: calc(100%);
  }
}
</style>
