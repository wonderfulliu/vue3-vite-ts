<script setup lang="ts">
import NotFound from '@/assets/image/404.png'
import { useRouter, useRoute } from 'vue-router'
const { go } = useRouter()
</script>

<template>
  <div class="not-found">
    <el-result title="" sub-title="">
      <template #icon>
        <el-image :src="NotFound" />
      </template>
      <template #extra>
        <Icon icon="返回" color="rgba(255,255,255, 0.8)" class="back" font-size="26" @click="go(-1)" />
      </template>
    </el-result>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  box-sizing: border-box;
  height: 100vh;
  background-color: #111;
  @include flex($jc: center);

  :deep(.el-result) {
    .el-result__icon img {
      height: 60vh;
    }

    .el-result__title>p {
      color: #fff;
    }

    .el-result__subtitle>p {
      color: rgba(#fff, 0.6);
    }
  }

  .back {
    position: absolute;
    top: 55px;
    right: 70px;
    cursor: pointer;
  }
}
</style>
