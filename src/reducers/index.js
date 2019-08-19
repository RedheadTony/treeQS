import * as types from '../actionTypes'
import { db } from './helper'
const initialState = {
  dataBase: db,
  cache: {},
  selectedNode: {},
  addedToCacheIds: [],
  deletedElementsIds: [],
  IsOpen: false,
  title: '',
  text: '',
  actions: [],
  selectedCacheNode: {},
  nextId: 100
}

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.SELECT_NODE:
      console.log(action.node)
      return {
        ...state,
        selectedNode: { ...action.node, children: {} }
      }
    case types.SELECT_CACHE_NODE:
      console.log(action.node)
      return {
        ...state,
        selectedCacheNode: { ...action.node, children: {} }
      }
    case types.SET_CACHE:
      console.log(action)
      return {
        ...state,
        cache: action.cache
      }
    case types.ADD_ID:
      return {
        ...state,
        addedToCacheIds: [...state.addedToCacheIds, action.id]
      }
    case types.RESET:
      return {
        ...state,
        selectedNode: {},
        cache: {},
        dataBase: db,
        addedToCacheIds: [],
        selectedCacheNode: {},
        deletedElementsIds: []
      }
    case types.OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        title: action.settings.title || '',
        text: action.settings.text || '',
        actions: action.settings.actions || []
      }
    case types.CLOSE_MODAL:
      return {
        ...state,
        isOpen: false
      }
    case types.INCREMENT_ID:
      return {
        ...state,
        nextId: state.nextId + 1
      }
    case types.SET_DATA_BASE:
      return {
        ...state,
        dataBase: action.db
      }
    case types.DELETE:
      return {
        ...state,
        deletedElementsIds: [
          ...state.deletedElementsIds,
          state.selectedCacheNode.id
        ]
      }
    default:
      return state
  }
}
