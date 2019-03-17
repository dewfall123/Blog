import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // 类似Vuex
import { AppContainer } from 'react-hot-loader';
import Pages from './containers';
import * as serviceWorker from './serviceWorker';
import './reset.css';

import { createStore } from 'redux';
// import rootReducer from './reducers';
const store = createStore();


ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Pages />
        </Provider>
    </AppContainer>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
