import React from 'react';
import { Layout } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { toggleSidebar } from '../../../store/actions/app'
import { connect } from 'react-redux'
import BreadCrumb from '../components/BreadCrumb'
import Fullscreen from '../components/FullScreen'
import './index.scss'

const { Header } = Layout

const HeaderComp: React.FC = (props: any) => {
  const { sidebarOpened, toggleSidebar } = props

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
      </div>
    </Header>
  )
}

/* const mapDispatchToProps = (dispatch: Function) => {
  return {
    toggle_sidebar: () => dispatch(toggleSidebar())
  }
} */

const HeaderCompWrapper = connect((state: any) => state.app, { toggleSidebar })(HeaderComp)

export default HeaderCompWrapper