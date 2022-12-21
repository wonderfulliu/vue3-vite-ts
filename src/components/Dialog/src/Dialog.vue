<script setup lang="ts">
type Props = {
  modelValue?: boolean
  visible?: boolean
  title?: string
  width?: number
  top?: string
  modal?: boolean
  appendToBody?: boolean
  lockScroll?: boolean
  customClass?: string
  showClose?: boolean
  showCancelButton?: boolean
  showSureButton?: boolean
  loading?: boolean
  beforeClose?: (done: Function) => void
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  width: 600,
  top: '15vh',
  modal: false,
  showClose: true,
  showCancelButton: true,
  showSureButton: true,
  beforeClose: function (done: Function) {
    done()
  },
})

const emit = defineEmits([
  'update:modelValue',
  'open',
  'opened',
  'close',
  'closed',
  'submit',
  'cancel',
])

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
  emit('submit')
}
const cancel = () => {
  emit('cancel')
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
  <el-dialog v-model="modelValue" :title="title" :width="width" :fullscreen="false" :top="top" :modal="modal"
    :append-to-body="appendToBody" :lock-scroll="lockScroll" :custom-class="customClass" :open-delay="0"
    :close-delay="0" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="showClose"
    :before-close="beforeClose" :draggable="true" :center="false" :destroy-on-close="true" @open="open" @opened="opened"
    @close="close" @closed="closed">
    <slot></slot>
    <template #header>
      <slot name="title"></slot>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <slot name="extra"></slot>
        <slot name="footer">
          <el-button v-if="showCancelButton" type="default" @click="cancel" size="small">
            取消
          </el-button>
          <el-button v-if="showSureButton" type="primary" @click="submit" size="small" :loading="loading">
            确定
          </el-button>
        </slot>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>

</style>
