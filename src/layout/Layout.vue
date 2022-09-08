<script setup lang="ts"></script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <slot name="header"></slot>
      </el-header>
      <el-container>
        <el-aside>
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
$mb: h(20px);
.common-layout {
  height: 100vh;
  background-color: $background-color;
  .el-container {
    .el-header {
      margin-bottom: $mb;
      height: $layout-header-height;
    }
    .el-aside {
      width: $layout-aside-width;
      height: calc(100vh - $layout-header-height - $mb);
    }
    .main-container {
      height: calc(100vh - $layout-header-height - $mb);
      padding: 0 15px h(15px) 15px;
      background-color: transparent;
    }
  }
}
</style>
