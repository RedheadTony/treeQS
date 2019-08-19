import * as types from '../actionTypes'
const initialState = {
  IsOpen: false,
  title: '',
  text: '',
  actions: []
}

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
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
    default:
      return state
  }
}
