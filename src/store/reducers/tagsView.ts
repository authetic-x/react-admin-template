import {
  IFTagsViewState,
  IFTagsViewAction
} from '../types'
import { Reducer } from 'react'
import { stat } from 'fs'

const initialState: IFTagsViewState = {
  tagsList: []
}

const tagsView: Reducer<IFTagsViewState, IFTagsViewAction> = (state = initialState, action) => {
  switch(action.type) {
    case 'TAGSVIEW_ADD_TAG':
      const hasTag = state.tagsList.some(tag => tag.path === action.tag?.path)
      if (!hasTag && action.tag) {
        return {
          tagsList: [...state.tagsList, action.tag]
        }
      }
      return state
    case 'TAGSVIEW_CLOSE_OTHER_TAGS':
      return {
        tagsList: state.tagsList.filter(tag => tag.path === action.path)
      }
    case 'TAGSVIEW_DELETE_TAG':
      const newTagList = state.tagsList.filter(tag => tag.path !== action.path)
      return {
        tagsList: newTagList
      }
    case 'TAGSVIEW_EMPTY_TAGLIST':
      return {
        tagsList: []
      }
    default:
      return state
  }
}

export default tagsView