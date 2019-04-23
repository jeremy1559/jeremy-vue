<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color="#f2eada"
      text-color="#77787b"
      active-text-color="#65c294"
    >
      <el-menu-item index="0">
        <router-link to="/home">
          <img src="../../assets/jeremy_log.png">
        </router-link>
      </el-menu-item>

      <template v-for=" (item, index) in menu">
        <template v-if="!item.child||item.child.length<=0">
          <el-menu-item :index="item.order" @click="toRouter(item)">{{item.name}}</el-menu-item>
        </template>
        <template v-else="item.child.length>0">
          <el-submenu :index="item.order">
            <template slot="title">{{item.name}}</template>
            <template v-for=" (childItem, childIndex) in item.child">
              <template v-if="!childItem.child||childItem.child.length<=0">
                <el-menu-item
                  :index="childItem.order"
                  @click="toRouter(childItem)"
                >{{childItem.name}}</el-menu-item>
              </template>
              <template v-else="childItem.child.length>0">
                <el-submenu :index="childItem.order" @click="toRouter(childItem)">
                  <template slot="title">{{childItem.name}}</template>
                  <template v-for=" (childChildItem, childChildIndex) in childItem.child">
                    <el-menu-item
                      :index="childChildItem.order"
                      @click="toRouter(childChildItem)"
                    >{{childChildItem.name}}</el-menu-item>
                  </template>
                </el-submenu>
              </template>
            </template>
          </el-submenu>
        </template>
      </template>

      <el-submenu index="999" style="float: right;">
        <template slot="title">个人中心</template>
        <el-menu-item index="999-1">个人信息</el-menu-item>
        <el-menu-item index="999-2" @click="logOut">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //选中菜单坐标
      activeIndex: "",
      menu: [
        // {
        //   order: "1",
        //   name: "导航1",
        //   path: "/home",
        //   child: [
        //     {
        //       order: "1-1",
        //       name: "导航1-1",
        //       path: "/home"
        //     },
        //     {
        //       order: "1-2",
        //       name: "导航1-2",
        //       path: "/home",
        //       child: [
        //         {
        //           order: "1-2-1",
        //           name: "导航1-2-1",
        //           path: "/home"
        //         }
        //       ]
        //     }
        //   ]
        // },
        // {
        //   order: "2",
        //   name: "导航2",
        //   path: "/home",
        //   child: [
        //     {
        //       order: "2-1",
        //       name: "导航2-1",
        //       path: "/home",
        //       child: [
        //         {
        //           order: "2-1-1",
        //           name: "导航2-1-1",
        //           path: "/home"
        //         }
        //       ]
        //     },
        //     {
        //       order: "2-2",
        //       name: "导航2-2",
        //       path: "/home",
        //       child: [
        //         {
        //           order: "2-2-1",
        //           name: "导航2-2-1",
        //           path: "/home2"
        //         }
        //       ]
        //     }
        //   ]
        // }
      ]
    };
  },

  mounted(){
     this.$axios
        .post(this.$URL.menu.path, {
          type: '3',
        })
        .then(response => {
          if (response.data.status == "0000") {
           this.menu=response.data.data;
          } else {
            this.$message({
              message: "获取顶部菜单失败",
              type: "warning"
            });
          }
        });
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toRouter(item){
      if(item && item.path){
        this.$router.push({path:item.path});
      }
    },
    logOut(){
       this.$axios
          .post(this.$URL.logOut.path, {
          })
          .then(response => {
            if (response.data.status == "0000") {
              //删除登陆用户信息
              sessionStorage.removeItem("user");
              this.$message({
                message: response.data.msg,
                type: "success"
              });
              this.$router.push("/login")
            } else {
              this.$message({
                message: response.data.msg,
                type: "warning"
              });
            }
          });
    }
  }
};
</script>

<style scoped>
.el-submenu .el-menu-item {
  min-width: 100%;
}

</style>
