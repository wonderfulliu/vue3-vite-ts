<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { PropType } from 'vue'
import { TitleItem } from '@/types/table'
import { FormInstance } from 'element-plus'
const props = defineProps({
  titleItem: {
    type: Object as PropType<TitleItem>,
    required: true,
  },
})
const emit = defineEmits(['handleSearch'])

const formRef = ref<FormInstance>()
const model = reactive({})

// 打开搜索框时，回显已经搜索的数据
onMounted(() => {
  model[props.titleItem.prop] = props.titleItem.searchContent
})

// 以下主要作用是抛出搜索的key和data
// 搜索
const onSubmit = (searchKey: string) => {
  emit('handleSearch', {
    key: searchKey,
    value: model[searchKey],
  })
  props.titleItem.visible = !props.titleItem.visible
}
// 重置
const resetForm = (formEl: FormInstance | undefined, searchKey: string) => {
  if (!formEl) return
  formEl.resetFields()
  emit('handleSearch', {
    key: searchKey,
    value: model[searchKey],
  })
}
</script>

<template>
  <div class="search-container">
    <el-form :model="model" ref="formRef" size="small">
      <!-- input -->
      <el-form-item
        v-if="titleItem.searchType?.includes('input')"
        :prop="titleItem.prop"
      >
        <el-input v-model="model[titleItem.prop]" />
      </el-form-item>
      <!-- radio -->
      <el-form-item
        v-if="titleItem.searchType?.includes('radio')"
        :prop="titleItem.prop"
      >
        <el-radio-group v-model="model[titleItem.prop]">
          <el-radio v-for="item in titleItem.radioList" :label="item.value">{{
            item.label
          }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- checkbox---尚未完成 -->
      <el-form-item
        v-if="titleItem.searchType?.includes('checkbox')"
        :prop="titleItem.prop"
      >
        <el-checkbox-group v-model="model[titleItem.prop]">
          <el-checkbox
            v-for="item in titleItem.checkboxList"
            :label="item.label"
            :name="titleItem.prop"
          />
        </el-checkbox-group>
      </el-form-item>
      <!-- time -->
      <el-form-item
        v-if="titleItem.searchType?.includes('time')"
        :prop="titleItem.prop"
      >
        <el-date-picker
          v-model="model[titleItem.prop]"
          type="datetimerange"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
      </el-form-item>
      <el-form-item>
        <div class="btn-content">
          <el-button @click="resetForm(formRef, titleItem.prop)">
            重置
          </el-button>
          <el-button type="primary" @click="onSubmit(titleItem.prop)">
            查询
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.search-container {
  height: 100%;
  .el-form-item:last-child {
    margin-bottom: 0;
    .btn-content {
      width: 100%;
      @include flex($jc: flex-end);
    }
  }
  .el-radio-group {
    @include flex($d: column, $ai: flex-start);
  }
}
</style>
