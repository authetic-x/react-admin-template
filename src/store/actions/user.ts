import { ThunkAction } from 'redux-thunk'
import * as types from '../types'

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
  return {
    type: types.USER_RESET_USER
  }
}