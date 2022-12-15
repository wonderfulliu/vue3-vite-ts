<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import Icon from '@/components/Icon.vue'
import { useRoute } from 'vue-router'
import { ref, Ref, watchEffect } from 'vue'
const route = useRoute()
type breadcrumb = {
  title: string
  icon: string
}
const breadcrumbList: Ref<breadcrumb[]> = ref([])
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
  height: $breadHeight;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}
</style>
