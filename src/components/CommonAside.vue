<template>
  <el-aside :width="collapseStore.isCollapse ? '180px' : '60px'">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :collapse="!collapseStore.isCollapse"
      :collapse-transition="false"
    >
      <h3 v-show="collapseStore.isCollapse">通用后台管理系统</h3>
      <el-menu-item
        v-for="item in noChildren()"
        :key="item.path"
        :index="item.path"
        @click="clickMenu(item)"
      >
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        :index="item.path"
        v-for="item in hasChildren()"
        :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.path"
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            @click="clickMenu(subItem)"
          >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
// aside折叠
import { useCollapseStore } from "../stores/collapse";
import { useMenuStore } from "../stores/clickMenu";
import { useRouter } from "vue-router";
import { useSelectMenuStore } from "../stores/selectMenu";
const collapseStore = useCollapseStore();
const menuStore = useMenuStore();
const selectMenu = useSelectMenuStore()
// 菜单数据
// const list = [
//   {
//     path: "/user",
//     name: "user",
//     label: "用户管理",
//     icon: "user",
//     url: "UserManage/UserManage",
//   },
//   {
//     path: "/other",
//     label: "其他",
//     icon: "location",
//     children: [
//       {
//         path: "/page1",
//         name: "page1",
//         label: "页面1",
//         icon: "setting",
//         url: "Other/PageOne",
//       },
//       {
//         path: "/page2",
//         name: "page2",
//         label: "页面2",
//         icon: "setting",
//         url: "Other/PageTwo",
//       },
//     ],
//   },
// ];
const asyncList = selectMenu.menu
const noChildren = () => {
  return asyncList.filter((item) => !item.children);
};
const hasChildren = () => {
  return asyncList.filter((item) => item.children);
};
// 路由=>菜单跳转

const router = useRouter();
const clickMenu = (item) => {
  router.push({
    name: item.name,
  });
  menuStore.selectMenu(item)
};
</script>

<style lang="less" scoped>
.icons {
  width: 18px;
  height: 18px;
}

.el-menu {
  border-right: none;

  h3 {
    line-height: 48px;
    text-align: center;
    color: #fff;
  }
}
</style>
