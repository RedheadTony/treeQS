import styled from 'styled-components'

export const Button = styled.div`
  font-size: 16px;
  line-height: 22px;
  height: 25px;
  padding: 0 7px;
  cursor: pointer;
  user-select: none;
  border: 1px solid rgba(2, 158, 116, 1);
  border-radius: 5px;
  background: #FFFFFF;
  color: rgba(2,158,116,1);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({disabled}) => disabled &&
    `background-color: #2121211a;
    border-color: rgb(122, 123, 123);
    color: rgb(122, 123, 123);
    img {
      filter: grayscale(100%);
    }`
  }
  :hover {
    // color: #FFFFFF;
    // background: rgba(2,158,116,1);
  }
`
