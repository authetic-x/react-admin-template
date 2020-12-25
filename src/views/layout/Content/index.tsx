import React, { useEffect, useMemo } from 'react';
import { Layout } from 'antd'
import classNames from 'classnames'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import routes, { IRoute } from '../../../routes/routemap'
import { flattenRoutes } from '../../../utils/utils'
import Transition from '../../../components/Transition'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

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

  //TODO: Add animation for component switch
  return (
    <Content className={classes} style={props.style}>
      <TransitionGroup>
        <CSSTransition key={location.pathname} timeout={500} classNames='fade' exit={false}>
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
        </CSSTransition>
      </TransitionGroup>
    </Content>
  )
}

export default ContentComp