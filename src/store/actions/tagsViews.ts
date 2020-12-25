import * as types from '../types'

export const addTags = (tag: types.Tag): types.IFTagsViewAction => {
  return {
    type: types.TAGSVIEW_ADD_TAG,
    tag
  }
}

export const deleteTag = (path: string): types.IFTagsViewAction => {
  return {
    type: types.TAGSVIEW_DELETE_TAG,
    path
  }
}

export const closeOtherTags = (path: string): types.IFTagsViewAction => {
  return {
    type: types.TAGSVIEW_CLOSE_OTHER_TAGS,
    path
  }
}

export const closeAllTags = (): types.IFTagsViewAction => {
  return {
    type: types.TAGSVIEW_EMPTY_TAGLIST
  }
}