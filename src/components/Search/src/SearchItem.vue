<script setup lang="ts">
import { Ioption } from './type'
type Props = {
  modelValue: any
  option: Ioption
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['update:modelValue'])

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})
</script>

<template>
  <el-input
    v-if="option.type === 'input'"
    v-model="modelValue"
    @input="emit('update:modelValue', $event)"
  ></el-input>

  <el-date-picker
    v-if="option.type === 'time'"
    v-model="modelValue"
    @change="emit('update:modelValue', $event)"
    type="datetimerange"
    format="YYYY-MM-DD HH:mm:ss"
    value-format="YYYY-MM-DD HH:mm:ss"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    clearable
  />

  <el-select
    v-if="option.type === 'select'"
    v-model="modelValue"
    @change="emit('update:modelValue', $event)"
    clearable
  >
    <el-option
      v-for="item in option.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<style lang="scss" scoped></style>
