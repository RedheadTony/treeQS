import React from 'react'
import styled from 'styled-components'

const NodeName = styled.div`
  font-size: 14px;
  width: max-content;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  padding: 3px 5px;
  border-radius: 5px;
  transition: background-color ease 0.5s;
  ${({ deleted, selected }) => {
    if (deleted) return 'background-color: red; cursor: default;'
    if (selected) return 'background-color: #8eb1ff;'
  }}
    :hover {
    ${({ deleted }) => !deleted && 'background-color: #8eb1ff;'}
  }
`

export default function Node(props) {
  const { node, selectNode, selectedNode } = props
  const keys = Object.keys(node)

  const renderNodes = () => {
    return keys.map(key => {
      const { deleted, id, children, value } = node[key]
      const selected = selectedNode.id === node[key].id
      const onClick = () => {
        if (!deleted && !selected) selectNode(node[key])
      }
      return (
        <React.Fragment key={id}>
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
        </React.Fragment>
      )
    })
  }

  return renderNodes()
}
