<script setup lang="ts">
// 核心文件
// 引入CodeMirror和基础样式
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
// JSON代码高亮需要由JavaScript插件支持
import "codemirror/mode/javascript/javascript.js";
// 选择IDEA主题样式，还有其他很多主题可选
// import "codemirror/theme/idea.css";
import 'codemirror/theme/rubyblue.css'
// 支持使用Sublime快捷键
import "codemirror/keymap/sublime.js";
// 搜索功能的依赖
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
// 支持搜索功能
import "codemirror/addon/search/search";
import "codemirror/addon/search/searchcursor.js";
// 支持各种代码折叠
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
// 支持代码区域全屏功能
import "codemirror/addon/display/fullscreen.css";
import "codemirror/addon/display/fullscreen.js";
// 支持括号自动匹配
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/edit/closebrackets.js";
// 支持代码自动补全
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/anyword-hint.js";
// 行注释
import "codemirror/addon/comment/comment.js";
// JSON错误检查
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/lint.js";
// 需要依赖全局的jsonlint，不是很优雅
import "codemirror/addon/lint/json-lint.js";
// 引入jsonlint
import jsonlint from "jsonlint-mod";
window.jsonlint = jsonlint;

const props = defineProps({
  json: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['getEditorValue'])

let jsonEditor = ref(null)
const myRef = ref(null)

watch(() => props.json, () => {
  const editorValue = jsonEditor.getValue()
  if (val !== editorValue) {
    jsonEditor.setValue(props.json)
  }
})

const initEditor = () => {
  jsonEditor = CodeMirror.fromTextArea(myRef.value, {
    mode: 'application/json', // JS高亮显示
    indentUnit: 2, // 缩进单位，默认2
    theme: 'rubyblue', // 设置主题
    lint: true, // 实现语法报错功能
    tabSize: 2,
    smartIndent: true, // 是否智能缩进
    styleActiveLine: true, // 当前行高亮
    lineNumbers: true, // 显示行号
    lineWrapping: true, // 自动换行
    matchBrackets: true, // 括号匹配显示
    autoCloseBrackets: true, // 输入和退格时成对
    autoRefresh: true, // 自动刷新
    // keyMap: "sublime", // 绑定sublime快捷键
    // 开启代码折叠
    foldGutter: true,
    gutters: [
      "CodeMirror-linenumbers",
      "CodeMirror-foldgutter",
      "CodeMirror-lint-markers",
    ],
    // 全屏模式
    fullScreen: false,
    // 额外快捷键
    extraKeys: {
      F11: (cm) => {
        cm.setOption("fullScreen", !cm.getOption("fullScreen"));
      },
      Esc: (cm) => {
        if (cm.getOption("fullScreen")) {
          cm.setOption("fullScreen", false);
        }
      },
    },
  })

  jsonEditor.on('change', cm => {
    emit('getEditorValue', cm.getValue())
  })
}

onMounted(() => {
  initEditor()
})

// methods
const refresh = () => {
  jsonEditor && jsonEditor.refresh()
}

</script>

<template>
  <div class="json-editor">
    <textarea ref="myRef"></textarea>
  </div>
</template>

<style lang="scss" scoped>
.json-editor {
  height: 100%;
  position: relative;
  :deep(.CodeMirror) {
    height: 100%;
  }
  .CodeMirror-scroll {
    height: 100%;
  }
  .cm-s-rubyblue span.cm-string {
    color: #f08047;
  }
}
</style>
