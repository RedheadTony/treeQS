import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Node from './Node'
import * as actions from '../actions'

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
  // console.log(selectedNode)
  return (
    <Container>
      <Node node={tree} selectNode={selectNode} selectedNode={selectedNode} />
    </Container>
  )
}

// const mapDispatchToProps = dispatch => ({
//     selectNode: node => dispatch(actions.selectNode(node))
// })
//
// const mapStateToProps = state => ({
//     selectedNode: state.selectedNode
// })
//
// connect(mapStateToProps, mapDispatchToProps)(TreeView)
