export function copyObj(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function copyWithChildren(cacheChild, dbChild) {
  for (const id in cacheChild) {
    if (dbChild[id]) {
      if (cacheChild[id].deleted) {
        deleteWithChildren(dbChild[id])
      }
      dbChild[id].value = cacheChild[id].value
    } else {
      dbChild[id] = copyObj(cacheChild[id])
    }

    copyWithChildren(cacheChild[id].children, dbChild[id].children)
  }
}

export function deleteWithChildren(deletingElement) {
  deletingElement.deleted = true
  for (const id in deletingElement.children) {
    if (!deletingElement.children[id].deleted) {
      deleteWithChildren(deletingElement.children[id])
    }
  }
}

export function moveChildrenIntoParent(objLink, parentLink) {
  Object.keys(objLink).forEach(id => {
    if (parentLink.parentPath.length < objLink[id].parentPath.length) {
      const splitPath = []
      let startPush = false
      objLink[id].parentPath.split('.').forEach(id => {
        if (+id === parentLink.id || startPush) {
          startPush = true
          splitPath.push(id)
        }
      })
      if (splitPath.length === 1 && +splitPath[0] === parentLink.id) {
        parentLink.children = { ...parentLink.children, [id]: objLink[id] }
        delete objLink[id]
      }
    }
  })
}

export function findPlace(objLink, insertableItem) {
  let placeWasFound = false
  let valuePlace = objLink
  for (const id in objLink) {
    if (placeWasFound) break
    if (insertableItem.parentPath.length > objLink[id].parentPath.length) {
      const splitPath = []
      let startPush = false
      insertableItem.parentPath.split('.').forEach(tmpId => {
        if (+tmpId === +id || startPush) {
          startPush = true
          splitPath.push(tmpId)
        }
      })
      for (let i = 0; i < splitPath.length; i++) {
        if (valuePlace[splitPath[i]]) {
          valuePlace = valuePlace[splitPath[i]].children
          placeWasFound = true
        } else {
          valuePlace = objLink
        }
      }
    }
  }
  return valuePlace
}
