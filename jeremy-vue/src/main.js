// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
/*引入资源请求插件*/
import VueResource from 'vue-resource'

/*使用VueResource插件*/
Vue.use(VueResource)

/* 新建了一个实例*/
new Vue({
  //提供挂载元素
  el: '#app',
  //路由
  router,
  //模板
  components: { App },
  //组件
  template: '<App/>'
})
