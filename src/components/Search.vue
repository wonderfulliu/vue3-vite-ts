<script setup lang="ts">
import { ref, reactive } from 'vue'
import { FormInstance } from 'element-plus'
import SearchItem from './SearchItem.vue'

const props = defineProps({
  formOptions: {
    type: Array,
    required: true,
    default() {
      return []
    },
  },
})

const emit = defineEmits(['onSubmit', 'resetForm'])

const formRef = ref<FormInstance>()

const model = reactive({})

const onSubmit = () => {
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
      <SearchItem v-model="model[item.prop]" :itemOptions="item" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="resetForm(formRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>
