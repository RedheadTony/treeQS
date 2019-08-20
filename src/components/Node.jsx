import React from 'react'
import styled from 'styled-components'

const NodeName = styled.div`
  font-size: 14px;
  width: max-content;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  padding: 3px 15px;
  border-radius: 5px;
  margin-bottom: 5px;
  transition: background-color ease 0.5s;
  border: 1px solid #FFFFFF;
  ${({ deleted, selected }) => {
    if (deleted) return 'background-color: rgba(181, 65, 116, 0.27);' +
        'border-color: rgba(181, 65, 116, 1);' +
        'color: rgba(181, 65, 116, 1);' +
        'cursor: default;'
    if (selected) return 'background-color: rgba(17, 241, 180, 0.27);' +
        'border-color: rgba(2,158,116,1);' +
        'color: rgba(2,158,116,1);'
  }}
    :hover {
    ${({ deleted }) => !deleted && 'background-color: rgba(17, 241, 180, 0.27);' +
    'border-color: rgba(2,158,116,1);' +
    'color: rgba(2,158,116,1);'}
  }
`

export default function Node(props) {
  const { node, selectNode, selectedNode } = props
  const keys = Object.keys(node)

  const renderNodes = () => {
    return keys.map(key => {
      const { deleted, id, children, value } = node[key]
      const selected = selectedNode.id === node[key].id
      const onClick = e => {
        e.stopPropagation()
        if (!deleted && !selected) selectNode(node[key])
      }
      return (
        <div style={{borderLeft: '1px dashed rgba(33, 33, 33, 0.2)'}} key={id}>
          <NodeName onClick={onClick} deleted={deleted} selected={selected}>
            {value}
          </NodeName>
          <div style={{ paddingLeft: 25 }}>
            <Node
              node={children}
              selectNode={selectNode}
              selectedNode={selectedNode}
            />
          </div>
        </div>
      )
    })
  }

  return renderNodes()
}
