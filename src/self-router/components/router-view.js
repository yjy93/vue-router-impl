/**
 * @author: Gene
 * @age: 永远18岁的美少年
 * @Email： Genejob@163.com
 * @date: 2020-10-31 20:45:34
 * @description: router-view 组件 -> 函数式组件, 函数可以节省性能,缺陷就是没有实例
 */

export default {
  // Vue 中 functional 函数式组件
  functional: true,
  name: 'router-view',
  render(h, {data, parent}) {
    let route = parent.$route; // 会做依赖收集了.
    let depth = 0;
    let records = route.matched
    data.routerView = true; // 渲染router-view 时, 标记它是一个 routerView
    // 看之前渲染过几个 router-view 先父组件, 再子组件
    while (parent) {
      // $vnode 表示的是 组件
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      parent = parent.$parent
    }
    let record = records[depth]
    if (!record) {
      return h()
    }
    return h(record.component, data)
  }
}

// 页面中有两个 router-view 分别是 app里的和 about里的 router-view



