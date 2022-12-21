<script setup lang="ts">
type placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

type trigger = 'hover' | 'click' | 'focus' | 'contextmenu'

type IProps = {
  effect?: 'dark' | 'light'
  content?: string
  rawContent?: boolean
  placement?: placement
  visible?: boolean | null
  disabled?: boolean
  offset?: number
  transition?: string
  showAfter?: number
  showArrow?: boolean
  hideAfter?: number
  autoClose?: number
  manual?: boolean
  popperClass?: string
  enterable?: boolean
  trigger?: trigger
}

const props = withDefaults(defineProps<IProps>(), {
  // el-tooltip 属性
  effect: 'light',
  content: 'Tooltip内容',
  rawContent: false,
  placement: 'top-start',
  visible: null,
  disabled: false,
  offset: 12,
  transition: 'el-fade-in-linear',
  showAfter: 0,
  showArrow: true,
  hideAfter: 0,
  autoClose: 0,
  manual: false,
  popperClass: '',
  enterable: false,
  trigger: 'hover',
})
</script>

<template>
  <el-tooltip :effect="effect" :raw-content="rawContent" :placement="placement" :visible="visible" :disabled="disabled"
    :offset="offset" :transition="transition" :show-after="showAfter" :show-arrow="showArrow" :hide-after="hideAfter"
    :auto-close="autoClose" :manual="manual" :popper-class="popperClass" :enterable="enterable" :trigger="trigger">
    <slot></slot>
    <template #content>
      <slot name="content">{{ content }}</slot>
    </template>
  </el-tooltip>
</template>

<style lang="scss" scoped>

</style>
