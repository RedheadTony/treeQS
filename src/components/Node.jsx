import React from 'react'
import styled from 'styled-components'

const NodeName = styled.div`
    font-size: 14px;
    display: inline-block;
    cursor: pointer;
    user-select: none;
    padding: 3px 5px;
    border-radius: 5px;
    :hover {
        background-color: #8eb1ff;
    }
`

export default function Node(props) {
    const { node } = props
    const { children, value } = node
    console.log(node)
    const renderChildren = () => children.map(el => <Node key={el.id} node={el}/>)
    return(
        <>
            <NodeName>{value}</NodeName>
                <div style={{paddingLeft: 25}}>{renderChildren()}</div>
        </>
    )
}