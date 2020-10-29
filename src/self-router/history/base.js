export default class History {
  // router 为 VueRouter 实例
  constructor(router) {
    this.router = router
  }

  // 默认会先执行一次
  transitionTo(location, cb) {
    console.log(location, 444); // match路径
    cb && cb() // cb 调用后, hash 值变化了, 会再次调用 transitionTo
  }
}
