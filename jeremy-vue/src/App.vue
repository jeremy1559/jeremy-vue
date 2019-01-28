<template>
  <div id="app">
    <router-link to="/helloWorld">HelloWorld</router-link>
    <router-link to="/test">Test</router-link>
    <!-- 动态路由页面 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
</style>
