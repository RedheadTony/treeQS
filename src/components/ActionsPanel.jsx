import React from 'react'
import styled from 'styled-components'

import {Button} from './commonStyledComponent/buttons'

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

export default function ActionsPanel() {
    return(
        <Container>
            <ButtonGroup style={{width: 100}}>
                <Button>+</Button>
                <Button>-</Button>
                <Button>a</Button>
            </ButtonGroup>
            <ButtonGroup style={{width: 130}}>
                <Button>Apply</Button>
                <Button>Reset</Button>
            </ButtonGroup>
        </Container>
    )
}