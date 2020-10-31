// 需要将 install 方法单独拆分
export let _Vue
import RouterLink from './components/router-link'
import RouterView from './components/router-view'

/**
 * install 方法, 在 Vue.use(VueRouter) 的时候, 调用这个 install 方法, 做了相关的处理
 *  比如: 在Vue.prototype 上 定义了 $route 和 $router 等方法
 *  全局注册了 router-link 和 router-view 两个组件
 */
export function install(Vue, options) {
  _Vue = Vue

  // 我需要将 当前根实例 提供的router 属性, 共享给所有子组件

  // 给所有子组件都混入 vue router 方法
  Vue.mixin({
    beforeCreate() { // mixin 中, 每个组件都会混入 beforeCreate 方法
      // 获取到 每个组件的实例, 给实例添加属性
      // 我们要做的就是, 把根组件的 router 给了每一个子组件
      if (this.$options.router) {
        //如果是 跟组件, 给 根组件加上一个属性 _routerRoot,
        // 把根实例 this 赋值给 _routerRoot, 这样子组件也可以 拿到 _routerRoot
        this._routerRoot = this;
        this._router = this.$options.router
        // this._router 路由的实例 new VueRouter 的实例
        // 这里的参数 this 指的是 根实例
        this._router.init(this) // this._router就等于 跟实例中的 router 配置, 调用 VueRouter 的 init 方法
        // 把 history 中的 current 对象变成响应式数据
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        // 子孙组件, 也获取到 _routerRoot
        // this._routerRoot 指向了当前 根组件的实例
        this._routerRoot = this.$parent && this.$parent._routerRoot
        // this._routerRoot._router
      }
    }
    // 根 => 父亲(属性) => 儿子(属性) => 孙子(属性)
  })
  Object.defineProperty(Vue.prototype, '$route', {
    get() {// 所有组件 取 $route的时候,都从 _routerRoot._route中获取
      // $route 里面放的是current 对象, 里面放的都是 属性
      return this._routerRoot._route
    }
  })
  Object.defineProperty(Vue.prototype, '$router', {
    get() {// 所有组件 取 $route的时候,都从 _routerRoot._route中获取
      return this._routerRoot._router; // addRoute match 等方法
    }
  })

  Vue.component('router-link', RouterLink)
  Vue.component('router-view', RouterView)
}
