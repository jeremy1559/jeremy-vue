<template>
  <div class="hello">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card">
          <h1>{{ msg }}</h1>
        </el-card>
      </el-col>
      <v-test ref="test" :message="msg"></v-test>
      <el-col :span="6">
        <el-input ref="aaa" v-model="msg" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-button type="primary" round @click="getMsg()">按钮</el-button>
    <el-button type="primary" round @click="getref()">按钮</el-button>
  </div>
</template>

<script>
import Test from "../components/Test.vue";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Hello Vue!!!"
    };
  },
  methods: {
    getMsg() {
      //获取子组件值
      alert(this.$refs.test.msg);
    },
    getref() {
      alert(this.$refs.aaa.value);
      //vue-resource传值
      this.$http.get(this.$apiUrl).then(
        response => {
          console.log(response);
        },
        response => {
          console.log("出错了");
        }
      );
    }
  },
  mounted() {
    console.log("================>" + this.$route.params.id);
  },
  components: {
    "v-test": Test
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
