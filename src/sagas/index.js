import { put, takeEvery, takeLatest, select, call } from 'redux-saga/effects'

import * as types from '../actionTypes'
import {
  setCache,
  selectNode,
  addId,
  openModal,
  closeModal,
  incrementId,
  selectCacheNode,
  setDataBase
} from '../actions'
import {
  copyObj,
  copyWithChildren,
  deleteWithChildren,
  moveChildrenIntoParent,
  findPlace
} from './helper'

function* moveToCache({ dispatch }) {
  try {
    const {selectedNode} = yield select(state => state.db)
    const {
      cache,
      addedToCacheIds,
      deletedElementsIds
    } = yield select(state => state.cache)
    const foundId = addedToCacheIds.filter(id => id === selectedNode.id)

    const newCache = yield copyObj(cache)
    let valueToAdd = yield copyObj(selectedNode)
    if (foundId.length) {
      const valuePlace = yield call(findPlace, newCache, valueToAdd)
      let message = 'Element already moved.'
      if(valueToAdd.value !== valuePlace[valueToAdd.id].value) {
        message = `Element already moved. His name is "${valuePlace[valueToAdd.id].value}".`
      }
      yield put(
        openModal({
          title: message,
          actions: [
            {
              title: 'Ok',
              onClick: () => dispatch(closeModal())
            }
          ]
        })
      )
      return
    }

    yield call(moveChildrenIntoParent, newCache, valueToAdd)
    const valuePlace = yield call(findPlace, newCache, valueToAdd)
    valuePlace[valueToAdd.id] = valueToAdd
    const parentNodeDeleted = deletedElementsIds.some(id => valueToAdd.parentPath.split('.').includes(id.toString()))
    if (parentNodeDeleted) {
      valueToAdd.deleted = true
    }
    yield put(setCache(newCache))
    yield put(addId(valueToAdd.id))
    yield put(selectNode({}))
  } catch (e) {
    console.log(e)
  }
}

function* addNewElement({ value }) {
  try {
    const { nextId } = yield select(state => state.db)
    const { selectedCacheNode, cache } = yield select(state => state.cache)
    const selectedId = selectedCacheNode.id
    const valueToAdd = {
      id: nextId,
      parentPath: `${selectedCacheNode.parentPath}.${selectedId}`,
      value,
      deleted: false,
      children: {}
    }
    const newCache = copyObj(cache)
    const valuePlace = yield call(findPlace, newCache, valueToAdd)
    valuePlace[valueToAdd.id] = valueToAdd
    yield put(setCache(newCache))
    yield put(addId(valueToAdd.id))
    yield put(selectNode({}))
    yield put(incrementId())
  } catch (e) {
    console.log(e)
  }
}

function* editElement({ value }) {
  const { selectedCacheNode, cache } = yield select(state => state.cache)
  const selectedId = selectedCacheNode.id
  const newCache = copyObj(cache)
  const valuePlace = yield call(findPlace, newCache, selectedCacheNode)
  valuePlace[selectedId].value = value
  yield put(setCache(newCache))
  yield put(selectCacheNode({}))
}

function* deleteElementSaga() {
  try {
    const { cache, selectedCacheNode } = yield select(state => state.cache)
    const selectedId = selectedCacheNode.id
    const newCache = copyObj(cache)
    const valuePlace = yield call(findPlace, newCache, selectedCacheNode)
    valuePlace[selectedId].deleted = true
    deleteWithChildren(valuePlace[selectedId])
    for (const id in newCache) {
      const indexOfId = newCache[id].parentPath.indexOf(selectedId)
      if (indexOfId !== -1) {
        deleteWithChildren(newCache[id])
      }
    }
    yield put(setCache(newCache))
    yield put(selectCacheNode({}))
  } catch (e) {
    console.log(e)
  }
}

function* apply() {
  try {
    const { cache } = yield select(state => state.cache)
    const { dataBase } = yield select(state => state.db)
    const dbCopy = copyObj(dataBase)
    for (const id in cache) {
      const element = copyObj(cache[id])
      const splitPath = element.parentPath.split('.')
      let elementInDb = dbCopy
      splitPath.shift()
      for (let i = 0; i < splitPath.length; i++) {
        elementInDb = elementInDb[splitPath[i]].children
      }
      if (element.deleted) {
        deleteWithChildren(elementInDb[id])
      }
      elementInDb[element.id].value = element.value
      copyWithChildren(element.children, elementInDb[element.id].children)
    }
    yield put(setDataBase(dbCopy))
    yield put(selectNode({}))
  } catch (e) {
    console.log(e)
  }
}

function* mySaga() {
  yield takeLatest(types.MOVE_TO_CACHE, moveToCache)
  yield takeLatest(types.ADD_NEW_ELEMENT, addNewElement)
  yield takeLatest(types.EDIT_NEW_ELEMENT, editElement)
  yield takeEvery(types.DELETE, deleteElementSaga)
  yield takeEvery(types.APPLY, apply)
}

export default mySaga
