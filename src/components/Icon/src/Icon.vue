<script setup lang="ts">
interface IProps {
  icon: string
  fontSize?: string | number
  color?: string
  width?: string
  height?: string
  backgroundColor?: string
}

const props = withDefaults(defineProps<IProps>(), {
  fontSize: '16',
  color: 'currentColor',
  width: '1em',
  height: '1em',
  backgroundColor: ''
})
</script>

<template>
  <svg class="icon" aria-hidden="true" :font-size="fontSize" :color="color" :style="{ width, height, backgroundColor }">
    <use :xlink:href="`#icon-${icon}`"></use>
  </svg>
</template>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
