import * as types from '../actionTypes';
import {db} from './helper'
const initialState = {
    dataBase: db,
    cache: {},
    selectedNode: {}
}

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.SELECT_NODE:
            console.log(action.node)
            return {
                ...state,
                selectedNode: action.node
            };
        case types.MOVE_TO_CACHE: {
            const oldCache = state.cache
            const newCache = {
                ...oldCache,
                [state.selectedNode.id]: {...state.selectedNode, children: {}}
            }
            console.log('MOVE_TO_CACHE')
            console.log(newCache)

            return {
                ...state,
                selectedNode: {},
                cache: newCache
            };
        }
        case types.RESET:
            return {
                ...state,
                selectedNode: {},
                cache: {},
                dataBase: db
            };
        default:
            return state;
    }
}