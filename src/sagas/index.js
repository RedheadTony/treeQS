import { call, put, takeEvery, takeLatest, select, fork } from 'redux-saga/effects'

import * as types from '../actionTypes'
import {setCache, selectNode, addId, openModal, closeModal, incrementId, selectCacheNode, deleteElement} from "../actions";

function* moveToCache({dispatch}) {
    try {
        const {selectedNode, cache, addedToCacheIds} = yield select()
        const foundId = addedToCacheIds.filter(id => id === selectedNode.id)

        if(foundId.length) {
            yield put(openModal({
                title: 'Element already moved',
                actions: [{
                    title: 'Ok',
                    onClick: () => dispatch(closeModal())
                }]
            }))
            return
        }
        const newCache = {...cache}
        let valueToAdd = {...selectedNode}
        for(const id in cache) {
            if(selectedNode.parentPath.length < cache[id].parentPath.length) {
                const indexOfId = cache[id].parentPath.indexOf(selectedNode.id)
                if(indexOfId === -1) continue
                const splitPath = cache[id].parentPath.slice(indexOfId).split('.')
                if(splitPath.length === 1 && splitPath[0] == selectedNode.id) {
                    valueToAdd = {...selectedNode, children: {...valueToAdd.children, [id]: cache[id]}}
                    delete newCache[id]
                }
            }
        }
        let placeWasFound = false
        let valuePlace = newCache
        let parentNode = newCache
        for(const id in newCache) {
            if(placeWasFound) break
            if(valueToAdd.parentPath.length > newCache[id].parentPath.length) {
                const indexOfId = valueToAdd.parentPath.indexOf(id)
                if(indexOfId === -1) continue
                const splitPath = valueToAdd.parentPath.slice(indexOfId).split('.')
                for(let i = 0; i < splitPath.length; i++) {
                    if(valuePlace[splitPath[i]]) {
                        parentNode = valuePlace[splitPath[i]]
                        valuePlace = valuePlace[splitPath[i]].children
                        placeWasFound = true
                    } else {
                        valuePlace = newCache
                        parentNode = newCache
                    }

                }
            }

        }
        valuePlace[valueToAdd.id] = valueToAdd
        console.log('parentNode')
        console.log(parentNode)
        if(parentNode.deleted) {
            valuePlace[valueToAdd.id].deleted = true
        }
        yield put(setCache(newCache))
        yield put(addId(valueToAdd.id))
        yield put(selectNode({}))

    } catch (e) {
        console.log(e)
    }
}

function* addNewElement({value}) {
    try {
        const {selectedCacheNode, cache, nextId} = yield select()
        const selectedId = selectedCacheNode.id
        const valueToAdd = {
            id: nextId,
            parentPath: `${selectedCacheNode.parentPath}.${selectedId}`,
            value,
            deleted: false,
            children: {}
        }
        console.log(valueToAdd.parentPath)
        let placeWasFound = false
        const newCache = {...cache}
        let valuePlace = newCache
        for(const id in cache) {
            if(placeWasFound) break
            if(valueToAdd.parentPath.length > cache[id].parentPath.length) {
                const indexOfId = valueToAdd.parentPath.indexOf(id)
                if(indexOfId === -1) continue
                const splitPath = valueToAdd.parentPath.slice(indexOfId).split('.')
                for(let i = 0; i < splitPath.length; i++) {
                    if(valuePlace[splitPath[i]]) {
                        valuePlace = valuePlace[splitPath[i]].children
                        placeWasFound = true
                    } else {
                        valuePlace = newCache
                    }

                }
            }
        }
        valuePlace[nextId] = valueToAdd
        yield put(setCache(newCache))
        yield put(selectNode({}))
        yield put(incrementId())
    } catch (e) {
        console.log(e)
    }
}

function* editElement({value}) {
    const {selectedCacheNode, cache} = yield select()
    const selectedId = selectedCacheNode.id
    // const valueToAdd = {...selectedCacheNode, value}
    let placeWasFound = false
    const newCache = {...cache}
    let valuePlace = newCache
    for(const id in cache) {
        if(placeWasFound) break
        if(selectedCacheNode.parentPath.length > cache[id].parentPath.length) {
            const indexOfId = selectedCacheNode.parentPath.indexOf(id)
            if(indexOfId === -1) continue
            const splitPath = selectedCacheNode.parentPath.slice(indexOfId).split('.')
            for(let i = 0; i < splitPath.length; i++) {
                if(valuePlace[splitPath[i]]) {
                    valuePlace = valuePlace[splitPath[i]].children
                    placeWasFound = true
                } else {
                    valuePlace = newCache
                }

            }
        }
    }
    valuePlace[selectedId].value = value
    yield put(setCache(newCache))
    yield put(selectCacheNode({}))
}

function* deleteElementSaga() {
    try {
        // console.log('start deleting for')
        // console.log({id, parentPath})
        const {cache, selectedCacheNode} = yield select()
        const selectedId = selectedCacheNode.id
        const valueToAdd = {...selectedCacheNode}
        let placeWasFound = false
        const newCache = {...cache}
        let valuePlace = newCache
        for(const id in cache) {
            if(placeWasFound) break
            if(selectedCacheNode.parentPath.length > cache[id].parentPath.length) {
                const indexOfId = selectedCacheNode.parentPath.indexOf(id)
                if(indexOfId === -1) continue
                const splitPath = selectedCacheNode.parentPath.slice(indexOfId).split('.')
                for(let i = 0; i < splitPath.length; i++) {
                    if(valuePlace[splitPath[i]]) {
                        valuePlace = valuePlace[splitPath[i]].children
                        placeWasFound = true
                    } else {
                        valuePlace = newCache
                    }

                }
            }
        }
        valuePlace[selectedId].deleted = true
        const deletingElement = valuePlace[selectedId]
        const deleteWithChildren = (deletingElement) => {
            deletingElement.deleted = true
            for (const id in deletingElement.children) {
                deleteWithChildren(deletingElement.children[id])
            }
        }
        deleteWithChildren(deletingElement)
        yield put(setCache(newCache))
        yield put(selectCacheNode({}))
    } catch (e) {
        console.log(e)
    }
}

function* mySaga() {
    yield takeLatest(types.MOVE_TO_CACHE, moveToCache);
    yield takeLatest(types.ADD_NEW_ELEMENT, addNewElement);
    yield takeLatest(types.EDIT_NEW_ELEMENT, editElement);
    yield takeEvery(types.DELETE, deleteElementSaga);
}

export default mySaga;
