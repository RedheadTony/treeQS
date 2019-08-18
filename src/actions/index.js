import * as types from '../actionTypes'

export const selectNode = node => ({
    type: types.SELECT_NODE,
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

export const addId = id => ({
    type: types.ADD_ID,
    id
})

export const openModal = (settings) => ({
    type: types.OPEN_MODAL,
    settings
})

export const closeModal = () => ({
    type: types.CLOSE_MODAL
})