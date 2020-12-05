import { getToken } from '../../utils/auth'
import {
  IFUserAction,
  IFUserState
} from '../types'

const initUserInfo: IFUserState = {
  name: '',
  role: '',
  avatar: '',
  token: getToken()!
}

export default function user(state: IFUserState = initUserInfo, action: IFUserAction): IFUserState {
  switch(action.type) {
    case 'USER_SET_USER_INFO':
      return {
        ...state,
        name: action.name || '',
        role: action.role || '',
        avatar: action.avatar || ''
      }
    case 'USER_SET_USER_TOKEN':
      return {
        ...state,
        token: action.token || ''
      }
    case 'USER_RESET_USER':
      return {
        name: '',
        role: '',
        avatar: '',
        token: ''
      }
    default:
      return state
  }
}