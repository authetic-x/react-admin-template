import * as types from '../types'

type SettingData = {
  key: keyof types.IFSettingState
  value: boolean
}

export const toggleSettings = (data: SettingData): types.IFSettingAction => {
  return {
    type: types.SETTINGS_CHANGE_SETTINGS,
    ...data
  }
}