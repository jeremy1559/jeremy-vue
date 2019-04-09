<template>
  <div class="menu_page">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <template v-for=" (item, index) in menu">
        <template slot="title" v-if="!item.child||item.child.length<=0">
          <el-menu-item :index="item.order" @click="toRouter(item)">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </el-menu-item>
        </template>
        <template v-else>
          <el-submenu :index="item.order">
            <template slot="title" @click="toRouter(item)">
              <i :class="item.icon"></i>
              {{item.name}}
            </template>
            <template v-for=" (childItem, childIndex) in item.child">
              <template v-if="!childItem.child||childItem.child.length<=0">
                <el-menu-item index="childItem.order" @click="toRouter(childItem)">
                  <i :class="item.icon"></i>
                  {{childItem.name}}
                </el-menu-item>
              </template>
              <template v-else>
                <el-submenu :index="childItem.order">
                  <template slot="title" @click="toRouter(childItem)">
                    <i :class="item.icon"></i>
                    {{childItem.name}}
                  </template>
                  <template v-for=" (childChildItem, childChildIndex) in childItem.child">
                    <el-menu-item :index="childChildItem.order" @click="toRouter(childChildItem)">
                      <i :class="item.icon"></i>
                      {{childChildItem.name}}
                    </el-menu-item>
                  </template>
                </el-submenu>
              </template>
            </template>
          </el-submenu>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "leftmenu",
  data() {
    return {
      activeIndex: "1-1",
      menu: [
        {
          order: "1",
          name: "导航1",
          path: "/home",
          icon: "el-icon-location",
          child: [
            {
              order: "1-1",
              name: "导航1-1",
              path: "/home",
              icon: "el-icon-location"
            },
            {
              order: "1-2",
              name: "导航1-2",
              path: "/home",
              icon: "el-icon-location",
              child: [
                {
                  order: "1-2-1",
                  name: "导航1-2-1",
                  path: "/home",
                  icon: "el-icon-location"
                }
              ]
            }
          ]
        },
        {
          order: "2",
          name: "导航2",
          path: "/home",
          icon: "el-icon-setting",
          child: [
            {
              order: "2-1",
              name: "导航2-1",
              path: "/home",
              icon: "el-icon-location",
              child: [
                {
                  order: "2-1-1",
                  name: "导航2-1-1",
                  path: "/home",
                  icon: "el-icon-location"
                }
              ]
            },
            {
              order: "2-2",
              name: "导航2-2",
              path: "/home",
              icon: "el-icon-location",
              child: [
                {
                  order: "2-2-1",
                  name: "导航2-2-1",
                  path: "/home",
                  icon: "el-icon-location"
                },
                {
                  order: "2-2-2",
                  name: "导航2-2-2",
                  path: "/home2",
                  icon: "el-icon-location"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toRouter(item) {
      if (item && item.path) {
        this.$router.push({ path: item.path });
      }
    }
  }
};
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 60px;
  left: 0;
  min-height: 100%;
  background-color: #545c64;
  z-index: 99;
}

.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
