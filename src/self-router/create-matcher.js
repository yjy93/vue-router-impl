import createRouteMap from "./create-route-map"
import {createRoute} from "./history/base"

export default function createMatcher(routes) {

  // 规则 {/:Home,/about:About}
  let {pathMap} = createRouteMap(routes)// 根据用户的配置,创建一个映射表


  // 动态添加路由映射关系, 就可以实现动态路由了
  function addRoutes(routes) {
    createRouteMap(routes, pathMap)
  }

  // 匹配器中匹配路由的 match 方法
  function match(path) {// 给我个路径, 可以匹配路由
    let record = pathMap[path]
    return createRoute(record, {// {path:/,matche:[{},{}]
      path
    })
  }

  return {
    addRoutes,
    match
  }
}
