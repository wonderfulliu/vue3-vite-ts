<script setup lang="ts">
type Props = {
  percentage: number
  dom: string
}
const props = withDefaults(defineProps<Props>(), {
  percentage: 0,
  dom: 'body',
})

let innerLimit = ref(false)
watchEffect(() => {
  const p = props.percentage
  innerLimit.value = p >= 100 || p <= 0 ? false : true
})
</script>

<template>
  <teleport :to="dom">
    <div v-if="innerLimit" class="container">
      <div class="content">
        <el-progress
          :stroke-width="3"
          :show-text="false"
          :percentage="percentage"
        />
      </div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  .content {
    .el-progress--line {
      width: calc(100%);
      color: #fff;
    }
  }
}
</style>
