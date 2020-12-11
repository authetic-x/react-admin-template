import { ThunkAction } from 'redux-thunk'
import * as types from '../types'
import { loginRequest, logoutRequest } from '../../api/login'
import { setToekn, removeToken } from 'src/utils/auth'

export const login = (username: string, password: string):
  ThunkAction<void, types.IFUserState, unknown, types.IFUserAction> => (dispatch) => {
  return new Promise((resolve, reject) => {
    loginRequest({ username, password })
      .then((res: any) => {
        console.log('login request in redux', res)
        if (res.status === 0) {
          const token = res.token
          setToekn(token)
          dispatch(setUserToken(token))
          resolve(res)
        } else {
          reject(res.message)
        }
      })
  })
}

export const logout = ():
  ThunkAction<void, types.IFUserState, unknown, types.IFUserAction> => (dispatch) => {
  return new Promise((resolve, reject) => {
    console.log('Send logout request')
    logoutRequest()
      .then((res: any) => {
        removeToken()
        //NOTE: 这里要调用resetUser函数，tm真实天坑
        dispatch(resetUser())
        resolve(res.message)
      })
  })
}

export const getUserInfo = (token: string): 
  ThunkAction<void, types.IFUserState, unknown, types.IFUserAction> => (dispatch) => {
  return new Promise((resolve, reject) => {
    //TODO: request user info
  })
}

export const setUserToken = (token: string): types.IFUserAction => {
  return {
    type: types.USER_SET_USER_TOKEN,
    token,
  }
}

export const setUserInfo = (userInfo: any): types.IFUserAction => {
  return {
    type: types.USER_SET_USER_INFO,
    ...userInfo
  }
}

export const resetUser = (): types.IFUserAction => {
  console.log('create action')
  return {
    type: types.USER_RESET_USER_TOKEN
  }
}