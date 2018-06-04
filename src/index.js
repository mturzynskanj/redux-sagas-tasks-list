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



const store = createStore(
    tasks,
    composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
