<script setup lang="ts">
import { computed } from 'vue-demi'
import SvgIcon from '@/components/SvgIcon.vue'
import logo from '@/assets/logo.png'
import avatar from '@/assets/avatar.png'
import arrow from '@/assets/down@2x.png'
import useGlobalStore from '@/store/global'
import { getCookie } from '@/utils/storage'
import { USERINFO } from '@/config/constant'
import router from '@/router'
const globalStore = useGlobalStore()
type UserInfo = {
  realname: string
  phone: string
  createTime: string
  userType: number
  code: string
}
const userInfo = getCookie<UserInfo>(USERINFO) as UserInfo
const token = computed(() => globalStore.token)

// menu相关
const handleCommand = async () => {
  const res = await globalStore.logout()
  // 直接强制退出
  router.push({ name: 'Login' })
  // if (res) {
  // }
}
</script>

<template>
  <div class="header-container">
    <div class="logo">
      <img :src="logo" alt="logo" />
    </div>
    <div v-if="token" class="user-menu">
      <el-avatar :src="avatar" class="avatar" />
      <div class="drop-menu">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userInfo.realname }}
            <img :src="arrow" class="icon" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="exit">
                <el-icon>
                  <SvgIcon name="exit" />
                </el-icon>
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  box-sizing: border-box;
  height: $headerHeight;
  padding: 20px 0px;
  @include flex($jc: space-between);
  background-color: transparent;
  .logo {
    img {
      width: 332px;
      height: 40px;
    }
  }
  .user-menu {
    @include flex;
    .avatar {
      width: 40px;
      height: 40px;
      margin-right: 8px;
    }
    .drop-menu {
      @include flex;
      .el-dropdown-link {
        cursor: pointer;
        @include flex;
      }
      .icon {
        width: 12px;
        height: 12px;
        margin-left: 16px;
      }
    }
  }
}
</style>
