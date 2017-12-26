import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import main from '@/layout/main'

import home from '@/pages/home/home'
import stat from '@/pages/statistics/stat'
import account from '@/pages/account/account'

import home1 from '@/pages/home/children/home1'
import home2 from '@/pages/home/children/home2'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  strict: process.env.NODE_ENV !== 'production',
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
      children: [
        {
          path: '/home',
          name: 'home',
          component: home,
          meta: {keepAlive: true},
          children: [
            { path: 'home1', name: 'home1', component: home1 },
            { path: 'home2', name: 'home2', component: home2 }
          ]
        },
        {
          path: '/stat',
          name: 'stat',
          meta: {keepAlive: true},
          component: stat
        },
        {
          path: '/account',
          name: 'account',
          meta: {keepAlive: true},
          component: account
        }
      ]
    },
    { path: 'login', name: 'login', title: '登录' }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})
