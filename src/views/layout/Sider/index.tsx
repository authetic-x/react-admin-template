import React from 'react';
import { Layout, Menu } from 'antd'
import { useLocation } from 'react-router-dom'
import routes, { IRoute } from '../../../routes/routemap'
import { Link } from 'react-router-dom'
import './index.scss'

const { Sider } = Layout
const { SubMenu } = Menu

interface SiderProps {
  collapse: boolean
}

const SiderComponent: React.FC<SiderProps> = (props) => {
  const location = useLocation()
  console.log(location.pathname)

  const renderMenuNodes = (routes: IRoute[]) => {
    return routes.map(route => {
      if (!route.children) {
        return (
          <Menu.Item key={route.path}>
            <Link to={route.path}>
              <span>{route.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu key={route.path} title={route.title}>
            {
              renderMenuNodes(route.children)
            }
          </SubMenu>
        )
      }
    })
  }

  return (
    <Sider className='sidebar' trigger={null} collapsible collapsed={props.collapse}>
      <div className='sidebar-wrapper'>
        <div className="logo">
          <h2 className='logo-title'>Openup</h2>
        </div>
        <div className='menu-container custom-scrollbar'>
          <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
            {
              renderMenuNodes(routes)
            }
          </Menu>
        </div>
      </div>
    </Sider>
  )
}

export default SiderComponent