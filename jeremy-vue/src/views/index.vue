<template>
  <div class="index">
    <HeadNav></HeadNav>
    <LeftMenu></LeftMenu>

    <div class="rightContainer">
      <div class="tittle">
        <router-link to="/home"> 导航1 </router-link>
        <i class="el-icon-d-arrow-right"></i>
        <router-link to="/home"> 首页 </router-link>
        <i class="el-icon-d-arrow-right"></i>
      </div>
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
  }
};
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.tittle {
  border-bottom: solid #acc0d8 1px;
  margin: 10px;
}
.rightContainer {
  position: fixed;
  top: 70px;
  left: 190px;
  z-index: 99;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 100%;
  height: 100%;
  border-bottom: solid #acc0d8 1px;
}
.router-link-active {
  text-decoration: none;
}
</style>

