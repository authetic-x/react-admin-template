import React, { useState } from 'react'
import { Layout } from 'antd'
import Sider from './Sider'
import './index.scss'
import { connect } from 'react-redux'
import Header from './Header'

const { Content, Footer } = Layout

const LayoutComponent: React.FC = (props: any) => {
  const { sidebarOpened } = props

  return (
    <Layout>
      <Sider collapse={sidebarOpened}/>
      <Layout>
        <Header />
        <Content
          className="content"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
        </Content>
        <Footer style={{ textAlign: 'center' }}>Openup-admin ©2020 Created by Ethan Hsu</Footer>
      </Layout>
    </Layout>
  )
}

const LayoutComponentWrapper = connect((state: any) => state.app, {})(LayoutComponent)

export default LayoutComponentWrapper