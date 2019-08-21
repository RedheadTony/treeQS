export function copyObj(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function copyWithChildren(cacheChild, parent) {
  for (const id in cacheChild) {
    const dbChild = parent.children
    if (dbChild[id]) {
      if (cacheChild[id].deleted) {
        deleteWithChildren(dbChild[id])
      }
      dbChild[id].value = cacheChild[id].value
    } else {
      dbChild[id] = copyObj(cacheChild[id])
      delete dbChild[id].parentId
    }
    dbChild[id].parent = parent
    copyWithChildren(cacheChild[id].children, dbChild[id])
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

export function Node(selectedNode) {
  this.id = selectedNode.id
  this.value = selectedNode.value
  this.distantChild = []
  this.deleted = selectedNode.deleted
  this.parentId = selectedNode.parent ? selectedNode.parent.id : null
  this.children = {}
}

export function isParentForNode(parentId, node) {
  let path = []
  let isFound = false
  const start = (parentId, node) => {
    path.push(node.id)
    if (node.id === parentId) {
      isFound = true
    }
    if (!isFound && node.parent) start(parentId, node.parent)
  }
  start(parentId, node)
  return path
}

export function isChildForNode(childId, node) {
  let isChild = false
  const start = node => {
    if (childId === node.id) {
      isChild = true
    } else {
      Object.keys(node.children).forEach(key => {
        start(node.children[key])
      })
    }
  }
  start(node)
  return isChild
}

export function clone(copiedObj, newObj, parent) {
  newObj.id = copiedObj.id
  newObj.value = copiedObj.value
  newObj.deleted = copiedObj.deleted
  newObj.parent = parent
  newObj.children = {}

  Object.keys(copiedObj.children).forEach(childId => {
    newObj.children[childId] = {}
    clone(copiedObj.children[childId], newObj.children[childId], newObj)
  })
}

export function find(root, elementId) {
  let foundParent = null

  const findElement = obj => {
    if (obj.id === elementId) {
      foundParent = obj
    } else {
      Object.keys(obj.children).forEach(key => findElement(obj.children[key]))
    }
  }

  const start = () => {
    Object.keys(root).some(key => {
      findElement(root[key])
      if (foundParent) return true
    })
  }
  start()
  return foundParent
}

export function findNearestParentId(node, pathToParent, startParent) {
  let nearestParent = startParent
  const start = (node, pathToParent) => {
    let newChild = {}
    if (!node.children) return
    Object.keys(node.children).some(child => {
      if (node.children[child].id === pathToParent[pathToParent.length - 1]) {
        newChild = node.children[child]
        pathToParent.pop()
        return true
      }
    })
    if (newChild.id) {
      nearestParent = newChild
      start(newChild, pathToParent)
    }
  }
  start(node, pathToParent, nearestParent)
  return nearestParent
}

export function moveChildrenIntoParent(obj, parent) {
  Object.keys(obj).forEach(key => {
    if (obj[key].parentId === parent.id) {
      parent.children[obj[key].id] = obj[key]
      delete obj[key]
    }
  })
}
