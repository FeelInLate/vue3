<template>
  <el-header>
    <div class="l-content">
      <!-- 图标的展示 -->
      <el-button size="small" plain @click="CollapseStore.updateIsCollapse()">
        <el-icon :size="20">
          <Menu />
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{ current.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 面包屑 -->
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getImgSrc('favicon')" alt="" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="loginOUt">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { computed } from 'vue'
import { useCollapseStore } from '../stores/collapse';
import { useMenuStore } from "../stores/clickMenu";
import { useSelectMenuStore } from "../stores/selectMenu";
import { useRouter } from 'vue-router';
const CollapseStore = useCollapseStore()
const menuStore = useMenuStore()
const selectMenu = useSelectMenuStore()
const router = useRouter()
// 动态更换图像URL
const getImgSrc = (user) => {
  return new URL(`../../public/${user}.ico`, import.meta.url).href;
};
const current = computed(() => {
  return menuStore.currentMenu
})
const loginOUt = () => {
  selectMenu.cleanMenu()
  router.push({
    name: 'login'
  })
}
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #333;
}

.l-content {
  display: flex;
  align-items: center;

  .el-button {
    margin-right: 20px;
  }

  h3 {
    color: #fff;
  }
}
.bread /deep/ span {
  color: #fff !important;
  cursor: pointer !important;
}
</style>
