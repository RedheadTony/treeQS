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
  max-width: 80vw;
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

const Text = styled.div`
  font-size: 12px;
  min-height: 200px;
  padding-top: 25px;
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

const buttonStyle = { marginRight: 10 }
export default function Modal({
  isOpen,
  title,
  text,
  actions = [],
  onClose = () => {}
}) {
  if (!isOpen) return <div />
  const renderActions = () => {
    return actions.map(({ title, onClick, key }) => (
      <Button key={key || title} onClick={onClick} style={buttonStyle}>
        {title}
      </Button>
    ))
  }
  return (
    <Container onClick={onClose}>
      <Content>
        {title && <Title>{title}</Title>}
        {text && <Text>{text}</Text>}
        {actions && <Actions>{renderActions()}</Actions>}
      </Content>
    </Container>
  )
}
