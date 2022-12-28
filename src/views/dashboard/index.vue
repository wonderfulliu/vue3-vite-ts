<script setup lang="ts">
import { ITitleItem } from '@/components/Table'
const visible = ref(false)
const handleClick = () => {
  visible.value = true
}
watch(() => visible.value, (val) => {
  console.log(val)
})
const tableTitle: ITitleItem[] = [
  {
    label: '日期',
    prop: 'date',
  },
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '地址',
    prop: 'address',
    formatter: (row, column, cellValue, index) => {
      console.log(1, row)
      console.log(2, column)
      console.log(3, cellValue)
      console.log(4, index)
      return 12
    }
  },
]
const data: any[] = [
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '1',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '2',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '3',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '4',
    name: 'ly',
    address: 'xxx'
  },
  {
    date: '5',
    name: 'ly',
    address: 'xxx'
  },
]
const handleClick1 = (scope: any) => {
  console.log(scope)
}
const pageChange = (page: number) => {
  console.log(page)
}
const sizeChange = (size: number) => {
  console.log(size)
}
const src = ref()
const file = ref<HTMLInputElement>()
const handlePreivew = () => {
  src.value = file.value?.files![0]
}
</script>

<template>
  <input type="file" @change="handlePreivew" ref="file" />
  <DisplayDocx :src="src" />
  <!-- <Table :table-title="tableTitle" :data="data" @page-change="pageChange" @size-change="sizeChange">
    <template #action="{ scope }">
      <el-button type="primary" size="small" @click="handleClick1(scope)">
        添加
      </el-button>
      <el-button type="default" size="small">
        取消
      </el-button>
    </template>
  </Table> -->
</template>

<style lang="scss" scoped>

</style>
