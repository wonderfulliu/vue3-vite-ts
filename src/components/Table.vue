<script setup lang="ts">
import _ from 'lodash'
import { TitleItem } from '@/types/table'
import { Filter } from '@element-plus/icons-vue'
import Tooltip from '@/components/Tooltip.vue'
import Title from '@/components/Title.vue'
import TableSearch from '@/components/TableSearch.vue'
import Sortable from 'sortablejs'
import { Operation } from '@element-plus/icons-vue'
import Pagination from '@/components/Pagination.vue'
import useGlobalStore from '@/store/global'
import useTTStore from '@/store/tableTitle'
import { PropType } from 'vue'
const globalStore = useGlobalStore()
const ttStore = useTTStore()

const props = defineProps({
  // 额外配置
  // 表格实例
  tableRef: {
    required: false,
    default: null,
  },
  // 表头文字
  title: {
    default: '',
  },
  // 是否展示配置按钮
  showDrawerIcon: {
    type: Boolean,
    default: true,
  },
  // 是否展示多选
  showCheckbox: {
    type: Boolean,
    default: false,
  },
  // 是否展示序号
  showIndex: {
    default: true,
  },
  // 是否可以拖拽
  dragable: {
    type: Boolean,
    default: true,
  },
  // 表格数据
  data: {
    required: true,
    type: Array,
    default: function () {
      return []
    },
  },
  // 表头数据
  tableTitle: {
    type: Array as PropType<TitleItem[]>,
    default: function () {
      return []
    },
  },
  pagination: {
    type: [Object, Boolean],
    default: function () {
      return {
        layout: 'total, prev, pager, next, sizes',
      }
    },
  },
  // 表格本身配置
  border: {
    required: false,
    default: true,
  },
  header: {
    type: Boolean,
    default: false,
  },
  rowClassName: {},
})

const emit = defineEmits([
  'selection-change',
  'cell-click',
  'show-drawer',
  'handle-search',
])

// 计算属性判断分页和header是否存在
const tableClass = computed(() => {
  const hasHeader = !!props.header
  const hasPagination = !!props.pagination
  if (hasHeader && hasPagination) return 'table-content'
  if (hasHeader) return 'table-content-nopagination'
  if (hasPagination) return 'table-content-noheader'
  return 'table-content-noall'
})

// 分页===
const pageSize = ref(20)
const handleSizeChange = (pSize: number) => {
  pageSize.value = pSize
}
// 页数的变化
const currentPage = ref(1)
const handleCurrentChange = (pageNo: number) => {
  currentPage.value = pageNo
}

// 表格方法
const tableRef = ref()
// 多选
const selectionChange = (selectArr) => {
  emit('selection-change', selectArr)
}
const cellClick = (record) => {
  emit('cell-click', record)
}

// 传入的原始数据
// let originData: Array<any> = []
// watchEffect(() => {
//   if(props.data.length !== originData.length) {
//     originData = _.cloneDeep(props.data)
//   }
// })
// 表格排序触发
let sortObj: any = null
watchEffect(() => {
  let data = props.data
  if(sortObj !== null) {
    sortChange(sortObj)
  }
})
const sortChange = ({ column, prop, order }) => {
  sortObj = { column, prop, order }
  // order: ascending / descending / null
  // prop: 表头字段名称
  const data = props.data
  const fn = (a: any, b: any) => {
    if(order === 'ascending') {
      if(a[prop] < b[prop]) return -1
      if(a[prop] > b[prop]) return 1
      return 0
    }
    if(order === 'descending') {
      if(a[prop] < b[prop]) return 1
      if(a[prop] > b[prop]) return -1
      return 0
    }
    return 0
  }
  if(order) {
    data.sort(fn)
  } else {
    // data.splice(0, 999999999, ...originData)
  }
}
// 向外暴露table组件实例
defineExpose({
  tableRef,
})

// 展示抽屉
const showDrawer = () => {
  emit('show-drawer')
  globalStore.drawer = true
  globalStore.tableTitle = dropTableTitle.value
}

// 拖拽
let dropTableTitle = ref(props.tableTitle)
const initSort = () => {
  const el = document.querySelector('.el-table__header-wrapper thead tr')
  const sortable = new Sortable(el, {
    filter: '.filtered', // 不允许拖拽的标签：包含filtered类的标签
    animation: 180,
    delay: 0,
    onEnd: (evt) => {
      // 获取到隐藏的表头
      const hiddenTableTitle = dropTableTitle.value.filter(
        (item) => item.hidden
      )
      // 将隐藏的表头剔除掉
      const tempTableTitle = dropTableTitle.value.filter((item) => !item.hidden)
      // 不能拖拽的表头：checkbox 与 index
      let n = 0
      if(props.showCheckbox) n++
      if(props.showIndex) n++
      const oldItem = tempTableTitle[evt.oldIndex - n]
      tempTableTitle.splice(evt.oldIndex - n, 1)
      tempTableTitle.splice(evt.newIndex - n, 0, oldItem)
      dropTableTitle.value = []
      nextTick(() => {
        dropTableTitle.value = [...tempTableTitle, ...hiddenTableTitle]
        props.tableTitle.splice(0, 999, ...dropTableTitle.value)
        ttStore.setTableTitle()
      })
    },
  })
}
// 先不考虑拖拽了功能
onMounted(() => {
  props.dragable && initSort()
})

