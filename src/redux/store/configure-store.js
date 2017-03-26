import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux/middleware/promise-middleware';

import appConfig from 'config/appConfig';
import mainReducer from 'reducers/index.reducer';

const finalCreateStore = compose(
    applyMiddleware(
        thunk,
        promiseMiddleware
    ),
    window.devToolsExtension && appConfig.SHOW_REDUX_DEV_TOOLS ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(mainReducer, initialState);
    return store;
}
