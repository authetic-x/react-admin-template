import {
  IFAppState,
  IFAppAction
} from '../types'
import { Reducer } from 'redux'

const initState: IFAppState = {
  sidebarOpened: false,
  settingPanelOpened: false
}

const app: Reducer<IFAppState, IFAppAction> = (state = initState, action) => {
  switch(action.type) {
    case 'APP_TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarOpened: !state.sidebarOpened
      }
    case 'APP_TOGGLE_SETTINGPANEL':
      return {
        ...state,
        settingPanelOpened: !state.settingPanelOpened
      }
    default:
      return state
  }
}

export default app