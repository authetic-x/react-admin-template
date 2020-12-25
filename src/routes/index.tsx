import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from '../views/login'
import Layout from '../views/layout'
import { getUserInfo } from '../store/actions/user'
import { addTags } from '../store/actions/tagsViews'
import { rootState } from '../store/types'

const Router: React.FC = (props:any) => { 
  const { token, role, getUserInfo } = props

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route path='/'
          render={() => {
            if (!token) {
              return <Redirect to='/login'/>
            } else {
              /* if (!role) {
                return getUserInfo(token).then(() => <Layout />)
              } else {
                return <Layout />
              } */
              return <Layout />
            }
          }}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default connect((state: rootState) => ({...state.user, ...state.tagsView}), 
  { getUserInfo })(Router)