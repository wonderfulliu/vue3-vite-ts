<script setup lang="ts">
type IProps = {
  title?: string | number
  fontSize?: number
  fontWeight?: number
}
const props = withDefaults(defineProps<IProps>(), {
  title: 'Title',
  fontSize: 18,
  fontWeight: 600,
})
</script>

<template>
  <div class="title" :class="[`font-size-${fontSize}`, `font-weight-${fontWeight}`]">
    <slot>{{ title }}</slot>
  </div>
</template>

<style lang="scss" scoped>
// font-size: 12-50px
@for $i from 12 through 50 {
  .font-size-#{$i} {
    font-size: 1px * $i;
  }
}

// font-weight: 400-600
@for $i from 4 through 6 {
  .font-weight-#{$i}00 {
    font-weight: 100 * $i;
  }
}
</style>
