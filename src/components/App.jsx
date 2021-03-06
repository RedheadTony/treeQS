import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import TreeView from './TreeView'
import ActionsPanel from './ActionsPanel'
import MoveButton from './MoveButton'
import Modal from './Modal'
import * as actions from '../actions'

const Container = styled.div`
  height: calc(100vh - 30px);
  width: 100vw;
  min-width: 800px;
  min-height: 400px;
  padding-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: top;
`

const GetElementButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
`

function App(props) {
  const {
    dataBase,
    cache,
    moveToCache,
    selectedNode,
    selectNode,
    reset,
    isOpen,
    title,
    actions,
    closeModal,
    selectedCacheNode,
    selectCacheNode,
    addNewElement,
    editElement,
    deleteElement,
    apply
  } = props

  return (
    <Container>
      <Modal
        title={title}
        onClose={closeModal}
        actions={actions}
        isOpen={isOpen}
      />
      <div>
        <TreeView
          tree={cache}
          selectedNode={selectedCacheNode}
          selectNode={selectCacheNode}
        />
        <ActionsPanel
          editElement={editElement}
          addNewElement={addNewElement}
          selectedNode={selectedCacheNode}
          deleteElement={deleteElement}
          apply={apply}
          reset={reset}
        />
      </div>
      <GetElementButtonWrapper>
        <MoveButton disabled={!selectedNode.id} onClick={moveToCache} />
      </GetElementButtonWrapper>
      <TreeView
        tree={dataBase}
        selectNode={selectNode}
        selectedNode={selectedNode}
      />
    </Container>
  )
}

const mapStateToProps = state => ({
  dataBase: state.db.dataBase,
  cache: state.cache.cache,
  selectedNode: state.db.selectedNode,
  selectedCacheNode: state.cache.selectedCacheNode,
  isOpen: state.app.isOpen,
  title: state.app.title,
  actions: state.app.actions
})

const mapDispatchToProps = dispatch => ({
  moveToCache: () => dispatch(actions.moveToCache(dispatch)),
  selectNode: node => dispatch(actions.selectNode(node)),
  reset: () => dispatch(actions.reset()),
  closeModal: () => dispatch(actions.closeModal()),
  selectCacheNode: node => dispatch(actions.selectCacheNode(node)),
  addNewElement: value => dispatch(actions.addNewElement(value)),
  editElement: value => dispatch(actions.editElement(value)),
  deleteElement: (id, parentPath) =>
    dispatch(actions.deleteElement(id, parentPath)),
  apply: () => dispatch(actions.apply())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
