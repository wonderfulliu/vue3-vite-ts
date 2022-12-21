<script setup lang="ts">
import draggable from "vuedraggable";
import Sortable from 'sortablejs';
import { ITitleItem } from './type'

interface IProps {
  // table
  data?: any[] | undefined
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
}
const props = withDefaults(defineProps<IProps>(), {
  // table
  data: undefined,
  stripe: true,
  border: false,
  size: 'small',
  fit: true,
  showHeader: true,
  // 自定义
  showIndex: true,
  showCheckbox: true,
  showAction: true,
  actionFixed: 'right',
  actionWidth: '150px',
  drag: true
})

// 列拖拽
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
onMounted(() => {
  columnDrop()
})
</script>

<template>
  <el-table v-show="tableUpdate" :data="data" :stripe="stripe" :border="border" :size="size" :fit="fit"
    :show-header="showHeader" height="100%" style="width: 100%">
    <!-- 是否展示序号 -->
    <el-table-column v-if="showIndex" type="index" label="#" class-name="ignore-drag" />
    <!-- 多选框 -->
    <el-table-column v-if="showCheckbox" type="selection" class-name="ignore-drag" />
    <!-- table 表格内容 -->
    <slot>
      <template v-for="titleItem in tableTitle">
        <el-table-column :type="titleItem.type" :label="titleItem.label" :prop="titleItem.prop" :width="titleItem.width"
          :resizable="titleItem.resizable" :formatter="titleItem.formatter" :align="titleItem.align"
          :header-align="titleItem.headerAlign">
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
    <el-table-column v-if="showAction" label="操作" :fixed="actionFixed" :width="actionWidth" class-name="ignore-drag">
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
</template>

<style lang="scss" scoped>
.drag-icon {
  cursor: move;
}
</style>
