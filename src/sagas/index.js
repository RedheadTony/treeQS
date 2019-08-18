import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'

import * as types from '../actionTypes'
import {setCache, selectNode} from "../actions";

function* fetchUser() {
    try {
        const {selectedNode, cache} = yield select()
        const newCache = {...cache}
        let valueToAdd = {...selectedNode}
        for(const id in cache) {
            if(selectedNode.parentPath.length < cache[id].parentPath.length) {
                const indexOfId = cache[id].parentPath.indexOf(selectedNode.id)
                if(indexOfId === -1) continue
                // console.log('selectedNode.parentPath')
                // console.log(selectedNode.parentPath)
                // console.log('cache[id].parentPath')
                // console.log(cache[id].parentPath)
                // console.log('indexOfId')
                // console.log(indexOfId)
                const splitPath = cache[id].parentPath.slice(indexOfId).split('.')
                // console.log(selectedNode.parentPath)
                // console.log(cache[id].parentPath)
                // console.log('splitPath')
                // console.log(splitPath)
                if(splitPath.length === 1 && splitPath[0] == selectedNode.id) {
                    console.log(cache[id].value + ' was added to ' + selectedNode.value)
                    valueToAdd = {...selectedNode, children: {...valueToAdd.children, [id]: cache[id]}}
                    delete newCache[id]
                }
            }
        }
        console.log('////////valueToAdd///////')
        console.log(valueToAdd)
        console.log('/////newCache//////')
        console.log(newCache)
        // console.log(selectedNode)
        let wasAdded = false
        // let placeToAdd = {...newCache}
        console.log('placeToAdd')
        console.log(newCache)
        console.log(selectedNode.parentPath)
        for(const id in cache) {
            if(valueToAdd.parentPath.length > cache[id].parentPath.length) {
                const indexOfId = valueToAdd.parentPath.indexOf(id)
                if(indexOfId === -1) continue
                const splitPath = valueToAdd.parentPath.slice(indexOfId).split('.')
                let valuePlace = newCache
                for(let i = 0; i < splitPath.length; i++) {
                    if(valuePlace[splitPath[i]]) {
                        valuePlace = valuePlace[splitPath[i]].children
                    } else {
                        valuePlace = newCache
                        break;
                    }

                }
                valuePlace[valueToAdd.id] = {...valueToAdd}
                wasAdded = true
            }

        }
        if(wasAdded) {
            yield put(setCache(newCache))
        } else {
            yield put(setCache({
                ...newCache,
                [valueToAdd.id]: {...valueToAdd}
            }))
        }

    } catch (e) {
        console.log(e)
    }
}

// function* fetchUser() {
//     try {
//         const {selectedNode, cache} = yield select()
//         // console.log(selectedNode)
//         let wasAdded = false
//         let placeToAdd = {...cache}
//         console.log('placeToAdd')
//         console.log(placeToAdd)
//         console.log(selectedNode.parentPath)
//          for(const id in cache) {
//              if(selectedNode.parentPath.length > cache[id].parentPath.length) {
//                  const indexOfId = selectedNode.parentPath.indexOf(id)
//                  if(indexOfId === -1) continue
//                  const splitPath = selectedNode.parentPath.slice(indexOfId).split('.')
//                  let valuePlace = placeToAdd
//                  for(let i = 0; i < splitPath.length; i++) {
//                      if(valuePlace[splitPath[i]]) {
//                          valuePlace = valuePlace[splitPath[i]].children
//                      } else {
//                          valuePlace = placeToAdd
//                          break;
//                      }
//
//                  }
//                  valuePlace[selectedNode.id] = {...selectedNode, children: {}}
//                  wasAdded = true
//              } else if(selectedNode.parentPath.length < cache[id].parentPath.length) {
//                  const indexOfId = cache[id].parentPath.indexOf(selectedNode.id)
//                  if(indexOfId === -1) continue
//                  console.log('selectedNode.parentPath')
//                  console.log(selectedNode.parentPath)
//                  console.log('cache[id].parentPath')
//                  console.log(cache[id].parentPath)
//                  console.log('indexOfId')
//                  console.log(indexOfId)
//                  const splitPath = selectedNode.parentPath.slice(indexOfId).split('.')
//                  console.log('splitPath')
//                  console.log(splitPath)
//                  // console.log(splitPath.length)
//                  // console.log(splitPath.length[0])
//                  if(splitPath.length === 1 && splitPath[0] === '') {
//                      const valueToAdd = {...selectedNode, children: {[id]: cache[id]}}
//                      console.log('////////valueToAdd///////')
//                      console.log(valueToAdd)
//                  }
//                  // let valuePlace = {...selectedNode.children}
//                  // console.log('value place start')
//                  // console.log(valuePlace)
//                  // for(let i = 0; i < splitPath.length; i++) {
//                  //     if(valuePlace[splitPath[i]]) {
//                  //         valuePlace = valuePlace[splitPath[i]].children
//                  //     } else {
//                  //         valuePlace = {...selectedNode.children}
//                  //         break;
//                  //     }
//                  //
//                  // }
//                  // valuePlace[selectedNode.id] = {...selectedNode, children: {}}
//                  // console.log('///////valuePlace///////')
//                  // console.log(valuePlace)
//                  // wasAdded = true
//              }
//
//          }
//         // const splitedPath = selectedNode.path.split('.')
//         // for(let i; i < splitedPath.length; i++) {
//         //     if(splitedPath[splitedPath[i]]) {
//         //
//         //     }
//         // }
//         // for(const elementId in cache) {
//         //     const splitedId = elementId.split('.')
//         //
//         // }
//         const oldCache = cache
//         const newCache = {
//             ...oldCache,
//             [selectedNode.id]: {...selectedNode, children: {}}
//         }
//         console.log('MOVE_TO_CACHE')
//         console.log(placeToAdd)
//         if(wasAdded) {
//             yield put(setCache(placeToAdd))
//         } else {
//             yield put(setCache({
//                 ...oldCache,
//                 [selectedNode.id]: {...selectedNode, children: {}}
//             }))
//         }
//         // yield put(setCache(placeToAdd))
//         yield put(selectNode({}))
//     } catch (e) {
//         console.log(e)
//     }
// }

function* mySaga() {
    yield takeLatest(types.MOVE_TO_CACHE, fetchUser);
}

export default mySaga;
