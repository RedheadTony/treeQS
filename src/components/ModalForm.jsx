import React from 'react'
import styled from 'styled-components'

import { Button } from './commonStyledComponent/buttons'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  min-width: 400px;
  background-color: #ffffff;
  padding: 25px;
  position: relative;
  padding-bottom: 60px;
`

const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
  width: 100%;
  text-align: center;
`

const FormContent = styled.form`
  min-height: 50px;
  padding-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Actions = styled.div`
  position: absolute;
  height: 40px;
  width: calc(100% - 10px);
  bottom: 10px;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
`

const buttonStyle = { width: 70, marginRight: 10 }
export default class ModalForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || ''
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value || '' })
    }
  }

  setValue = e => this.setState({ value: e.target.value })

  sendData = () => {
    const { onSubmit, onClose } = this.props
    const { value } = this.state
    this.setState({ value: '' })
    onSubmit(value)
    onClose()
  }

  render() {
    const { isOpen, title, onSubmit, onClose } = this.props
    const { value } = this.state
    if (!isOpen) return <div />

    return (
      <Container onClick={onClose}>
        <Content onClick={e => e.stopPropagation()}>
          {title && <Title>{title}</Title>}
          <FormContent
            onSubmit={e => {
              e.preventDefault()
              this.sendData()
            }}>
            <input value={value} onChange={this.setValue} />
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
