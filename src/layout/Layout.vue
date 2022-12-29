<script setup lang="ts">
const { header, aside, breadcrumb, content } = useSlots()
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header v-if="header" :class="[!!header ? '' : 'header-no']">
        <slot name="header"></slot>
      </el-header>
      <el-container :class="[header ? 'container-header' : 'container-no-header']">
        <el-aside v-if="aside" style="width: 240px">
          <slot name="aside"></slot>
        </el-aside>
        <el-main class="main-container">
          <slot name="breadcrumb"></slot>
          <slot name="content"></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
$layout-header-height: 60px;

.common-layout {
  height: 100vh;
  background-color: $background-color;

  .el-container {

    .el-header,
    .ignore_h {
      height: $layout-header-height;
    }

    .header-no {
      height: 0;
    }

    .el-aside {
      height: 100%;
      box-shadow: 0px 0px 10px #ccc;;
    }

    .container-header,
    .ignore_h {
      height: calc(100vh - $layout-header-height);
    }

    .container-no-header {
      height: calc(100vh);
    }

    .main-container,
    .ignore_h {
      height: 100%;
      padding: 10px;
      background-color: transparent;
    }
  }
}
</style>
