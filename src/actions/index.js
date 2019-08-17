import * as types from '../actionTypes'

export const selectNode = node => ({
    type: types.SELECT_NODE,
    node
})

export const moveToCache = () => ({
    type: types.MOVE_TO_CACHE
})

export const reset = () => ({
    type: types.RESET
})