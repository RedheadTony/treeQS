import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'

import TreeView from "./TreeView";
import ActionsPanel from "./ActionsPanel";
import MoveButton from "./MoveButton";
import * as actions from '../actions'

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

function App(props) {
    // console.log(props)
    const {dataBase, cache, moveToCache, selectedNode, selectNode, reset} = props
    // console.log('dataBase')
    // console.log(dataBase)

    return(
        <Container>
            <div>
                <TreeView
                    tree={cache}
                    selectedNode={{}}
                    selectNode={() => {}}/>
                <ActionsPanel reset={reset}/>
            </div>
            <GetElementButtonWrapper>
                <MoveButton disabled={!selectedNode.id} onClick={moveToCache}/>
            </GetElementButtonWrapper>
            <TreeView
                tree={dataBase}
                selectNode={selectNode}
                selectedNode={selectedNode}/>
        </Container>
    )
}

const mapStateToProps = state => ({
    dataBase: state.dataBase,
    cache: state.cache,
    selectedNode: state.selectedNode
})

const mapDispatchToProps = dispatch => ({
    moveToCache: () => dispatch(actions.moveToCache()),
    selectNode: node => dispatch(actions.selectNode(node)),
    reset: () => dispatch(actions.reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)