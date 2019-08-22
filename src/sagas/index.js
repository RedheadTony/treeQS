import { put, takeEvery, takeLatest, select, call } from 'redux-saga/effects'

import * as types from '../actionTypes'
import {
  setCache,
  selectNode,
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
  find,
  isParentForNode,
  findNearestParentId,
  isChildForNode,
  moveChildrenIntoParent,
  clone,
  Node
} from './helper'

function* moveToCache({ dispatch }) {
  try {
    const { selectedNode } = yield select(state => state.db)
    const { cache } = yield select(state => state.cache)
    const newCache = yield copyObj(cache)

    const foundParent = selectedNode.parent
      ? yield call(find, newCache, selectedNode.parent.id)
      : null

    if (
      (foundParent && foundParent.children[selectedNode.id]) ||
      newCache[selectedNode.id]
    ) {
      const element = foundParent
        ? foundParent.children[selectedNode.id]
        : newCache[selectedNode.id]
      let message = 'Element already moved.'
      if (element.value !== selectedNode.value) {
        message = `Element already moved. His name is "${element.value}".`
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

    const node = new Node(selectedNode)

    for (const id in newCache) {
      // поиск родительской ветки
      const pathToParent = yield call(
        isParentForNode,
        newCache[id].id,
        selectedNode
      )
      const lastId = pathToParent.pop()
      if (lastId === newCache[id].id) {
        const nearestParent = yield call(
          findNearestParentId,
          newCache[id],
          pathToParent,
          newCache[id]
        )
        if (nearestParent.deleted) {
          node.deleted = true
        }
        nearestParent.distantChild.push(node.id)
      } else {
        // поиск дочерней ветки
        const isChild = yield call(
          isChildForNode,
          newCache[id].id,
          selectedNode
        )
        if (isChild) {
          node.distantChild.push(newCache[id].id)
        }
      }
    }

    yield call(moveChildrenIntoParent, newCache, node)

    if (foundParent) {
      foundParent.children[selectedNode.id] = node
    } else {
      newCache[selectedNode.id] = node
    }
    yield put(setCache(newCache))
  } catch (e) {
    console.log(e)
  }
}

function* addNewElement({ value }) {
  try {
    const { nextId } = yield select(state => state.db)
    const { selectedCacheNode, cache } = yield select(state => state.cache)
    const selectedId = selectedCacheNode.id
    const newNode = {
      id: nextId,
      parentId: selectedId,
      value,
      deleted: false,
      distantChild: [],
      children: {}
    }
    const newCache = yield call(copyObj, cache)
    const parentNode = yield call(find, newCache, selectedId) || newCache
    parentNode.children[newNode.id] = newNode
    yield put(setCache(newCache))
    yield put(selectNode({}))
    yield put(incrementId())
  } catch (e) {
    console.log(e)
  }
}

function* editElement({ value }) {
  const { selectedCacheNode, cache } = yield select(state => state.cache)
  const selectedId = selectedCacheNode.id
  const newCache = yield call(copyObj, cache)
  const node = yield call(find, newCache, selectedId) || newCache
  node.value = value
  yield put(setCache(newCache))
  yield put(selectCacheNode({}))
}

function* deleteElementSaga() {
  try {
    const { cache, selectedCacheNode } = yield select(state => state.cache)
    const selectedId = selectedCacheNode.id
    const newCache = yield call(copyObj, cache)
    const node = yield call(find, newCache, selectedId) || newCache
    node.deleted = true
    yield call(deleteWithChildren, node, newCache)
    // хотел в distantChild хранить ссылки, реализовать не вышло
    // видимо создавался новый объект, где - не нашел, обошел через id
    node.distantChild.forEach(id => {
      const child = find(newCache, id)
      deleteWithChildren(child, newCache)
    })
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
    const dbCopy = { '1': {} }
    clone(dataBase['1'], dbCopy[1], null)
    for (const id in cache) {
      const element = yield call(copyObj, cache[id])
      const elementInDb = yield call(find, dbCopy, element.id)
      elementInDb.value = element.value
      if (element.deleted) {
        yield call(deleteWithChildren, elementInDb)
      }
      yield call(copyWithChildren, element.children, elementInDb)
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
