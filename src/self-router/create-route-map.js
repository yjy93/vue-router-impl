/**
 * @param routes
 * @param oldPathMap
 */
export default function createRouteMap(routes, oldPathMap) {
  // 1. 一个参数是 初始化
  // 2. 两个参数是 动态添加路由
  let pathMap = oldPathMap || {};

  // routes
  routes.forEach((route) => {
    addRouteRecord(route, pathMap, null)
  })
  return {pathMap}
}

// pathMap = {路径:对应记录}
function addRouteRecord(route, pathMap, parent) {
  // 要判断儿子的路径不是以 / 开头的, 否则不拼接父路径
  let path = parent ? parent.path + '/' + route.path : route.path
  let record = {
    path: route.path,
    parent, // parent 指代的是父记录
    component: route.component,
    name: route.name,
    props: route.props,
    params: route.params || {},
    meta: route.meta,
  }
  // 如果没有 路由路径及映射, 则构建映射关联
  if (!pathMap[path]) {
    pathMap[path] = record
  }
  if (route.children) {
    route.children.forEach((childRoute) => { // 没有孩子就停止遍历, 有孩子就递归遍历
      addRouteRecord(childRoute, pathMap, record)
    })
  }
}
