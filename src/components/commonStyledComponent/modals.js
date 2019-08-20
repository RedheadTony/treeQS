import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity ease 0.3s;
  &.open {
    opacity: 1;
  }
`

export const Content = styled.div`
  min-width: 400px;
  max-width: 80vw;
  background-color: #ffffff;
  padding: 25px;
  position: relative;
  padding-bottom: 60px;
`

export const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
  width: 100%;
  text-align: center;
`

export const Actions = styled.div`
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
