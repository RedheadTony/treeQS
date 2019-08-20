import React from 'react'
import styled from 'styled-components'

import { Button } from './commonStyledComponent/buttons'
import { Container, Content, Title, Actions } from './commonStyledComponent/modals'

const Text = styled.div`
  font-size: 12px;
  min-height: 200px;
  padding-top: 25px;
`

const buttonStyle = { marginRight: 10 }
export default class Modal extends React.Component {
  state = {
    className: ''
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isOpen && this.props.isOpen) {
      setTimeout(() => {
          this.setState({ className: 'open' })
      }, 5)
    } else if (prevProps.isOpen && !this.props.isOpen) {
      this.setState({ className: '' })
    }
  }

  render() {
    const {
      isOpen,
      title,
      text,
      actions,
      onClose
    } = this.props
    const { className } = this.state

    if (!isOpen) return <div />
    const renderActions = () => {
      return actions.map(({ title, onClick, key }) => (
          <Button key={key || title} onClick={onClick} style={buttonStyle}>
            {title}
          </Button>
      ))
    }
    return (
        <Container className={className} onClick={onClose ? onClose : undefined}>
          <Content>
            {title && <Title>{title}</Title>}
            {text && <Text>{text}</Text>}
            {actions && <Actions>{renderActions()}</Actions>}
          </Content>
        </Container>
    )
  }
}
