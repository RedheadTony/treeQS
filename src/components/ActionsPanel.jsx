import React from 'react'
import styled from 'styled-components'

import { Button } from './commonStyledComponent/buttons'
import ModalForm from './ModalForm'
import DeletingModal from './Modal'
import deleteIcon from '../images/deleteIcon.svg'
import addIcon from '../images/addIcon.svg'
import editIcon from '../images/editIcon.svg'

const Container = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const formTypes = {
  ADDING: 'ADDING',
  EDITING: 'EDITING'
}

const buttonStyle = { width: 70 }
export default class ActionsPanel extends React.Component {
  state = {
    isOpen: false,
    title: '',
    type: formTypes.ADDING,
    isOpenDeleting: false
  }

  openDeleting = () => this.setState({ isOpenDeleting: true })
  closeDeleting = () => this.setState({ isOpenDeleting: false })

  closeModal = () => this.setState({ isOpen: false })

  openAddingDialog = () => {
    const { selectedNode } = this.props
    this.setState({
      title: `Add new element into "${selectedNode.value}"`,
      isOpen: true,
      type: formTypes.ADDING
    })
  }

  openEditingDialog = () => {
    const { selectedNode } = this.props
    this.setState({
      title: `Edit element "${selectedNode.value}"`,
      isOpen: true,
      type: formTypes.EDITING
    })
  }

  deleteElement = () => {
    const {
      deleteElement,
      selectedNode: { id, parentPath }
    } = this.props
    deleteElement(id, parentPath)
    this.closeDeleting()
  }

  apply = () => {
    const { apply } = this.props
    apply()
  }

  actions = [
    {
      title: 'Delete',
      onClick: this.deleteElement
    },
    {
      title: 'Cancel',
      onClick: this.closeDeleting
    }
  ]

  render() {
    const { reset, selectedNode, addNewElement, editElement } = this.props
    const { isOpen, title, type, isOpenDeleting } = this.state
    const disabledEditingButtons = !selectedNode.id

    return (
      <>
        <DeletingModal
          title={`Delete node "${selectedNode.value}"?`}
          onClose={this.closeDeleting}
          isOpen={isOpenDeleting}
          actions={this.actions}
        />
        <ModalForm
          isOpen={isOpen}
          onClose={this.closeModal}
          onSubmit={type === formTypes.ADDING ? addNewElement : editElement}
          value={type === formTypes.EDITING ? selectedNode.value : ''}
          title={title}
        />
        <Container>
          <ButtonGroup style={{ width: 100 }}>
            <Button
              onClick={
                !disabledEditingButtons ? this.openAddingDialog : undefined
              }
              disabled={disabledEditingButtons}>
              <img alt="" src={addIcon} />
            </Button>
            <Button
              onClick={!disabledEditingButtons ? this.openDeleting : undefined}
              disabled={disabledEditingButtons}>
              <img alt="" src={deleteIcon} />
            </Button>
            <Button
              onClick={
                !disabledEditingButtons ? this.openEditingDialog : undefined
              }
              disabled={disabledEditingButtons}>
              <img alt="" src={editIcon} />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button style={buttonStyle} onClick={this.apply}>
              Apply
            </Button>
            <Button style={buttonStyle} onClick={reset}>
              Reset
            </Button>
          </ButtonGroup>
        </Container>
      </>
    )
  }
}
