<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <v-test></v-test>
    <input type="text" ref="aaa" v-model="msg">
    <button @click="getMsg()">按钮</button>
    <button @click="getref()">按钮</button>
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
      alert(this.msg);
    },
    getref() {
      alert(this.$refs.aaa.value);
    }
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
