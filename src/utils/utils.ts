import { IRoute } from "src/routes/routemap";


export function flattenRoutes(routes: IRoute[], withParent?: boolean): IRoute[] {
  const resRoutes: IRoute[] = []
  routes.forEach(route => {
    if (route.children) {
      if (withParent) {
        resRoutes.push(route)
      }
      resRoutes.push(...flattenRoutes(route.children))
    } else {
      resRoutes.push(route)
    }
  })
  return resRoutes
}