import React from 'react'
import styled from 'styled-components'

import { Button } from './commonStyledComponent/buttons'
import {
  Container,
  Content,
  Title,
  Actions
} from './commonStyledComponent/modals'

const FormContent = styled.form`
  min-height: 50px;
  padding-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  outline: none;
  padding: 5px;
  font-size: 17px;
  width: 200px;
  border: 1px solid rgba(2, 158, 116, 1);
`

const Label = styled.label`
  font-size: 13px;
  margin-bottom: 5px;
`

const Error = styled.div`
  font-size: 13px;
  margin-top: 5px;
  color: rgba(181, 65, 116, 1);
`

const buttonStyle = { width: 70, marginRight: 10 }
export default class ModalForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || '',
      showError: false,
      className: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isOpen && this.props.isOpen) {
      this.setState({ value: this.props.value || '' })
      setTimeout(() => {
        this.setState({ className: 'open' })
      }, 5)
    } else if (prevProps.isOpen && !this.props.isOpen) {
      this.setState({ className: '' })
    }
  }

  setValue = e => this.setState({ value: e.target.value })

  showError = () => this.setState({ showError: true })

  hideError = () => this.setState({ showError: false })

  sendData = () => {
    const { onSubmit, onClose } = this.props
    const { value } = this.state
    if (!value) {
      this.showError()
      return
    }
    this.setState({ value: '' })
    onSubmit(value)
    onClose()
  }

  render() {
    const { isOpen, title, onClose } = this.props
    const { value, showError, className } = this.state
    if (!isOpen) return <div />

    return (
      <Container className={className} isOpen={isOpen} onClick={onClose}>
        <Content onClick={e => e.stopPropagation()}>
          {title && <Title>{title}</Title>}
          <FormContent
            onSubmit={e => {
              e.preventDefault()
              this.sendData()
            }}>
            <div style={{ display: 'grid' }}>
              <Label>Value:</Label>
              <Input
                autoFocus
                value={value}
                onChange={this.setValue}
                onFocus={this.hideError}
              />
              {value === '' && showError && <Error>Is required</Error>}
            </div>
          </FormContent>
          <Actions>
            <Button style={buttonStyle} onClick={this.sendData}>
              Ok
            </Button>
            <Button style={buttonStyle} onClick={onClose}>
              Cancel
            </Button>
          </Actions>
        </Content>
      </Container>
    )
  }
}
