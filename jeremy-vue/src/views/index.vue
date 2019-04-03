<template>
  <div class="index">
    <HeadNav></HeadNav>
    <LeftMenu></LeftMenu>

    <div class="rightContainer">
      <div class="tittle">
        <template v-for=" (item, index) in matched">
          <i class="el-icon-arrow-right" v-if="item.path!='/index'"></i>
          <i v-if="item.path!='/index'" @click="toRoute(item)" class='hoverRed'>{{item.name}}</i>
        </template>
      </div>
      <router-view v-on:changeTopTitle="changeTopTitle"></router-view>
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
      matched: this.$route.matched
    };
  },
  created() {

  },
  methods: {
    toRoute(item) {
      this.$router.push(item.path);
    },
    changeTopTitle(){
      this.matched=this.$route.matched;
    }
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
  margin-bottom: 20px;
  padding-bottom: 10px;
}
.rightContainer {
  position: fixed;
  top: 70px;
  left: 190px;
  z-index: 99;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 100%;
  height: 100%;
  padding: 10px;
}
.router-link-active {
  text-decoration: none;
}
.hoverRed{
cursor:pointer;
}
</style>

