import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import appReducer from './reducers'
import cacheTree from './reducers/cacheTree'
import dbTree from './reducers/dbTree'
import sagas from './sagas'
import './index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

const reducers = combineReducers({
  app: appReducer,
  cache: cacheTree,
  db: dbTree
})
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagas)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
