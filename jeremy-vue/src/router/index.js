import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index.vue'
import nofind from '../views/404.vue'
import register from '../views/register.vue'
import login from '../views/login.vue'
import store from '../store'
import { MessageBox } from 'element-ui';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index',
    }, {
      path: '/index',
      name: 'index',
      component: index
    }, {
      path: '/register',
      name: 'register',
      component: register
    }, {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '*',
      name: 'nofind',
      component: nofind
    },

  ]
});

//路由守卫
router.beforeEach((to, from, next) => {
  console.log('请求页面==>>'+to.path);
  if (to.path == "/login" || to.path == '/register' || to.path == '/nofind') {
    next();
  } else {
    const token = store.getters.accessToken;
    if (token) {
      next();
    } else {
      MessageBox.confirm('未找见您的登陆信息，是否重新登陆?', '登陆提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //确定
        next('/login')
      }).catch(() => {
        //取消
        next(false);
      });
    }

  }
});

export default router
