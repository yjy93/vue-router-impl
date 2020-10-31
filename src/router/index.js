import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '@/self-router/index'
import Home from '../views/Home.vue'
import About from '../views/About'

/**
 * Vue.use = function(plugin,options){
 *   plugin.install(this,options)
 * }
 */

Vue.use(VueRouter, {
  name: '传给 install 方法的参数'
}) // Vue.use() API

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    children: [
      {
        path: 'a',
        component: {
          render(h) {
            return <h1>hello a</h1>
          }
        }
      },
      {
        path: 'b',
        component: {
          render(h) {
            return <h1>hello b</h1>
          }
        }
      },
    ],
  }
]

// vueRouter 是一个构造函数 前端路由实现 1. hash 模式 2. history
// 当前都叫 spa 应用, 路径切换可以重新渲染组件 (不刷新页面)
// hash 特点丑 兼容性好 location.hash = 'xx' window.addEventListener('hashchange')
// history 漂亮像正常的路径一样, 但是需要服务端支持 history-fallback
// history / window.addEventListener('popstate')

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(123123);
})

export default router
