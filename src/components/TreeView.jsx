import React from 'react'
import styled from 'styled-components'

import Node from "./Node";

const Container = styled.div`
    width: 40vw;
    min-width: 300px;
    height: 70vh;
    background-color: #FFFFFF;
    border: 1px solid #6f6f6f;
    padding: 10px;
`

const node = {
    id: '1',
    value: 'name',
    deleted: false,
    children: [
        {
            id: '1.2',
            value: 'name2',
            deleted: false,
            children: []
        },
        {
            id: '1.3',
            value: 'name3',
            deleted: false,
            children: [
                {
                    id: '1.3.4',
                    value: 'name4',
                    deleted: false,
                    children: [
                        {
                            id: '1.2',
                            value: 'name2',
                            deleted: false,
                            children: []
                        },
                    ]
                }
            ]
        }
    ]
}

export default function TreeView () {
    return(
        <Container>
            <Node node={node}/>
        </Container>
    )
}