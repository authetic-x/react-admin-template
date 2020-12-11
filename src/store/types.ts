export type rootState = {
  user: IFUserState,
  app: IFAppState
}

// actionType types
export const USER_SET_USER_TOKEN = "USER_SET_USER_TOKEN";
export const USER_SET_USER_INFO = "USER_SET_USER_INFO";
export const USER_RESET_USER_TOKEN = "USER_RESET_USER_TOKEN";

// app
export const APP_TOGGLE_SIDEBAR = "APP_TOGGLE_SIDEBAR";
export const APP_TOGGLE_SETTINGPANEL = "APP_TOGGLE_SETTINGPANEL";

// settings
export const SETTINGS_CHANGE_SETTINGS = "SETTINGS_CHANGE_SETTINGS";

// tagsView
export const TAGSVIEW_ADD_TAG = "TAGSVIEW_ADD_TAG";
export const TAGSVIEW_DELETE_TAG = "TAGSVIEW_DELETE_TAG";
export const TAGSVIEW_EMPTY_TAGLIST = "TAGSVIEW_EMPTY_TAGLIST";
export const TAGSVIEW_CLOSE_OTHER_TAGS = "TAGSVIEW_CLOSE_OTHER_TAGS";

// monitor
export const BUG_ADD_BUG = "BUG_ADD_BUG";

// action types
export interface IFAppAction {
  type: typeof APP_TOGGLE_SIDEBAR | typeof APP_TOGGLE_SETTINGPANEL
  [index: string]: any
}

export interface IFUserAction {
  type: typeof USER_SET_USER_TOKEN | typeof USER_SET_USER_INFO | typeof USER_RESET_USER_TOKEN
  [index: string]: any
}

export interface IFAuthAction {
  type: typeof APP_TOGGLE_SIDEBAR | typeof APP_TOGGLE_SETTINGPANEL
}

export interface IFSettingAction {
  type: typeof SETTINGS_CHANGE_SETTINGS
  key: keyof IFSettingState
  value: boolean
}

// state types
export interface IFAppState {
  sidebarOpened: boolean
  settingPanelOpened: boolean
}

export interface IFUserState {
  name: string,
  role: string,
  avatar: string,
  token: string
}

export interface IFSettingState {
  sidebarLogo: boolean,
  fixedHeader: boolean,
  tagsView: boolean
}
