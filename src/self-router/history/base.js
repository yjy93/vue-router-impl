/**
 * @param record
 * @param location 路径
 */

export function createRoute(record, location) {
  let res = [];

  // 先 /about  再 /about/a
  if (record) {
    while (record) {
      res.unshift(record)
      record = record.parent
    }
  }
  return {
    ...location,
    matched: res,
  }
}

// 执行勾子
function runQueue(queue, iterator, cb) {
  function next(index) {
    if (index >= queue.length) {
      return cb() // 一个勾子都没有,或者勾子全部执行完毕, 直接调用 cb 完成渲染即可
    } else { // 如果存在勾子函数, 则执行下面逻辑
      let hook = queue[index]
      iterator(hook, () => {
        next(index + 1)
      })
    }
  }

  next(0)
}


export default class History {
  // router 为 VueRouter 实例
  constructor(router) {
    this.router = router

    // 最终核心 需要经 current 属性变化成响应式的, 后续 current 变化会更新视图
    // /about/a => 匹配 about 和 a 两条记录
    this.current = createRoute(null, {
      path: '/'
    })
  }

  // 默认会先执行一次
  // 根据路径进行组件渲染 数据变化,想要更新视图 响应式处理路由
  transitionTo(location, onComplete) {
    // 根据跳转的路径, 获取匹配的记录
    let route = this.router.match(location);

    let queue = [].concat(this.router.beforeEachHooks);

    // 迭代函数
    const iterator = (hook, cb) => {
      /**
       * route: 表示 to
       * this.current: 表示 from
       * cb: 表示用户手动调用 next() 方法放行
       */
      hook(route, this.current, cb)
    }

    runQueue(queue, iterator, () => {
      this.current = route
      this.cb && this.cb(route);
      onComplete && onComplete() // onComplete 调用后, hash 值变化了, 会再次调用 transitionTo
    })
  }

  // 监听路由
  listen(cb) {
    this.cb = cb;
  }
}
