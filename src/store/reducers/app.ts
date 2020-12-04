import {
  IFAppState,
  IFAppAction
} from '../types'

const initState: IFAppState = {
  sidebarOpened: false,
  settingPanelOpened: false
}

export default function app(state: IFAppState = initState, action: IFAppAction): IFAppState {
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