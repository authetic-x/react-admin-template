import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom'
import { Layout, Dropdown, Menu, Avatar, Modal } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, CaretDownFilled } from '@ant-design/icons'
import { toggleSidebar } from '../../../store/actions/app'
import { logout } from '../../../store/actions/user'
import { connect } from 'react-redux'
import BreadCrumb from '../components/BreadCrumb'
import Fullscreen from '../components/FullScreen'
import SettingPanel from '../components/SettingPanel'
import './index.scss'

const { Header } = Layout

const AVATAR_URL = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'

const HeaderComp: React.FC = (props: any) => {
  const { sidebarOpened, toggleSidebar } = props

  const location = useLocation()
  const history = useHistory()

  const handleLogout = () => {
    Modal.confirm({
      title: 'Logout',
      content: 'Are you sure to logout?',
      okText: 'YES',
      cancelText: 'NO',
      onOk: () => {
        props.logout().then(() => {
          console.log('logout redirect')
          history.replace('/')
        })
      }
    })
  }

  const menu = (
    <Menu>
      <Menu.Item key='dashboard'>
        <Link to='/dashboard'>Dashboard</Link>
      </Menu.Item>
      <Menu.Item key='project'>
        <a href="https://github.com/authetic-x" target='_blank'>
          Project
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='logout' onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  )

  return (
    <Header className="header">
      {
        React.createElement(sidebarOpened ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => toggleSidebar(),
        })
      }

      <BreadCrumb />
      <div className="right-menu">
        <Fullscreen />
        <SettingPanel />
        <div className="dropdown-wrapper">
          <Dropdown overlay={menu}>
            <div>
              <Avatar src={AVATAR_URL} size='default' shape='square'/>
              <CaretDownFilled className='caret-icon'/>
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  )
}

const mapStateToProps = (state: any) => {
  return {
    ...state.app,
    ...state.user
  }
}

const HeaderCompWrapper = connect(mapStateToProps, { toggleSidebar, logout })(HeaderComp)

export default HeaderCompWrapper