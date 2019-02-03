<template>
  <div>
    <el-button type="danger" round @click="boss()">{{message}}</el-button>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      //获取夫组建值
      msg: '111',
      params: {
        id: "123"
      },
    };
  },
  methods: {
    boss() {
    
      this.$router.push({ name: "HelloWorld", params: this.params });
    }
  },
  props: ['message']
};
</script>

<style scoped>
</style>
