import { ThunkAction } from "redux-thunk";
import { IFUserAction, IFUserState } from "../types";


export const login = (username: string, password: string):
  ThunkAction<void, IFUserState, unknown, IFUserAction> => (dispatch) => {
  
}

export const logout = (token: string):
  ThunkAction<void, IFUserState, unknown, IFUserAction> => (dispatch) => {
  
}