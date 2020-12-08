import React from 'react';
import { Layout } from 'antd'
import classNames from 'classnames'

const { Content } = Layout

interface IProps {
  className?: string
  style?: React.CSSProperties
}

const ContentComp: React.FC<IProps> = (props) => {
  const classes = classNames(props.className)

  const renderRoutes = () => {

  }

  return (
    <Content className={classes} style={props.style}>
      Content
    </Content>
  )
}

export default ContentComp