import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index.vue'
import nofind from '../views/404.vue'
import register from '../views/register.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index',
    },{
      path: '/index',
      name: 'index',
      component: index
    },{
      path: '/register',
      name: 'register',
      component: register
    },{
      path: '*',
      name: 'nofind',
      component: nofind
    },
    
  ]
})
