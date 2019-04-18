<template>
  <div class="index">
    <HeadNav></HeadNav>
    <LeftMenu></LeftMenu>

    <div class="tittle" v-if="fullPath !='/index'">
      <template v-for=" (item, index) in matched">
        <i v-if="item.path!='/index'" @click="toRoute(item)" class="hoverRed"><i class="el-icon-arrow-right" v-if="item.path!='/index'"></i>{{item.name}}</i>
      </template>
    </div>
    <div v-bind:class="{view:fullPath !='/index',view2:fullPath =='/index'}">
      <router-view v-on:changeTopTitle="changeTopTitle"></router-view>
    </div>
  </div>
</template>

<script>
import HeadNav from "@/components/menu/HeadNav";
import LeftMenu from "@/components/menu/LeftMenu";
import { debug } from "util";

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
      fullPath: this.$route.fullPath
    };
  },
  created() {},
  methods: {
    //页面totalTop点击跳转路由
    toRoute(item) {
      this.$router.push(item.path);
    },
    //自定义事件获取当前路由列表
    changeTopTitle() {
      this.matched = this.$route.matched;
      this.fullPath = this.$route.fullPath;
    }
  }
};
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  border: 1px solid ;
}

.tittle {
  position: fixed;
  top: 60px;
  left: 180px;
  z-index: 99;
  width: 100%;
  height: 30px;
  line-height:30xp;
  font-family:Microsoft YaHei;
  border: 1px solid #dedede;
}
.view {
  position: fixed;
  top: 100px;
  left: 190px;
  z-index: 99;
  width: 100%;
  height: 100%;
  height: 100%;
  border: 1px solid #dedede;
}
.view2 {
  position: fixed;
  top: 70px;
  left: 190px;
  z-index: 99;
  width: 100%;
  height: 100%;
  height: 100%;
  border: 1px solid  #dedede;
}
.router-link-active {
  text-decoration: none;
}
.hoverRed {
  cursor: pointer;
}
</style>

