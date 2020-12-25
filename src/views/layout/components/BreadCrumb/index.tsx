import React from 'react';
import { Breadcrumb } from 'antd'
import routes, { IRoute } from '../../../../routes/routemap'
import { Link, useLocation } from 'react-router-dom'
import Transition from '../../../../components/Transition'
import './index.scss'

function flattenRoutes(routes: IRoute[]): IRoute[] {
  const resRoutes: IRoute[] = []
  routes.forEach(route => {
    if (route.children) {
      resRoutes.push(route)
      resRoutes.push(...flattenRoutes(route.children))
    } else {
      resRoutes.push(route)
    }
  })
  return resRoutes
}

const BreadCrum: React.FC = (props) => {
  const location = useLocation()

  const breadCrumbs: JSX.Element[] = []
  const pathnames = location.pathname.split('/').filter(i => i)
  const flattenedRoutes = flattenRoutes(routes)

  const pathToRoutes = pathnames.map(path => {
    return flattenedRoutes.find(route => route.path.includes(path))
  })
  if (pathToRoutes[0]?.title !== 'Dashboard') {
    pathToRoutes.unshift(routes.find(route => route.title === 'Dashboard'))
  }

  const renderBreadcrumbItems = () => {
    return pathToRoutes.map((route, i) => {
      if (i === pathToRoutes.length-1) {
        return (
          <Breadcrumb.Item key={route?.path}>
            <span>{route?.title}</span>
          </Breadcrumb.Item>
        )
      } else {
        return (
          <Breadcrumb.Item key={route?.path}>
            <Link to={route?.path!}>{route?.title}</Link>
          </Breadcrumb.Item>
        )
      }
    })
  }

  return (
    <Breadcrumb className='bread-crumb'>
      {renderBreadcrumbItems()}
    </Breadcrumb>
  )
}

export default BreadCrum