<script setup lang="ts">
import { renderAsync } from 'docx-preview'
import JSZip from 'jszip'

window.JSZip = JSZip

type Props = {
  src?: any
}
const props = withDefaults(defineProps<Props>(), {})
// word
const preview = ref<HTMLElement>()
const file = ref<HTMLInputElement>()

const handlePreivew = () => {
  renderAsync(file.value?.files![0], preview.value as HTMLElement)
}

watch(() => props.src, (src) => {
  src && renderAsync(props.src, preview.value as HTMLElement)
})
</script>

<template>
  <div class="docx-container" ref="preview">
    <input type="file" @change="handlePreivew" ref="file" />
  </div>
</template>

<style lang="scss" scoped>
.docx-container {
  overflow-y: auto;
}
</style>
