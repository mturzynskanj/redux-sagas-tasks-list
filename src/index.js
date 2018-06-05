import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import tasks from './reducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import registerServiceWorker from './registerServiceWorker';

import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk'

import logger from './middleware/logger'

import tasksReducer from './reducers'

const rootReducer = (state = {}, action) => {
    console.log('what is state....., root reducer',state);
    return {
        tasks: tasksReducer(state.tasks, action)
    }
}



const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
