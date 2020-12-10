import React, { useEffect, useMemo } from 'react';
import { Layout } from 'antd'
import classNames from 'classnames'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import routes, { IRoute } from '../../../routes/routemap'
import { flattenRoutes } from '../../../utils/utils'
import Transition from '../../../components/Transition'

const { Content } = Layout

interface IProps {
  className?: string
  style?: React.CSSProperties
}

const ContentComp: React.FC<IProps> = (props) => {
  const classes = classNames(props.className)
  const location = useLocation()

  const flattenedRoutes = useMemo(() => {
    return flattenRoutes(routes)
  }, [routes])

  return (
    <Content className={classes} style={props.style}>
      <Transition key={location.pathname} in={true} animation='zoom-in-left' timeout={200}>
        <Switch>
          <Redirect exact from='/' to='/dashboard'/>
          {
            flattenedRoutes.map(route => {
              return (
                <Route 
                  path={route.path}
                  key={route.path}
                  component={route.component}
                />
              )
            })
          }

        </Switch>
      </Transition>
    </Content>
  )
}

export default ContentComp