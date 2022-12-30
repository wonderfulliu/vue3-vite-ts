<script setup lang="ts">
import Icon from '@/components/Icon'
import { myRoutes } from '@/router'
import { MenuItemClicked, ElMenu, ElSubMenu, ElMenuItem } from 'element-plus'
import { useRouter, useRoute, NavigationFailure } from 'vue-router'

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
const handleSelect:
  | ((
      index: string,
      indexPath: string[],
      item: MenuItemClicked,
      routerResult?: Promise<void | NavigationFailure> | undefined
    ) => any)
  | undefined = (index: string, indexPath: string[], item, routeResult) => {}
</script>

<template>
  <el-menu
    :default-active="onActiveMenu"
    :collapse="false"
    :router="true"
    :unique-opened="false"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
  >
    <template v-for="(route, index) in myRoutes" :key="index">
      <template v-if="!route.meta!.hidden">
        <el-sub-menu v-if="route.children?.length" :index="route.path">
          <template #title>
            <Icon :icon="route.meta!.icon" />
            <span class="menu-text">{{ route.meta!.title }}</span>
          </template>

          <template
            v-for="(inner_route, inner_index) in route.children"
            :key="inner_index"
          >
            <el-menu-item
              v-if="!inner_route.meta!.hidden"
              :index="`/${route.path}/${inner_route.path}`"
            >
              <Icon :icon="inner_route.meta!.icon" />
              <span class="menu-text">{{ inner_route.meta!.title }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>

        <el-menu-item v-else :index="`/${route.path}`">
          <Icon :icon="route.meta!.icon" />
          <span class="menu-text">{{ route.meta!.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<style lang="scss" scoped>
$menu-height: 40px;

.el-menu {
  border-right: none;

  .menu-text {
    margin-left: 10px;
  }

  .el-menu-item,
  .ignore_h {
    height: $menu-height;
    margin-bottom: 5px;

    &.is-active {
      background-color: rgba($color-primary, 0.1);
      color: $color-primary;
    }
  }

  :deep(.el-sub-menu, .ignore_h) {
    .el-sub-menu__title {
      height: $menu-height;
    }
  }
}
</style>
