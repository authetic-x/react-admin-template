import * as types from '../types'

export const toggleSidebar = (): types.IFAppAction => {
  return {
    type: types.APP_TOGGLE_SIDEBAR
  }
}

export const toggleSettingPanel = (): types.IFAppAction => {
  return {
    type: types.APP_TOGGLE_SETTINGPANEL
  }
}