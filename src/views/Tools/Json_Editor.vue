<script setup lang="ts">
const getEditorValue = (val: string) => {
  console.log(val)
}
</script>

<template>
  <JsonEditor @getEditorValue="getEditorValue" />
</template>

<style scoped>
</style>
