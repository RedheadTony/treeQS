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
  // moveChildrenIntoParent,
  findPlace
} from './helper'

function Node(selectedNode) {
  this.id = selectedNode.id
  this.value = selectedNode.value
  this.distantChild = []
  this.deleted = selectedNode.deleted
  this.parentId = selectedNode.parent ? selectedNode.parent.id : null
  this.children = {}
}

const isParentForNode = (parentId, node) => {
  let path = []
  let isFinded = false
  const start = (parentId, node) => {
    path.push(node.id)
    if(node.id === parentId) {
      isFinded = true
    }
    if(!isFinded && node.parent) start(parentId, node.parent)
  }
  start(parentId, node)
  return path
}

const isChildForNode = (childId, node) => {
  let isChild = false
  const start = (node) => {
    console.log('start')
    console.log(node)
    if(childId === node.id) {
      isChild = true
    } else {
      Object.keys(node.children).forEach(key => {
        start(node.children[key])
      })
    }
  }
  console.log('in func')
  console.log(node)
  start(node)
  return isChild
}

const clone = (clonableObj, newObj, parent) => {

  newObj.id = clonableObj.id
  newObj.value = clonableObj.value
  newObj.deleted = clonableObj.deleted
  newObj.parent = parent
  newObj.children = {}

  Object.keys(clonableObj.children).forEach(childId => {
    newObj.children[childId] = {}
    clone(clonableObj.children[childId], newObj.children[childId], newObj)
  })
}

const find = (root, elementId) => {
  let findedParent = null

  const findElement = (obj) => {
    if(obj.id === elementId) {
      findedParent = obj
    } else {
      Object.keys(obj.children).forEach(key => findElement(obj.children[key]))
    }
  }

  const start = () => {
    Object.keys(root).some(key => {
      findElement(root[key])
      if(findedParent) return true
    })
  }
  start()
  return findedParent
}

const moveChildrenIntoParent = (obj, parent) => {
  Object.keys(obj).forEach(key => {
    if(obj[key].parentId === parent.id) {
      parent.children[obj[key].id] = obj[key]
      delete obj[key]
    }
  })
}

