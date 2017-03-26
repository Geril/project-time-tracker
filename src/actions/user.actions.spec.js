/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import * as actions from 'actions/index.actions.js';
import * as actionTypes from 'actions/actionTypes';
import { fetchInstance as mockedFetch } from 'test/services/http';
import AppConfig from 'config/appConfig';

import configureStore from 'redux-mock-store';
import promise from 'redux/middleware/promise-middleware';
import asyncMiddleware from 'redux-thunk';

const middlewares = [
    asyncMiddleware,
    promise,
];
const mockStore = configureStore(middlewares);

describe('User actions', () => {
    beforeEach(() => {
        mockedFetch.flushRequests();
    });

    it('It should load basic info about user', (done) => {
        const response = {
            id: 1,
            nickName: 'JohnDoe',
        };

        mockedFetch.registerRequest(`${AppConfig.USER_BASIC_INFO_ENDPOINT}`).reply(response);

        const getState = {};
        const expectedActions = [
            {
                type: actionTypes.FETCH_USER_BASIC_INFO_REQUEST_TRIGGERED,
            },
            {
                type: actionTypes.FETCH_USER_BASIC_INFO_REQUEST_SUCCESS,
                response,
            },
        ];

        const store = mockStore(getState, expectedActions, done);
        store.dispatch(actions.fetchUsersInfo());
    });
});