// 点击表头过滤图标
const filterClick = (clickItem: TitleItem) => {
  props.tableTitle.forEach((item) => {
    item.visible && item.prop !== clickItem.prop && (item.visible = false)
  })
  clickItem.visible = !clickItem.visible
}
// 搜索
// 主要作用是将搜索的内容赋值给 tableTitle
const handleSearch = (searchObj: { key: string; value: any }) => {
  const { key, value } = searchObj
  props.tableTitle.forEach((titleItem) => {
    titleItem.prop === key && (titleItem.searchContent = value)
  })
  emit('handle-search')
}

// 组件卸载时，清除tableTitle存储的搜索内容
onUnmounted(() => {
  props.tableTitle.forEach((titleItem) => {
    titleItem.searchContent = ''
    titleItem.visible = false
  })
})
</script>

<template>
  <div class="table-container">
    <div v-if="props.header" class="header-content">
      <Title :title="props.title" />
      <div class="extra">
        <slot name="extra"></slot>
        <el-button
          v-if="showDrawerIcon"
          type="primary"
          plain
          circle
          size="small"
          @click="showDrawer"
        >
          <el-icon><Operation /></el-icon>
        </el-button>
      </div>
    </div>
    <div :class="tableClass">
      <el-table
        ref="tableRef"
        stripe
        table-layout="fixed"
        height="100%"
        empty-text="暂无数据"
        :border="border"
        :data="data.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        size="small"
        style="width: 100%"
        :header-cell-style="{ background: '#EDEDF5', color: '#1F242E' }"
        :row-class-name="rowClassName"
        @selection-change="selectionChange"
        @cell-click="cellClick"
        @sort-change="sortChange"
      >
        <!-- 多选框 -->
        <el-table-column
          v-if="props.showCheckbox"
          type="selection"
          class-name="filtered"
        />
        <!-- 是否展示序号 -->
        <el-table-column
          v-if="showIndex"
          type="index"
          label="序号"
          class-name="filtered"
        />
        <!-- 默认插槽展示的内容 -->
        <slot>
          <template v-for="(item, index) in dropTableTitle" :key="index">
            <el-table-column
              v-if="!item.hidden"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :sortable="item.sort && 'custom'"
            >
              <!-- 表头自定义 -->
              <template #header>
                <span> {{ item.label }} </span>
                <Tooltip
                  v-if="item.filter"
                  v-model:visible="item.visible"
                  :raw-content="true"
                  placement="bottom-start"
                  :show-arrow="false"
                  class="search-tooltip"
                >
                  <el-icon
                    v-if="item.filter"
                    @click.stop="filterClick(item)"
                    :size="14"
                    :style="{ marginLeft: '5px' }"
                    ><Filter />
                  </el-icon>
                  <template #content>
                    <TableSearch
                      :titleItem="item"
                      @handle-search="handleSearch"
                    />
                  </template>
                </Tooltip>
              </template>
              <!-- 表格内容自定义 -->
              <template #default="scope">
                <slot :name="item.prop" :scope="scope">
                  {{ scope.row[item.prop] }}
                </slot>
              </template>
            </el-table-column>
          </template>
        </slot>
        <slot name="action"></slot>
      </el-table>
    </div>
    <div v-if="props.pagination" class="pagination-content">
      <Pagination
        :total="data.length"
        :page-size="pageSize"
        :layout="props.pagination.layout"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-container {
  height: 100%;
  .header-content {
    height: $tableHeaderHeight;
    @include flex($jc: space-between);
    .extra {
      display: flex;
    }
  }
  .table-content {
    height: calc(100% - $paginationHeight - $tableHeaderHeight);
  }
  .table-content-nopagination {
    height: calc(100% - $paginationHeight);
  }
  .table-content-noheader {
    height: calc(100% - $tableHeaderHeight);
  }
  .table-content-noall {
    height: calc(100%);
  }
  .pagination-content {
    height: $paginationHeight;
  }
  .search-tooltip {
    position: relative;
  }
  :deep() .el-table__header > thead > tr > th > .cell {
    cursor: move;
    @include flex;
    .el-icon {
      cursor: pointer;
    }
  }
}
</style>
