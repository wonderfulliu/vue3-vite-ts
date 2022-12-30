<script setup lang="ts">
import Quill from 'quill'
import 'quill/dist/quill.snow.css'


const editorRef = ref(null)

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction
  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['clean'],
  // ['emoji']                                     // remove formatting button
  ['link', 'image', 'video']                                     // remove formatting button
];
const options = {
  debug: 'info',
  modules: {
    toolbar: toolbarOptions
  },
  placeholder: '请输入...',
  // readOnly: true,
  theme: 'snow'
}

const editor = ref(null)
onMounted(() => {
  editor.value = new Quill(editorRef.value, options)
})

onUnmounted(() => {
  
})

const getContents = () => {
  const a = editor.value!.getContents()
  const b = editor.value!.getFormat()
  const c = editor.value!.getText()
  console.log(a);
  console.log(b);
  console.log(c);
}

</script>

<template>
  <!-- <button @click="getContents">ddd</button> -->
  <div ref="editorRef"></div>
</template>

<style lang="scss" scoped>
.ql-container {
  height: calc(100% - 60px);
}
</style>
