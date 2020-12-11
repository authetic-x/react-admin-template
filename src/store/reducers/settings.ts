import * as types from '../types'

const initialState: types.IFSettingState = {
  sidebarLogo: true,
  fixedHeader: true,
  tagsView: true
}

//NOTE: state为引用，想要组件更新必须返回一个新的state
export default function settings(state: types.IFSettingState = initialState, action: types.IFSettingAction) {
  switch(action.type) {
    case types.SETTINGS_CHANGE_SETTINGS:
      const { key, value } = action
      if (key && (state as Object).hasOwnProperty(key)) {
        return {
          ...state,
          [key]: value
        }
      }
      return state
    default:
      return state
  }
}