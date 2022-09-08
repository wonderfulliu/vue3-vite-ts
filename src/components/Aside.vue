<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { navRoutes } from '@/router'

import { useRouter, useRoute } from 'vue-router'
const route = useRoute()

const handleOpen = (key, keyPath) => {
  // console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  // console.log(key, keyPath)
}
</script>

<template>
  <el-menu
    :default-active="route.path"
    :collapse="false"
    :router="true"
    :unique-opened="true"
    @open="handleOpen"
    @close="handleClose"
    background-color="transparent"
  >
    <template v-for="(route, index) in navRoutes" :key="index">
      <template v-if="!route.meta.hidden">
        <el-sub-menu v-if="route.children?.length" :index="route.path">
          <template #title>
            <el-icon>
              <SvgIcon :name="route.meta.icon" />
            </el-icon>
            <span>{{ route.meta.title }}</span>
          </template>

          <template v-for="(inner_route, inner_index) in route.children" :key="inner_index">
            <el-menu-item
              v-if="!inner_route.meta.hidden"
              :index="route.path + '/' + inner_route.path"
            >
              <el-icon>
                <SvgIcon :name="inner_route.meta.icon" />
              </el-icon>
              <span>{{ inner_route.meta.title }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>

        <el-menu-item v-else :index="route.path">
          <el-icon>
            <SvgIcon :name="route.meta.icon" />
          </el-icon>
          <span>{{ route.meta.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<style lang="scss" scoped>
$menu-height: 60px;
$background-color: blue;
.el-menu {
  border-right: none;
  .el-menu-item {
    height: $menu-height;
    &.is-active {
      background-color: $background-color;
      color: #fff;
    }
  }
  :deep() .el-sub-menu__title {
    height: $menu-height;
  }
}
</style>
