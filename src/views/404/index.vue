<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const { go } = useRouter()
</script>

<template>
  <div class="not-found">
    <el-result icon="error" title="Page Not Found" sub-title="请跳转有效路由">
      <template #extra>
        <el-button type="primary" @click="go(-1)">返回</el-button>
      </template>
    </el-result>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  height: 75vh;
  @include flex($jc: center);
}
</style>
