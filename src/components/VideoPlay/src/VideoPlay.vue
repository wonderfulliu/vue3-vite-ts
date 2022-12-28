<script setup lang="ts">
import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css

type Props = {
  src: string
}
const props = withDefaults(defineProps<Props>(), {})

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

</script>

<template>
  <vue3videoPlay
    v-bind="options"
    :src="props.src"
    @play="onPlay"
    @pause="onPause"
    @timeupdate="onTimeupdate"
    @canplay="onCanplay"
  />
</template>

<style lang="scss" scoped></style>
