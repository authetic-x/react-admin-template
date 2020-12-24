import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import Sider from './Sider'
import './index.scss'
import { connect } from 'react-redux'
import Header from './Header'
import Content from './Content'
import TagsView from './components/TagsView'

const { Footer } = Layout

const LayoutComponent: React.FC = (props: any) => {
  const { sidebarOpened } = props

  useEffect(() => {
    console.log(props.tagsView)
  })

  return (
    <Layout>
      <Sider collapse={sidebarOpened}/>
      <Layout>
        <Header />
        { props.tagsView ? <TagsView /> : null }
        <Content
          className="content"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        />
        <Footer style={{ textAlign: 'center' }}>Openup-admin ©2020 Created by Ethan Hsu</Footer>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = (state: any) => ({
  ...state.app,
  ...state.settings,
})

const LayoutComponentWrapper = connect(mapStateToProps, {})(LayoutComponent)

export default LayoutComponentWrapper