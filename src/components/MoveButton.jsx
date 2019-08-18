import React from 'react'
import styled from 'styled-components'

import {Button} from './commonStyledComponent/buttons'

export default function MoveButton({onClick, disabled}) {
    return(
        <Button disabled={disabled} onClick={onClick} style={{margin: 10}}>{'<<<'}</Button>
    )
}