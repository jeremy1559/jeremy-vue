// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// 引入UI组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './css/ico/iconfont.css';
//引入资源请求插件
import VueResource from 'vue-resource'
import axios from './utils/http.js'
import URL from './utils/URL.js'

import store from './store'
import router from './router'
import App from './App'


//使用VueResource插件
Vue.use(VueResource)
//使用UI组件
Vue.use(ElementUI);

Vue.prototype.$axios=axios;
Vue.prototype.$URL=URL;

/* 新建了一个实例*/
new Vue({
  //提供挂载元素
  el: '#app',
  //vuex
  store,
  //路由
  router,
  //模板
  components: { App },
  //组件
  template: '<App/>'
})
