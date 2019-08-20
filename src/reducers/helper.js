// база данных - объект с корневым элементом key = id = 1  и parentPath = 0
// в children хронятся потомки где key = id
export const db = {
  '1': {
    id: 1,
    parentPath: '0',
    value: 'name',
    deleted: false,
    children: {
      '2': {
        id: 2,
        parentPath: '0.1',
        value: 'name2',
        deleted: false,
        children: {
          '7': {
            id: 7,
            parentPath: '0.1.2',
            value: 'name7',
            deleted: false,
            children: {
              '9': {
                id: 9,
                parentPath: '0.1.2.7',
                value: 'name9',
                deleted: false,
                children: {
                  '10': {
                    id: 10,
                    parentPath: '0.1.2.7.9',
                    value: 'name10',
                    deleted: false,
                    children: {
                      '12': {
                        id: 12,
                        parentPath: '0.1.2.7.9.10',
                        value: 'name12',
                        deleted: false,
                        children: {}
                      }
                    }
                  },
                  '11': {
                    id: 11,
                    parentPath: '0.1.2.7.9',
                    value: 'name11',
                    deleted: false,
                    children: {}
                  }
                }
              }
            }
          },
          '8': {
            id: 8,
            parentPath: '0.1.2',
            value: 'name8',
            deleted: false,
            children: {}
          }
        }
      },
      '3': {
        id: 3,
        parentPath: '0.1',
        value: 'name3',
        deleted: false,
        children: {
          '4': {
            id: 4,
            parentPath: '0.1.3',
            value: 'name4',
            deleted: false,
            children: {
              '5': {
                id: 5,
                parentPath: '0.1.3.4',
                value: 'name5',
                deleted: false,
                children: {
                  '6': {
                    id: 6,
                    parentPath: '0.1.3.4.5',
                    value: 'name6',
                    deleted: false,
                    children: {}
                  },
                  '13': {
                    id: 13,
                    parentPath: '0.1.3.4.5',
                    value: 'name13',
                    deleted: false,
                    children: {
                      '14': {
                        id: 14,
                        parentPath: '0.1.3.4.5.13',
                        value: 'name10',
                        deleted: false,
                        children: {
                          '15': {
                            id: 15,
                            parentPath: '0.1.3.4.5.13.14',
                            value: 'name12',
                            deleted: false,
                            children: {}
                          }
                        }
                      },
                      '16': {
                        id: 16,
                        parentPath: '0.1.3.4.5.13',
                        value: 'name11',
                        deleted: false,
                        children: {}
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

// написал скрипт для автозаполнения остальных полей
// чтобы вбивать дерево было проще
// протестировать нормально не успел
const tree = {
  value: 'Node1',
  children: [
    {
      value: 'Node2',
      children: []
    },
    {
      value: 'Node3',
      children: [
        {
          value: 'Node5',
          children: []
        },
        {
          value: 'Node6',
          children: [
            {
              value: 'Node7',
              children: [
                {
                  value: 'Node8',
                  children: []
                },
                {
                  value: 'Node9',
                  children: [
                    {
                      value: 'Node10',
                      children: []
                    },
                    {
                      value: 'Node11',
                      children: [
                        {
                          value: 'Node12',
                          children: []
                        }
                      ]
                    }
                  ]
                },
                {
                  value: 'Node13',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      value: 'Node4',
      children: []
    }
  ]
}

let globalId = 2

function renderTree(tree, treeObj, id, parentPath) {
  treeObj.value = tree.value
  treeObj.deleted = false
  treeObj.id = id
  const childPath = `${parentPath}.${treeObj.id}`
  treeObj.parentPath = parentPath
  treeObj.children = {}
  tree.children.forEach(child => {
    const childId = globalId++
    treeObj.children[childId] = {}
    renderTree(child, treeObj.children[childId], childId, childPath)
  })
}

export function getTree() {
  let treeObj = {}
  renderTree(tree, treeObj, 1, '0')
  return { '1': treeObj }
}
