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
    const { selectedNode, cache, addedToCacheIds } = yield select()
    const foundId = addedToCacheIds.filter(id => id === selectedNode.id)

    if (foundId.length) {
      yield put(
        openModal({
          title: 'Element already moved',
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
    const newCache = yield copyObj(cache)
    let valueToAdd = yield copyObj(selectedNode)
    yield call(moveChildrenIntoParent, newCache, valueToAdd)
    const { valuePlace, parentNodeDeleted } = yield call(
      findPlace,
      newCache,
      valueToAdd
    )
    valuePlace[valueToAdd.id] = valueToAdd
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
    const { selectedCacheNode, cache, nextId } = yield select()
    const selectedId = selectedCacheNode.id
    const valueToAdd = {
      id: nextId,
      parentPath: `${selectedCacheNode.parentPath}.${selectedId}`,
      value,
      deleted: false,
      children: {}
    }
    const newCache = copyObj(cache)
    const { valuePlace } = yield call(findPlace, newCache, valueToAdd)
    valuePlace[valueToAdd.id] = valueToAdd
    yield put(setCache(newCache))
    yield put(selectNode({}))
    yield put(incrementId())
  } catch (e) {
    console.log(e)
  }
}

function* editElement({ value }) {
  const { selectedCacheNode, cache } = yield select()
  const selectedId = selectedCacheNode.id
  const newCache = copyObj(cache)
  const { valuePlace } = yield call(findPlace, newCache, selectedCacheNode)
  valuePlace[selectedId].value = value
  yield put(setCache(newCache))
  yield put(selectCacheNode({}))
}

function* deleteElementSaga() {
  try {
    const { cache, selectedCacheNode } = yield select()
    const selectedId = selectedCacheNode.id
    const newCache = copyObj(cache)
    const { valuePlace } = yield call(findPlace, newCache, selectedCacheNode)
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
    const { cache, dataBase } = yield select()
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
