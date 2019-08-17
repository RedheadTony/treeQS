import React from 'react'
import styled from 'styled-components'

const NodeName = styled.div`
    font-size: 14px;
    display: inline-block;
    cursor: pointer;
    user-select: none;
    padding: 3px 5px;
    border-radius: 5px;
    ${({deleted, selected}) => {
    if(deleted) return 'background-color: red; cursor: default;'
    if(selected) return 'background-color: #8eb1ff;'
    }}
    :hover {
        ${({deleted}) => !deleted && 'background-color: #8eb1ff;'}
    }
`

export default function Node(props) {
    const { node, selectNode, selectedNode } = props
    // const { children, value, id, deleted } = node
    // if(!id) return <div/>
    const renderChildren = children => Object.keys(children).map(key => (
            <Node
                key={children[key].id}
                node={children}
                selectNode={selectNode}
                selectedNode={selectedNode}/>
        )
    )
    const renderNodes = () => {
        return Object.keys(node).map(key => {
            const {deleted, id, children, value} = node[key]
            const selected = selectedNode.id === node[key].id
            const onClick = () => {
                if(!deleted && !selected) selectNode(node[key])
            }
            return(
                <React.Fragment key={id}>
                    <NodeName
                        onClick={onClick}
                        deleted={deleted}
                        selected={selected}>
                        {value}
                    </NodeName>
                    <div style={{paddingLeft: 25}}>
                        <Node
                            node={children}
                            selectNode={selectNode}
                            selectedNode={selectedNode}/>
                    </div>
                </React.Fragment>
            )
        })
    }

    return renderNodes()
}

// export default function Node(props) {
//     console.log('props')
//     console.log(props);
//     const { node, selectNode, selectedNode } = props
//     const { children, value, id, deleted } = node
//     if(!id) return <div/>
//     const renderChildren = () => children.map(el => (
//         <Node
//             key={el.id}
//             node={el}
//             selectNode={selectNode}
//             selectedNode={selectedNode}/>
//         )
//     )
//     const selected = selectedNode.id === id
//     const onClick = () => {
//         if(!deleted && !selected) selectNode(node)
//     }
//     return(
//         <>
//             <NodeName
//                 onClick={onClick}
//                 deleted={deleted}
//                 selected={selected}>
//                 {value}
//             </NodeName>
//                 <div style={{paddingLeft: 25}}>{children && renderChildren()}</div>
//         </>
//     )
// }