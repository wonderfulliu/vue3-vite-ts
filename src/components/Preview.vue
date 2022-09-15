<script setup lang="ts">
import { renderAsync } from 'docx-preview'
import JSZip from 'jszip'

window.JSZip = JSZip
type Props = {
  visible: boolean
  type: 'video' | 'word'
  src: any
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits(['update:visible'])
// 提交
const handleSubmit = () => {
  emit('update:visible', false)
}
// 取消
const handleCancel = () => {}
const visible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  },
})

// video
const options = reactive({
  width: '100%', //播放器高度
  height: '100%', //播放器高度
  color: '#409eff', //主题色
  title: '', //视频名称
  muted: false, //静音
  webFullScreen: false,
  speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制
  controlBtns: [
    'audioTrack',
    'quality',
    'speedRate',
    'volume',
    'setting',
    'pip',
    'pageFullScreen',
    'fullScreen',
  ], //显示所有按钮,
})
const onPlay = (ev: any) => {
  // console.log('播放')
}
const onPause = (ev: any) => {
  // console.log(ev, '暂停')
}
const onTimeupdate = (ev: any) => {
  // console.log(ev, '时间更新')
}
const onCanplay = (ev: any) => {
  // console.log(ev, '可以播放')
}

// word
const preview = ref<HTMLElement>()
watchEffect(() => {
  if (props.visible && props.type === 'word') {
    renderAsync(props.src, preview.value as HTMLElement)
  }
})
</script>

<template>
  <teleport to="body">
    <Dialog
      v-model="visible"
      :width="1200"
      @submit="handleSubmit"
      @cancel="handleCancel"
      @close="handleCancel"
    >
      <template v-if="type === 'video'">
        <vue3VideoPlay
          v-bind="options"
          :src="props.src"
          @play="onPlay"
          @pause="onPause"
          @timeupdate="onTimeupdate"
          @canplay="onCanplay"
        />
      </template>
      <template v-if="type === 'word'">
        <div class="docx-container" ref="preview"></div>
      </template>
    </Dialog>
  </teleport>
</template>

<style lang="scss" scoped>
.docx-container {
  height: 600px;
  overflow-y: auto;
}
</style>
