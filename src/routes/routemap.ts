import React, { Children } from 'react';
import Loadable from 'react-loadable'
import Loading from '../components/Loading'

const Dashboard = Loadable({ loader: () => import(/*webpackChunkName: 'Dashboard'*/'../views/layout'), loading: Loading })

type Role = 'admin' | 'editor' | 'guest'

export interface IRoute {
  path: string
  // TODO: add right type check
  component: any
  title: string
  roles?: Role[]
  icon?: string
  children?: IRoute[]
}

const routes: IRoute[] = [
  { path: '/dashboard', title: 'Dashboard', component: Dashboard, roles: ['admin', 'editor', 'guest']},
  { path: '/doc', title: 'Doc', component: Dashboard, roles: ['admin', 'editor', 'guest']},
  { path: '/guide', title: 'Guide', component: Dashboard, roles: ['admin', 'editor', 'guest']},
  { path: '/permission', title: 'Permission', component: Dashboard, roles: ['admin', 'editor', 'guest'],
    children: [
      {
        path: 'permission/admin',
        title: 'Admin Page',
        component: Dashboard
      },
      {
        path: 'permission/editor',
        title: 'Editor Page',
        component: Dashboard
      }
    ]
  },
  { path: '/components', title: 'Components', component: Dashboard, roles: ['admin', 'editor', 'guest']},
  { path: '/charts', title: 'Charts', component: Dashboard, roles: ['admin', 'editor', 'guest']},
  { path: '/nested', title: 'Nested', component: Dashboard, roles: ['admin', 'editor', 'guest']},
  { path: '/table', title: 'Table', component: Dashboard, roles: ['admin', 'editor', 'guest']},
  { path: '/excel', title: 'Excel', component: Dashboard, roles: ['admin', 'editor', 'guest']},
  { path: '/zip', title: 'Zip', component: Dashboard, roles: ['admin', 'editor', 'guest']},
  { path: '/clipboard', title: 'Clipboard', component: Dashboard, roles: ['admin', 'editor', 'guest']},
  { path: '/about', title: 'About', component: Dashboard, roles: ['admin', 'editor', 'guest']},
  { path: '/error', title: 'Error', component: Dashboard, roles: ['admin', 'editor', 'guest']}
]

export default routes