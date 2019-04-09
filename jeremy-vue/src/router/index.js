import Vue from 'vue'
import Router from 'vue-router'
import { MessageBox } from 'element-ui';

import index from '@/views/index.vue'
import nofind from '@/views/404.vue'
import register from '@/views/register.vue'
import login from '@/views/login.vue'
import home from '@/views/home/home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name:'首页', redirect: '/index',},
    { path: '/register',name: '注册页面',component: register},
    { path: '/login',name: '登陆页面', component: login }, 
    
    { path: '/index',
      name: 'index', 
      component: index,
      children:[{
        path: '/home',
        name: '首页',
        component: home,
      }]
    }, 
    {
      path: '*',
      name: '404',
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
    const user =sessionStorage.getItem("user");
    if (user) {
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
