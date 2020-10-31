import History from './base'

function ensureSlash() {
  if (window.location.hash) {
    return
  }
  window.location.hash = "/"
}

function getHash() {
  return window.location.hash.slice(1)
}

export default class HashHistory extends History {
  // router 参数为 new HashHistory 时传递过来的 VueRouter 实例
  constructor(router) {
    super(router)

    // 默认 hash 模式需要加 #/
    ensureSlash()
  }

  setupListener() { // 监听
    // hash 的性能不如 popstate 好用, 监听浏览器历史记录的变化
    window.addEventListener('hashchange', () => {
      // 根据当前hash值去匹配对应的组件
      this.transitionTo(getHash())
    })
  }

  getCurrentLocation() {
    return getHash()
  }

  // history.push()
  push(location) {
    console.log(123123123, location);
    window.location.hash = location

  }

  // hash 模式的核心功能就是监听 hash 值的变化 window.addEventListener('hashchage')
}
