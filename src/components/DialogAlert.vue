<script setup lang="ts">
import Dialog from '@/components/Dialog.vue'
// import SvgIcon from '@/components/SvgIcon.vue'

type Props = {
  modelValue?: boolean
  loading?: boolean
  svg?: string
}

const props = withDefaults(defineProps<Props>(), {
  svg: 'warning'
})

const emit = defineEmits(['open', 'opened', 'close', 'closed', 'submit', 'cancel', 'update:modelValue'])

const open = () => {
  emit('open')
}
const opened = () => {
  emit('opened')
}
const close = () => {
  emit('close')
}
const closed = () => {
  emit('update:modelValue', false)
  emit('closed')
}
const submit = () => {
  emit('submit')
}
const cancel = () => {
  emit('closed')
  emit('update:modelValue', false)
}

const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
</script>

<template>
  <Dialog
    title="确认提示"
    :width="400"
    v-model="modelValue"
    :loading="loading"
    @open="open"
    @opened="opened"
    @close="close"
    @closed="closed"
    @cancel="cancel"
    @submit="submit"
  >
    <div class="container">
      <div class="content">
        <div class="svg-container">
          <!-- <SvgIcon :name="svg" width="24" height="24" /> -->
          svg解决方案
        </div>
        <slot name="content">content</slot>
      </div>
      <div class="desc">
        <slot name="description">description</slot>
      </div>
    </div>
  </Dialog>
</template>

<style lang="scss" scoped>
.container {
  width: 80%;
  margin-bottom: 50px;
  .content {
    font-size: 18px;
    font-weight: 500;
    color: #1f242e;
    margin-bottom: 29px;
    @include flex;
    .svg-container {
      margin-right: 10px;
    }
  }
  .desc {
    padding-left: 40px;
    font-size: 14px;
    line-height: 24px;
    font-weight: 400;
    color: #525866;
  }
}
</style>
