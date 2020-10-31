import History from './base'

export default class BrowserHistory extends History {
  constructor(router) {
    super(router)
  }

  getCurrentLocation() {
    return window.location.pathname
  }

  setupListener() {
    // 监听 popstate 实现, 进行路由跳转
    window.addEventListener('popstate', () => {
      // 监听路径变化(浏览器的前进后退可以监听到), 进行跳转
      this.transitionTo(this.getCurrentLocation())
    })
  }

  // history.push方法
  push(location) {
    this.transitionTo(location, () => {
      // 跳转时,采用的就是h5 的API, 这里的切换,不会调用 popstate
      window.history.pushState({}, null, location)
    });// 可以去匹配视图
  }
}

// vue-router 中的导航守卫 核心就是把所有方法,组合成一个数组, 依次调用

