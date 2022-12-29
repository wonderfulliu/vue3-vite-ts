<script setup lang="ts">
import { utilRoutes } from '@/router'
import { useRouter, useRoute } from 'vue-router'

const onActiveMenu = computed(() => {
  const route = useRoute()
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const handleOpen: ((index: string, indexPath: string[]) => any) | undefined = (
  index,
  indexPath
) => {
  // console.log(key, keyPath)
}
const handleClose: ((index: string, indexPath: string[]) => any) | undefined = (
  index,
  indexPath
) => {
  // console.log(key, keyPath)
}
</script>

<template>
  <el-menu :default-active="onActiveMenu" :collapse="false" :router="true" :unique-opened="true" @open="handleOpen"
    @close="handleClose" >
    <template v-for="(route, index) in utilRoutes" :key="index">
      <template v-if="!route.meta!.hidden">
        <el-sub-menu v-if="route.children?.length" :index="route.path">
          <template #title>
            <Icon :icon="route.meta!.icon" />
            <span>{{ route.meta!.title }}</span>
          </template>

          <template v-for="(inner_route, inner_index) in route.children" :key="inner_index">
            <el-menu-item v-if="!inner_route.meta!.hidden" :index="route.path + '/' + inner_route.path">
              <Icon :icon="inner_route.meta!.icon" />
              <span>{{ inner_route.meta!.title }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>

        <el-menu-item v-else :index='`/${route.path}`'>
          <Icon :icon="route.meta!.icon" />
          <span style="margin-left: 8px">{{ route.meta!.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<style lang="scss" scoped>
$menu-height: 45px;

.el-menu {
  border-right: none;

  .el-menu-item, .ignore_h {
    height: $menu-height;

    &.is-active {
      background-color: rgba($color-primary, .1);
      color: $color-primary;
    }
  }

  :deep() .el-sub-menu__title {
    height: $menu-height;
  }
}
</style>
