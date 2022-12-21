<script setup lang="ts">
type Props = {
  percentage?: number
  type?: 'line' | 'circle' | 'dashboard'
  dom?: string
  strokeWidth?: number
}
const props = withDefaults(defineProps<Props>(), {
  percentage: 0,
  dom: 'body',
  strokeWidth: 3
})

let show = ref(false)
watchEffect(() => {
  const p = props.percentage
  show.value = p >= 100 || p <= 0 ? false : true
})
</script>

<template>
  <teleport v-if="show" :to="dom">
    <div class="container">
      <el-progress :percentage="percentage" :type="type" :stroke-width="strokeWidth" :show-text="false" />
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  .el-progress--line {
    width: calc(100%);
    color: #fff;
  }
}
</style>
