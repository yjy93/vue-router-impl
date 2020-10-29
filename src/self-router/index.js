import {install, _Vue} from "./install"
import createMatcher from "./create-matcher"
import HashHistory from "./history/hash"
import BrowserHistory from "./history/history"

// VueRouter 类

/** 路由的核心原理就是 根据路径返回对应的组件 */
export default class VueRouter {
  constructor(options) {
    // 根据用户的配置 options, 生成一个映射表, 稍后跳转时,根据路径找到对应的组件来进行渲染.
    // 创建匹配器后, 核心的方法就是 匹配
    // match addRoutes
    this.matcher = createMatcher(options.routes || []);
    // 根据当前的 mode 创建不同的 history 管理策略
    switch (options.mode) {
      case 'hash':
        this.history = new HashHistory(this)
        break;
      case'history':
        this.history = new BrowserHistory(this)
        break;
    }

  }

  // VueRouter 的 init 方法
  init(app) { // app 是当前 SPA 应用的 根实例
    // 路由初始化
    console.log('init');
    // 初始化后, 需要先根据路径, 做一次匹配, 后续根据 hash 值的变化,再次匹配
    const history = this.history; // history 实例
    const setupHashListener = () => {
      history.setupListener(); // 监听 hash 变化
    }
    history.transitionTo(history.getCurrentLocation(), setupHashListener); // 跳转到哪里

  }
}
VueRouter.install = install

