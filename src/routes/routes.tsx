import React from 'react'

const Dashboard = React.lazy(() => import('../views/layout'))

export interface IFRouteBase {
  key: string,
  title: string,
  icon?: string,
  component?: React.FC,
  query?: string,
  requireAuth?: string,
  route?: string,
  requireLogin?: boolean
}

export interface IFRoute extends IFRouteBase {
  subs?: IFRoute[]
}

type Routes = {
  menus: IFRoute[],
  others: IFRoute[] | [],
  [index: string]: any
}

const routes: Routes = {
  menus: [
    {
      key: '/dashboard',
      title: 'Dashboard',
      component: Dashboard
    }
  ],
  others: []
}