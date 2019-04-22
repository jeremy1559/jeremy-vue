<template>
  <div class="index">
    <div class="top">
      <HeadNav></HeadNav>
    </div>
    <div class="left">
      <p class="info">欢迎登陆:{{user.userName}}</p>
      <LeftMenu></LeftMenu>
    </div>

    <div class="tittle" v-if="fullPath !='/index'">
      <template v-for=" (item, index) in matched">
        <i v-if="item.path!='/index'" @click="toRoute(item)">
          <i class="el-icon-arrow-right"></i>
          {{item.name}}
        </i>
      </template>
    </div>
    <div v-bind:class="{view:fullPath !='/index',view2:fullPath =='/index'}">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeadNav from "@/components/menu/HeadNav";
import LeftMenu from "@/components/menu/LeftMenu";

export default {
  name: "index",
  components: {
    HeadNav,
    LeftMenu
  },
  data() {
    return {
      //当前路由对象中的路由列表
      matched: this.$route.matched,
      fullPath: this.$route.fullPath,
      user: {}
    };
  },
  mounted() {
    //修改整个body的颜色
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f7f7f7");
    this.user = JSON.parse(sessionStorage.getItem("user"));
  },
  //销毁body样式
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
  //自定义事件获取当前路由列表
  beforeRouteUpdate(to, from, next) {
    this.matched = to.matched;
    this.fullPath = to.fullPath;
    next();
  },
  methods: {
    //页面totalTop点击跳转路由
    toRoute(item) {
      this.$router.push(item.path);
      console.log("to->>>" + item.path);
    }
  }
};
</script>
<style scoped>
.index {
  background-color: #f2eada;
  width: 100%;
  height: 100%;
}
.info {
  padding-left: 20px;
  margin: 0px;
  color: rgb(153, 153, 153);
  height: 30px;
}
.left {
  position: fixed;
  top: 60px;
  left: 0;
  min-height: 100%;
  width: 180px;
  background-color: #f2eada;
  z-index: 99;
}
.top {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 99;
  height: 30px;
  background-color: #f2eada;
}

.tittle {
  position: fixed;
  top: 60px;
  left: 180px;
  z-index: 99;
  width: 95%;
  height: 30px;
  line-height: 30px;
  font-family: Microsoft YaHei;
  background-color: white;
  padding-left: 10px;
}
.view {
  position: fixed;
  top: 100px;
  left: 190px;
  z-index: 99;
  width: 95%;
  height: 95%;
  background-color: white;
  padding: 5px;
}
.view2 {
  position: fixed;
  top: 70px;
  left: 190px;
  z-index: 99;
  width: 95%;
  height: 95%;
  background-color: white;
  padding: 5px;
}
</style>

