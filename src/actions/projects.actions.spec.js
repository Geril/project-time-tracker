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

describe('Project actions', () => {
    beforeEach(() => {
        mockedFetch.flushRequests();
    });

    it('It should load all projects', (done) => {
        const response = [{
            id: '3c945a89-0a7e-42a6-8238-ffe3933aaf9f',
            name: 'Quisquam eaque',
            description: 'Quisquam eaque consequuntur maxime deleniti',
            author: 1,
            created: 1490533661915,
        }, {
            id: '43a0be11-90cf-45fb-9651-7f38ee11bea5',
            name: 'Laboriosam, voluptas',
            description: 'Laboriosam, voluptas id, adipisci consequuntur',
            author: 1,
            created: 1490533661915,
        }];

        mockedFetch.registerRequest(`${AppConfig.PROJECTS_ENDPOINT}`).reply(response);

        const getState = {};
        const expectedActions = [
            {
                type: actionTypes.FETCH_ALL_PROJECTS_REQUEST_TRIGGERED,
            },
            {
                type: actionTypes.FETCH_ALL_PROJECTS_REQUEST_SUCCESS,
                response,
            },
        ];

        const store = mockStore(getState, expectedActions, done);
        store.dispatch(actions.fetchAllProjects());
    });

    it('It should create new project', (done) => {
        const response = {
            id: '3c945a89-0a7e-42a6-8238-ffe3933aaf9f',
            name: 'Quisquam eaque',
            description: 'Quisquam eaque consequuntur maxime deleniti',
            author: 1,
            created: 1490533661915,
        };

        mockedFetch.registerRequest(`${AppConfig.PROJECT_ENDPOINT}`, {
            method: 'POST',
        }).reply(response);

        const getState = {};
        const expectedActions = [
            {
                type: actionTypes.CREATE_PROJECT_REQUEST_TRIGGERED,
            },
            {
                type: actionTypes.CREATE_PROJECT_REQUEST_SUCCESS,
                response,
            },
        ];

        const store = mockStore(getState, expectedActions, done);
        store.dispatch(actions.createProject());
    });

    it('It should delete existing project', (done) => {
        const response = [{
            id: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
            name: 'Lorem ipsum',
            description: 'Lorem ipsum dolor sit amet',
            author: 1,
            created: 1490776282202,
        }, {
            id: 'b823cd29-423f-4c45-90ab-27efef0e1966-g28',
            name: 'Quisquam eaque',
            description: 'Quisquam eaque consequuntur maxime deleniti',
            author: 1,
            created: 1490776282202,
        }];

        mockedFetch.registerRequest(`${AppConfig.PROJECT_ENDPOINT}/734742af-9a5e-42ce-8300-39b94eb8d157-g28`, {
            method: 'DELETE',
        }).reply(response);

        const getState = {};
        const expectedActions = [
            {
                type: actionTypes.DELETE_PROJECT_REQUEST_TRIGGERED,
            },
            {
                type: actionTypes.DELETE_PROJECT_REQUEST_SUCCESS,
                response,
            },
        ];

        const store = mockStore(getState, expectedActions, done);
        store.dispatch(actions.deleteProject('734742af-9a5e-42ce-8300-39b94eb8d157-g28'));
    });
});
