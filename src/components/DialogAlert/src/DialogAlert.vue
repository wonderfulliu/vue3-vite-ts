<script setup lang="ts">
type Props = {
  modelValue?: boolean
  showCancelButton?: boolean
  showSureButton?: boolean
  loading?: boolean
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: '闹钟',
  showCancelButton: false,
  showSureButton: true,
})

const emit = defineEmits(['open', 'opened', 'close', 'closed', 'submit', 'cancel', 'update:modelValue'])

const open = () => {
  emit('open')
}
const opened = () => {
  emit('opened')
}
const close = () => {
  emit('update:modelValue', false)
  emit('close')
}
const closed = () => {
  emit('closed')
}
const submit = () => {
  emit('update:modelValue', false)
  emit('submit')
}
const cancel = () => {
  emit('update:modelValue', false)
  emit('cancel')
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
  <Dialog title="确认提示" :width="400" v-model="modelValue" :loading="loading" :show-cancel-button="showCancelButton"
    :show-sure-button="showSureButton" @open="open" @opened="opened" @close="close" @closed="closed" @cancel="cancel"
    @submit="submit">
    <div class="container">
      <div class="content">
        <div class="svg-container">
          <Icon :icon="icon" width="24" height="24" />
          <!-- svg解决方案 -->
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
    font-size: 26px;
    font-weight: 600;
    color: #1f242e;
    margin-bottom: 30px;
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
