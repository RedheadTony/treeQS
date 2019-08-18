import React from 'react'
import styled from 'styled-components'

import {Button} from './commonStyledComponent/buttons'
import ModalForm from './ModalForm'

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

export default class ActionsPanel extends React.Component {
    state = {
        isOpen: false,
        title: '',
        type: formTypes.ADDING
    }

    openModal = () => this.setState({isOpen: true})

    closeModal = () => this.setState({isOpen: false})

    openAddingDialog = () => {
        const { selectedNode } = this.props
        // console.log(selectedNode)
        this.setState({
            title: `Adding new element in "${selectedNode.value}"`,
            isOpen: true,
            type: formTypes.ADDING
        })
    }

    openEditingDialog = () => {
        const { selectedNode } = this.props
        // console.log(selectedNode)
        this.setState({
            title: `Editing element "${selectedNode.value}"`,
            isOpen: true,
            type: formTypes.EDITING
        })
    }

    deleteElement = () => {
        const {deleteElement} = this.props
        deleteElement()
    }

    addNewElement = value => console.log('adding ' + value)
    editingNewElement = value => console.log('editing ' + value)

    render() {
        const {reset, selectedNode, addNewElement, editElement} = this.props
        const {isOpen, title, type} = this.state
        const disabledEditingButtons = !selectedNode.id
        return(
            <>
                <ModalForm
                    isOpen={isOpen}
                    onClose={this.closeModal}
                    onSubmit={type === formTypes.ADDING ? addNewElement : editElement}
                    value={type === formTypes.EDITING ? selectedNode.value : ''}
                    title={title}/>
                <Container>
                    <ButtonGroup style={{width: 100}}>
                        <Button
                            onClick={this.openAddingDialog}
                            disabled={disabledEditingButtons}>
                            +
                        </Button>
                        <Button
                            onClick={this.deleteElement}
                            disabled={disabledEditingButtons}>
                            -
                        </Button>
                        <Button
                            onClick={this.openEditingDialog}
                            disabled={disabledEditingButtons}>
                            a
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup style={{width: 130}}>
                        <Button>Apply</Button>
                        <Button onClick={reset}>Reset</Button>
                    </ButtonGroup>
                </Container>
            </>
        )
    }
}