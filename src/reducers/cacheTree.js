import * as types from '../actionTypes'
const initialState = {
  cache: {},
  addedToCacheIds: [],
  deletedElementsIds: [],
  selectedCacheNode: {}
}

export default function cacheReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SELECT_CACHE_NODE:
      return {
        ...state,
        selectedCacheNode: { ...action.node, children: {} }
      }
    case types.SET_CACHE:
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
        cache: {},
        addedToCacheIds: [],
        selectedCacheNode: {},
        deletedElementsIds: []
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
