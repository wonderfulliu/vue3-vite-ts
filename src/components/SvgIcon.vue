<script setup lang="ts">
const props = defineProps(['name'])
const iconName = computed(() => `#icon-${props.name}`)
</script>

<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href='iconName'></use>
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>
