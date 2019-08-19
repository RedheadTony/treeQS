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
      const indexOfId = objLink[id].parentPath.indexOf(parentLink.id)
      if (indexOfId === -1) return
      const splitPath = objLink[id].parentPath.slice(indexOfId).split('.')
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
  let parentNode = objLink
  for (const id in objLink) {
    if (placeWasFound) break
    if (insertableItem.parentPath.length > objLink[id].parentPath.length) {
      const indexOfId = insertableItem.parentPath.indexOf(id)
      if (indexOfId === -1) continue
      const splitPath = insertableItem.parentPath.slice(indexOfId).split('.')
      for (let i = 0; i < splitPath.length; i++) {
        if (valuePlace[splitPath[i]]) {
          parentNode = valuePlace[splitPath[i]]
          valuePlace = valuePlace[splitPath[i]].children
          placeWasFound = true
        } else {
          valuePlace = objLink
          parentNode = objLink
        }
      }
    }
  }
  return { valuePlace, parentNodeDeleted: parentNode.deleted }
}
