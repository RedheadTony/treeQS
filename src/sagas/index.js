import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'

import * as types from '../actionTypes'
import {setCache, selectNode, addId, openModal, closeModal} from "../actions";

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
        for(const id in newCache) {
            if(placeWasFound) break
            if(valueToAdd.parentPath.length > newCache[id].parentPath.length) {
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
        valuePlace[valueToAdd.id] = valueToAdd
        yield put(setCache(newCache))
        yield put(addId(valueToAdd.id))
        yield put(selectNode({}))

    } catch (e) {
        console.log(e)
    }
}

function* mySaga() {
    yield takeLatest(types.MOVE_TO_CACHE, moveToCache);
}

export default mySaga;
