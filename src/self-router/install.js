// 需要将 install 方法单独拆分
export let _Vue

export function install(Vue, options) {
  _Vue = Vue

  // 我需要将 当前根实例 提供的router 属性, 共享给所有子组件

  // 给所有子组件都混入 vue router 方法
  Vue.mixin({
    beforeCreate() { // mixin 中, 每个组件都会混入 beforeCreate 方法
      // 获取到 每个组件的实例, 给实例添加属性
      // 我们要做的就是, 把根组件的 router 给了每一个子组件
      if (this.$options.router) {
        // 给 根组件加上一个属性 _routerRoot, 把根实例this复制给 _routerRoot, 这样子组件也可以 拿到 _routerRoot
        this._routerRoot = this;
        this._router = this.$options.router
        // this._router 路由的实例 new VueRouter 的实例
        // 这里的参数 this 指的是 根实例
        this._router.init(this)
      } else {
        // 子孙组件, 也获取到 _routerRoot
        // this._routerRoot 指向了当前 根组件的实例
        this._routerRoot = this.$parent && this.$parent._routerRoot
        // this._routerRoot._router
      }
    }
    // 根 => 父亲(属性) => 儿子(属性) => 孙子(属性)
  })
}
