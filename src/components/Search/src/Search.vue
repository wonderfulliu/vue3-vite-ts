<script setup lang="ts">
import { FormInstance } from 'element-plus'
import { Ioption } from './type'
import SearchItem from './SearchItem.vue'

type Props = {
  formOptions: Ioption[]
}
const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['onSubmit', 'resetForm'])

const formRef = ref<FormInstance>()

const model = reactive<{ [K: string]: any }>({})

const onSubmit = () => {
  console.log(model)
  emit('onSubmit', model)
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  emit('resetForm', model)
}
</script>

<template>
  <el-form :model="model" ref="formRef" :inline="true" size="small">
    <el-form-item
      v-for="(item, index) in formOptions"
      :key="index"
      :prop="item.prop"
      :label="item.label"
    >
      <SearchItem v-model="model[item.prop]" :option="item" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="resetForm(formRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>
