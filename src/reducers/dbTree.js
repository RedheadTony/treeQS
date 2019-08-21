import * as types from '../actionTypes'
import { getTree2 } from './helper'

const { tree, nextId } = getTree2()
console.log('tree')
console.log(tree)

const initialState = {
  dataBase: tree,
  selectedNode: {},
  nextId
}

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.SELECT_NODE:
      return {
        ...state,
        selectedNode: action.node
      }
    case types.RESET:
      return {
        ...state,
        selectedNode: {},
        dataBase: tree
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
    default:
      return state
  }
}
