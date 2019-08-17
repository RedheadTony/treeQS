import React from 'react'
import styled from 'styled-components'

import TreeView from "./TreeView";
import ActionsPanel from "./ActionsPanel";
import MoveButton from "./MoveButton";

const Container = styled.div`
    background-color: #eaeaea;
    height: calc(100vh - 30px);
    width: 100vw;
    min-width: 700px;
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: top;
`;

const GetElementButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70vh;
`

const CachedTreeViewWrapper = styled.div`
`

export default function App() {
    return(
        <Container>
            <div>
                <TreeView/>
                <ActionsPanel/>
            </div>
            <GetElementButtonWrapper>
                <MoveButton/>
            </GetElementButtonWrapper>
            <TreeView/>
        </Container>
    )
}
