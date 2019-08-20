import * as types from '../actionTypes'
import { getTree } from './helper'

const db = getTree()

const initialState = {
  dataBase: db,
  selectedNode: {},
  nextId: 100
}

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.SELECT_NODE:
      return {
        ...state,
        selectedNode: { ...action.node, children: {} }
      }
    case types.RESET:
      return {
        ...state,
        selectedNode: {},
        dataBase: db,
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
