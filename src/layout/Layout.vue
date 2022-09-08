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
$mb: 20px;
.common-layout {
  height: 100vh;
  background-color: #f2f2f4;
  .el-container {
    height: 100%;
    .el-header {
      margin-bottom: $mb;
    }
    .el-aside {
      width: 264px;
      height: calc(100vh - $headerHeight - $mb);
    }
    .main-container {
      height: calc(100vh - $headerHeight - $mb);
      padding: 0 15px 15px 15px;
      background-color: transparent;
    }
  }
}
</style>
