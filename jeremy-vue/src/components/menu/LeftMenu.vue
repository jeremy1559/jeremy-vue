<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      background-color="#f2eada"
      text-color="#77787b"
      active-text-color="#65c294"
      @select="handleSelect"
    >
      <template v-for=" (item, index) in menu">
        <template v-if="!item.child||item.child.length<=0">
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
                  <i :class="childItem.icon"></i>
                  {{childItem.name}}
                </el-menu-item>
              </template>
              <template v-else>
                <el-submenu :index="childItem.order">
                  <template slot="title" @click="toRouter(childItem)">
                    <i :class="childItem.icon"></i>
                    {{childItem.name}}
                  </template>
                  <template v-for=" (childChildItem, childChildIndex) in childItem.child">
                    <el-menu-item :index="childChildItem.order" @click="toRouter(childChildItem)">
                      <i :class="childChildItem.icon"></i>
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
        // {
        //   order: "1",
        //   name: "导航1",
        //   path: "/home",
        //   icon: "el-icon-location",
        //   child: [
        //     {
        //       order: "1-1",
        //       name: "导航1-1",
        //       path: "/home",
        //       icon: "el-icon-location"
        //     },
        //     {
        //       order: "1-2",
        //       name: "导航1-2",
        //       path: "/home",
        //       icon: "el-icon-location",
        //       child: [
        //         {
        //           order: "1-2-1",
        //           name: "导航1-2-1",
        //           path: "/home",
        //           icon: "el-icon-location"
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   order: "2",
        //   name: "导航2",
        //   path: "/home",
        //   icon: "el-icon-setting",
        //   child: [
        //     {
        //       order: "2-1",
        //       name: "导航2-1",
        //       path: "/home",
        //       icon: "el-icon-location",
        //       child: [
        //         {
        //           order: "2-1-1",
        //           name: "导航2-1-1",
        //           path: "/home",
        //           icon: "el-icon-location"
        //         }
        //       ]
        //     },
        //     {
        //       order: "2-2",
        //       name: "导航2-2",
        //       path: "/home",
        //       icon: "el-icon-location",
        //       child: [
        //         {
        //           order: "2-2-1",
        //           name: "导航2-2-1",
        //           path: "/home",
        //           icon: "el-icon-location"
        //         },
        //         {
        //           order: "2-2-2",
        //           name: "导航2-2-2",
        //           path: "/home2",
        //           icon: "el-icon-location"
        //         }
        //       ]
        //     }
        //   ]
        // }
      ]
    };
  },
  mounted() {
    this.$axios
      .post(this.$URL.menu.path, {
        type: "1"
      })
      .then(response => {
        if (response.data.status == "0000") {
          this.menu = response.data.data;
        } else {
          this.$message({
            message: "获取左侧菜单失败",
            type: "warning"
          });
        }
      });
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
