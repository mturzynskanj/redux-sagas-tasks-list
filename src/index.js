import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import tasks from './reducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { devToolsEnhancer } from 'redux-devtools-extension'
import registerServiceWorker from './registerServiceWorker';

import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk'

import logger from './middleware/logger'

import confirmModal from './reducers/confirmModal'

import { rootReducer } from './reducers'

import { rootSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, sagaMiddleware, logger))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
