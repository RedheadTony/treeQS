import React from 'react'
import styled from 'styled-components'

import Node from './Node'

const Container = styled.div`
  width: 40vw;
  min-width: 300px;
  height: 70vh;
  background-color: #ffffff;
  border: 1px solid #6f6f6f;
  padding: 10px;
  overflow: auto;
`

export default function TreeView(props) {
  const { tree, selectNode, selectedNode } = props
  const unselectNode = () => selectNode({})
  return (
    <Container onClick={unselectNode}>
      <Node node={tree} selectNode={selectNode} selectedNode={selectedNode} />
    </Container>
  )
}