function* moveToCache({ dispatch }) {
  try {
    const { selectedNode } = yield select(state => state.db)
    const { cache } = yield select(
      state => state.cache
    )
    const newCache = yield copyObj(cache)

    const findedParent = selectedNode.parent ? find(newCache, selectedNode.parent.id) : null

    console.log('findedParent')
    console.log(findedParent)

    console.log('selectedNode')
    console.log(selectedNode)

    // console.log('findedParent')
    // console.log(findedParent)
    //
    // console.log('findedParent')
    // console.log(findedParent)
    if((findedParent && findedParent.children[selectedNode.id]) || newCache[selectedNode.id]) {
      const element = findedParent ? findedParent.children[selectedNode.id] : newCache[selectedNode.id]
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

    const findNearestParentId = (node, pathToParent, startParent) => {
      let nearestParent = startParent
      const start = (node, pathToParent) => {
        let newChild = {}
        if(!node.children) return
        Object.keys(node.children).some(child => {
          if(node.children[child].id ===  pathToParent[pathToParent.length - 1]) {
            newChild = node.children[child]
            pathToParent.pop()
            return true
          }
        })
        if(newChild.id) {
          nearestParent = newChild
          start(newChild, pathToParent)
        }
      }
      start(node, pathToParent, nearestParent)
      // console.log('end**************')
      // console.log(nearestParent)
      return nearestParent
    }

    // const node = {
    //   id: selectedNode.id,
    //   value: selectedNode.value,
    //   distantChild: [],
    //   deleted: selectedNode.deleted,
    //   parentId: selectedNode.parent ? selectedNode.parent.id : null,
    //   children: {}
    // }

    const node = new Node(selectedNode)
    // const node = {
    //   id: selectedNode.id,
    //   value: selectedNode.value,
    //   distantChild: [],
    //   deleted: selectedNode.deleted,
    //   parentId: selectedNode.parent ? selectedNode.parent.id : null,
    //   children: {}
    // }
    // const distantChild = []
    for (const id in newCache) {
      // поиск родительской ветки
      const pathToParent = isParentForNode(newCache[id].id, selectedNode)
      const lastId = pathToParent.pop()
      if(lastId === newCache[id].id) {
        const nearestParent = findNearestParentId(newCache[id], pathToParent, newCache[id])
        if(nearestParent.deleted) {
          node.deleted = true
        }
        nearestParent.distantChild.push(node.id)
        // console.log('*******************nearestParent')
        // console.log(nearestParent)
        // distantChild.push(nearestParent)
      } else {
        console.log('no parent')
        // поиск дочерней ветки
        console.log('isChildForNode')
        console.log(newCache[id].id)
        console.log(selectedNode)
        const isChild = isChildForNode(newCache[id].id, selectedNode)
        console.log('isChild')
        console.log(isChild)
        if(isChild) {
          node.distantChild.push(newCache[id].id)
        }
      }

      // console.log('distantParent')
      // console.log(pathToParent)
      // console.log('nearestParent')
      // console.log(nearestParent)
    }



    console.log('newCache')
    console.log(newCache)

    moveChildrenIntoParent(newCache, node)

    if(findedParent) {
      findedParent.children[selectedNode.id] = node
    } else {
      newCache[selectedNode.id] = node
    }
    yield put(setCache(newCache))



    // console.log(place)

    // const newCache = yield copyObj(cache)
    // let valueToAdd = yield copyObj(selectedNode)
    // if (foundId.length) {
    //   const valuePlace = yield call(findPlace, newCache, valueToAdd)
    //   let message = 'Element already moved.'
    //   if (valueToAdd.value !== valuePlace[valueToAdd.id].value) {
    //     message = `Element already moved. His name is "${valuePlace[valueToAdd.id].value}".`
    //   }
    //   yield put(
    //     openModal({
    //       title: message,
    //       actions: [
    //         {
    //           title: 'Ok',
    //           onClick: () => dispatch(closeModal())
    //         }
    //       ]
    //     })
    //   )
    //   return
    // }
    //
    // yield call(moveChildrenIntoParent, newCache, valueToAdd)
    // const valuePlace = yield call(findPlace, newCache, valueToAdd)
    // valuePlace[valueToAdd.id] = valueToAdd
    // const parentNodeDeleted = deletedElementsIds.some(id =>
    //   valueToAdd.parentPath.split('.').includes(id.toString())
    // )
    // if (parentNodeDeleted) {
    //   valueToAdd.deleted = true
    // }

    // yield put(addId(valueToAdd.id))
    // yield put(selectNode({}))
  } catch (e) {
    console.log(e)
  }
}

// function* moveToCache({ dispatch }) {
//   try {
//     const { selectedNode } = yield select(state => state.db)
//     const { cache, addedToCacheIds, deletedElementsIds } = yield select(
//       state => state.cache
//     )
//     const foundId = addedToCacheIds.filter(id => id === selectedNode.id)
//
//     const newCache = yield copyObj(cache)
//     let valueToAdd = yield copyObj(selectedNode)
//     if (foundId.length) {
//       const valuePlace = yield call(findPlace, newCache, valueToAdd)
//       let message = 'Element already moved.'
//       if (valueToAdd.value !== valuePlace[valueToAdd.id].value) {
//         message = `Element already moved. His name is "${valuePlace[valueToAdd.id].value}".`
//       }
//       yield put(
//         openModal({
//           title: message,
//           actions: [
//             {
//               title: 'Ok',
//               onClick: () => dispatch(closeModal())
//             }
//           ]
//         })
//       )
//       return
//     }
//
//     yield call(moveChildrenIntoParent, newCache, valueToAdd)
//     const valuePlace = yield call(findPlace, newCache, valueToAdd)
//     valuePlace[valueToAdd.id] = valueToAdd
//     const parentNodeDeleted = deletedElementsIds.some(id =>
//       valueToAdd.parentPath.split('.').includes(id.toString())
//     )
//     if (parentNodeDeleted) {
//       valueToAdd.deleted = true
//     }
//     yield put(setCache(newCache))
//     yield put(addId(valueToAdd.id))
//     yield put(selectNode({}))
//   } catch (e) {
//     console.log(e)
//   }
// }

function* addNewElement({ value }) {
  try {
    const { nextId } = yield select(state => state.db)
    const { selectedCacheNode, cache } = yield select(state => state.cache)
    const selectedId = selectedCacheNode.id
    const valueToAdd = {
      id: nextId,
      parentId: selectedId,
      value,
      deleted: false,
      distantChild: [],
      children: {}
    }
    const newCache = copyObj(cache)
    // const valuePlace = yield call(findPlace, newCache, valueToAdd)
    const valuePlace = find(newCache, selectedId) || newCache
    valuePlace.children[valueToAdd.id] = valueToAdd
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
  const valuePlace = find(newCache, selectedId) || newCache
  console.log('valuePlace')
  console.log(valuePlace)
  valuePlace.value = value
  yield put(setCache(newCache))
  yield put(selectCacheNode({}))
}

function* deleteElementSaga() {
  try {
    const { cache, selectedCacheNode } = yield select(state => state.cache)
    const selectedId = selectedCacheNode.id
    const newCache = copyObj(cache)
    // const valuePlace = yield call(findPlace, newCache, selectedCacheNode)
    const valuePlace = find(newCache, selectedId) || newCache
    valuePlace.deleted = true
    deleteWithChildren(valuePlace)
    console.log('valuePlace.distantChild')
    console.log(valuePlace.distantChild)
    // хотел в distantChild хранить ссылки, реализовать не вышло
    // видимо создавался новый объект, где - не нашел, обошел через id
    valuePlace.distantChild.forEach(id => {
      const child = find(newCache, id)
      deleteWithChildren(child)
    })

    // deleteWithChildren(valuePlace[selectedId])
    // for (const id in newCache) {
    //   const shouldBeDeleted = newCache[id].parentPath
    //     .split('.')
    //     .includes(selectedId.toString())
    //   if (shouldBeDeleted) {
    //     deleteWithChildren(newCache[id])
    //   }
    // }
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
    const dbCopy = {'1' : {}}
    clone(dataBase['1'], dbCopy[1], null)
    // console.log('dataBase')
    // console.log(dataBase)
    // console.log('dbCopy')
    // console.log(dbCopy)
    // console.log('cache')
    // console.log(cache)
    for (const id in cache) {
      const element = copyObj(cache[id])
      // console.log('element')
      // console.log(element)
      const elementInDb = find(dbCopy, element.id)
      // console.log('elementInDb')
      // console.log(elementInDb)
      elementInDb.value = element.value
      // elementInDb.deleted = element.deleted
      // const element = copyObj(cache[id])
      // const splitPath = element.parentPath.split('.')
      // let elementInDb = dbCopy
      // splitPath.shift()
      // for (let i = 0; i < splitPath.length; i++) {
      //   elementInDb = elementInDb[splitPath[i]].children
      // }
      if (element.deleted) {
        deleteWithChildren(elementInDb)
      }
      // elementInDb[element.id].value = element.value
      copyWithChildren(element.children, elementInDb)
      console.log('elementInDb')
      console.log(elementInDb)
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
