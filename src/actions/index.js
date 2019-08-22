import * as types from '../actionTypes'

export const selectNode = node => ({
  type: types.SELECT_NODE,
  node
})

export const selectCacheNode = node => ({
  type: types.SELECT_CACHE_NODE,
  node
})

export const moveToCache = dispatch => ({
  type: types.MOVE_TO_CACHE,
  dispatch
})

export const reset = () => ({
  type: types.RESET
})

export const setCache = cache => ({
  type: types.SET_CACHE,
  cache
})

export const openModal = settings => ({
  type: types.OPEN_MODAL,
  settings
})

export const closeModal = () => ({
  type: types.CLOSE_MODAL
})

export const addNewElement = value => ({
  type: types.ADD_NEW_ELEMENT,
  value
})

export const editElement = value => ({
  type: types.EDIT_NEW_ELEMENT,
  value
})

export const incrementId = () => ({
  type: types.INCREMENT_ID
})

export const deleteElement = (id, parentPath) => ({
  type: types.DELETE,
  id,
  parentPath
})

export const apply = () => ({
  type: types.APPLY
})

export const setDataBase = db => ({
  type: types.SET_DATA_BASE,
  db
})
