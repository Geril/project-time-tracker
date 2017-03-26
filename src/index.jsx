import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from 'redux/store/configure-store';

import AppRouter from './AppRouter';

const store = configureStore();

const rootEl = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
, rootEl);
