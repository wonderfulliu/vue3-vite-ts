<script setup lang="ts">
const props = defineProps({
  modelValue: {
    required: true,
  },
  itemOptions: {
    type: Object,
    required: false,
    default: function () {
      return {}
    },
  },
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <el-input
    v-if="itemOptions.type === 'input'"
    v-model="modelValue"
    @input="emit('update:modelValue', $event)"
  ></el-input>

  <el-date-picker
    v-if="itemOptions.type === 'time'"
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
    v-if="itemOptions.type === 'select'"
    v-model="modelValue"
    @change="emit('update:modelValue', $event)"
    clearable
  >
    <el-option
      v-for="item in itemOptions.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<style lang="scss" scoped></style>
