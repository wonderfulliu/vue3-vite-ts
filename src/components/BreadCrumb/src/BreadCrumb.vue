<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

const route = useRoute()
type breadcrumb = {
  title: string
  icon: string
}
const breadcrumbList = ref<breadcrumb[]>([])
watchEffect(() => {
  breadcrumbList.value = []
  route.matched.forEach((item) => {
    const { title, icon } = item.meta
    if (icon && title) {
      breadcrumbList.value.push({ title, icon })
    }
  })
})
</script>

<template>
  <div class="breadcrumb-container">
    <span class="menu-name">{{ breadcrumbList[0].title }}</span>
    <el-divider direction="vertical" class="divider" />
    <el-icon>
      <Icon :icon="route.meta.icon" font-size="16" />
    </el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="item in breadcrumbList">{{ item.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
$bread-height: 35px;
.breadcrumb-container {
  .menu-name {
    font-size: 24px;
    color: #1f242e;
    font-weight: 500;
  }

  .divider {
    margin: 0 24px;
  }

  box-sizing: border-box;
  height: $bread-height;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}
</style>
