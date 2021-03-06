import * as types from '../actionTypes'
const initialState = {
  cache: {},
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
    case types.RESET:
      return {
        ...state,
        cache: {},
        selectedCacheNode: {},
      }
    default:
      return state
  }
}
