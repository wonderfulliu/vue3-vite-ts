<script setup lang="ts">
const dragControllerDiv = () => {
  const resize = document.querySelector('.resize') as HTMLDivElement
  const left = document.querySelector('.left') as HTMLDivElement
  const right = document.querySelector('.right') as HTMLDivElement
  const box = document.querySelector('.resize-container') as HTMLDivElement
  // resize-container距离左边的距离
  const boxLeft = box.offsetLeft
  // 左右两个区域的最小宽度
  const leftLen = 0
  const rightLen = 0
  // 拖拽的元素的宽度
  const dragElWidth = 8
  const dragEl = resize
  // 鼠标按下事件
  dragEl.onmousedown = function (e: MouseEvent) {
    //颜色改变提醒
    dragEl.style.background = '#dfdfdf'
    // 拖拽开始时的x坐标
    var startX = e.clientX
    // 鼠标拖动事件
    document.onmousemove = function (e: MouseEvent) {
      // 拖拽的元素到容器左边的距离
      dragEl.left = startX - boxLeft - dragElWidth / 2
      var endX = e.clientX
      var moveLen = dragEl.left + (endX - startX) // （endx-startx）= 移动的距离。dragEl.left+移动的距离=左边区域最后的宽度
      var maxT = box.clientWidth - dragEl.offsetWidth // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
      if (moveLen < leftLen) moveLen = leftLen // 左边区域的最小宽度为leftLen px
      if (moveLen > maxT - rightLen) moveLen = maxT - rightLen //右边区域最小宽度为rightLen px
      dragEl.style.left = moveLen.toString() // 设置左侧区域的宽度
      left.style.width = moveLen + 'px'
      right.style.width = box.clientWidth - moveLen - dragElWidth + 'px'
    }
    // 鼠标松开事件
    document.onmouseup = function (evt) {
      //颜色恢复
      dragEl.style.background = '#efefef'
      document.onmousemove = null
      document.onmouseup = null
      dragEl.releaseCapture && dragEl.releaseCapture() //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
    }
    dragEl.setCapture && dragEl.setCapture() //该函数在属于当前线程的指定窗口里设置鼠标捕获
    return false
  }
}
onMounted(() => {
  dragControllerDiv()
})
</script>

<template>
  <div class="resize-container">
    <div class="left">
      <slot name="left">left</slot>
    </div>
    <div class="resize" title="收缩侧边栏">⋮</div>
    <div class="right">
      <slot name="right">right</slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$resizeWidth: 8px;

.resize-container {
  overflow: hidden;
  display: flex;
  height: 100%;

  .left {
    overflow-x: auto;
    overflow-y: hidden;
    width: calc(50% - ($resizeWidth / 2));
  }

  .resize {
    width: $resizeWidth;
    color: #999;
    background-color: #efefef;
    font-size: 30px;
    border-radius: 4px;
    cursor: col-resize;
    @include flex($jc: center);

    &:hover {
      color: #444;
    }
  }

  .right {
    overflow-x: auto;
    overflow-y: hidden;
    width: calc(50% - ($resizeWidth / 2));
  }
}
</style>
