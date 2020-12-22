import {
  IFTagsViewState,
  IFTagsViewAction
} from '../types'
import { Reducer } from 'react'

const initialState: IFTagsViewState = {
  tagsList: []
}

const tagsView: Reducer<IFTagsViewState, IFTagsViewAction> = (state = initialState, action) => {
  switch(action.type) {
    case 'TAGSVIEW_ADD_TAG':
      return state
    default:
      return state
  }
}

export default tagsView