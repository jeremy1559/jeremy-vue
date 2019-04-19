import Vue from 'vue'
import Router from 'vue-router'
import { MessageBox } from 'element-ui';

import index from '@/views/index.vue'
import nofind from '@/views/404.vue'
import register from '@/views/register.vue'
import login from '@/views/login.vue'
import home from '@/views/home/home.vue'
import user from '@/views/setting/user.vue'
import company from '@/views/setting/company.vue'
import role from '@/views/setting/role.vue'
import permission from '@/views/setting/permission.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: '首页', redirect: '/home', },
    { path: '/register', name: '注册页面', component: register },
    { path: '/login', name: '登陆页面', component: login },

    {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/home',
        name: '首页',
        component: home,
      },
      {
        path: '/user',
        name: '系统管理',
        children: [
          {
            path: '/user',
            name: '用户管理',
            component: user,
          },
          {
            path: '/company',
            name: '公司管理',
            component: company,
          }, {
            path: '/role',
            name: '角色管理',
            component: role,
          }, {
            path: '/permission',
            name: '权限管理',
            component: permission,
          }]
      }



      ]
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
  console.log('请求页面==>>' + to.path);
  if (to.path == "/login" || to.path == '/register' || to.path == '/nofind') {
    next();
  } else {
    const user = sessionStorage.getItem("user");
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
