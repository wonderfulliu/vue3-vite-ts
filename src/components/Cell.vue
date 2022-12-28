<script setup lang="ts">
import { Edit as BianJi } from '@element-plus/icons-vue'

const props = defineProps(['text'])
const emit = defineEmits(['getDataFromCell'])

let isEdit = ref(false)
let value = ref('')

// 把更改的数据传出去
const sendValue = (val: any) => {
  emit('getDataFromCell', val)
}

const handleEdit = () => {
  isEdit.value = !isEdit.value
  value.value = props.text
}

const handleSave = () => {
  isEdit.value = !isEdit.value
  sendValue(value)
}

</script>

<template>
  <div class="edit-container">
    <div v-if="isEdit" class="edit">
      <el-input v-model="value" />
      <BianJi class="icon-import" @click="handleSave" style="width: 1em; height: 1em;" />
    </div>
    <div v-else class="show">
      {{ text || '' }}
      <BianJi class="icon-import" @click="handleEdit" style="width: 1em; height: 1em;" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .edit-container {
    .icon-import {
      cursor: pointer;
    }
    .edit {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .show {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
