<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  size: {
    type: [Number, String],
    default: '30%'
  }
})

const emit = defineEmits(['open', 'opened', 'close', 'closed'])

const handleOpen = () => {
  emit('open')
}
const handleOpened = () => {
  emit('opened')
}
const handleClose = () => {
  emit('close')
}
const handleClosed = () => {
  emit('closed')
}
</script>

<template>
  <el-drawer
    v-model="visible"
    :destroy-on-close="true"
    :size="size"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleClose"
    @closed="handleClosed"
  >
    <template #header>
      <slot name="title">
        <div class="title">{{ title }}</div>
      </slot>
    </template>
    <template #default>
      <slot></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
.title {
  font-size: 24px;
  font-weight: 500;
  color: black;
}
</style>
