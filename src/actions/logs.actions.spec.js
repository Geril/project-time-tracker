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

describe('Log actions', () => {
    beforeEach(() => {
        mockedFetch.flushRequests();
    });

    it('It should load logs for given project', (done) => {
        const response = [{
            id: '7a061161-a282-4cce-9c95-b08bd2e017ff',
            projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
            userId: 1,
            from: 1490558498339,
            to: 1490558738339,
        }, {
            id: '03dc0e53-6c31-44d4-9f36-7ffb53733606',
            projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
            userId: 1,
            from: 1490557178338,
            to: 1490557358338,
        }, {
            id: '51ac6088-3565-47b0-8c7c-399f5c0cd14d',
            projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
            userId: 1,
            from: 1490553578339,
            to: 1490558378339,
        }];

        mockedFetch.registerRequest(`${AppConfig.LOGS_ENDPOINT}/00b1be66-02a8-41c9-bb81-240eca7beac8-g28`).reply(response);

        const getState = {};
        const expectedActions = [
            {
                type: actionTypes.FETCH_PROJECT_LOGS_REQUEST_TRIGGERED,
                projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
            },
            {
                type: actionTypes.FETCH_PROJECT_LOGS_REQUEST_SUCCESS,
                response,
                projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
            },
        ];

        const store = mockStore(getState, expectedActions, done);
        store.dispatch(actions.fetchProjectLogs('00b1be66-02a8-41c9-bb81-240eca7beac8-g28'));
    });

    it('It should clear all logs for current project', (done) => {
        const getState = {};
        const expectedActions = {
            type: actionTypes.CLEAR_CURRENT_PROEJCT,
        };

        const store = mockStore(getState, expectedActions, done);
        store.dispatch(actions.clearCurrentProject());
    });

    it('It should fetch running log', (done) => {
        const response = {
            id: '3f6f90b5-d97a-4d55-bbde-abab50c7e702',
            projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
            userId: 1,
            from: '1490564900767',
            to: 'running',
        };

        mockedFetch.registerRequest(`${AppConfig.RUNNING_LOG_ENDPOINT}/1`).reply(response);

        const getState = {};
        const expectedActions = [
            {
                type: actionTypes.FETCH_CURRENT_LOG_REQUEST_TRIGGERED,
            },
            {
                type: actionTypes.FETCH_CURRENT_LOG_REQUEST_SUCCESS,
                response,
            },
        ];

        const store = mockStore(getState, expectedActions, done);
        store.dispatch(actions.fetchRunningLog(1));
    });

    it('It should call start endpoint for running log', (done) => {
        const response = {
            id: 'daba95fd-cb78-4c3a-b2f5-b5e2c86945ce',
            projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
            userId: 1,
            from: 1490564900767,
            to: 'running',
        };

        mockedFetch.registerRequest(`${AppConfig.LOG_ENDPOINT}`, {
            method: 'POST',
        }).reply(response);

        const getState = {};
        const expectedActions = [
            {
                type: actionTypes.START_LOG_REQUEST_TRIGGERED,
            },
            {
                type: actionTypes.START_LOG_REQUEST_SUCCESS,
                response,
            },
        ];

        const store = mockStore(getState, expectedActions, done);
        store.dispatch(actions.startLog('daba95fd-cb78-4c3a-b2f5-b5e2c86945ce', 1));
    });

    it('It should call stop endpoint for running log', (done) => {
        const response = {
            id: 'daba95fd-cb78-4c3a-b2f5-b5e2c86945ce',
            projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
            userId: 1,
            from: 1490564900767,
            to: 1490568407066,
        };

        mockedFetch.registerRequest(`${AppConfig.LOG_ENDPOINT}/daba95fd-cb78-4c3a-b2f5-b5e2c86945ce`, {
            method: 'PUT',
        }).reply(response);

        const getState = {};
        const expectedActions = [
            {
                type: actionTypes.STOP_LOG_REQUEST_TRIGGERED,
            },
            {
                type: actionTypes.STOP_LOG_REQUEST_SUCCESS,
                response,
            },
        ];

        const store = mockStore(getState, expectedActions, done);
        store.dispatch(actions.stopLog({ id: 'daba95fd-cb78-4c3a-b2f5-b5e2c86945ce' }));
    });

    it('It should delete existing log', (done) => {
        const response = [{
            id: '6587aa84-cf4c-4bec-a35a-25fa9b3505be',
            projectId: 'b823cd29-423f-4c45-90ab-27efef0e1966-g28',
            userId: 1,
            from: 1490790570154,
            to: 1490790578706,
        }, {
            id: '1a7d0f65-92de-4e01-b907-87e72de9ff5f',
            projectId: 'b823cd29-423f-4c45-90ab-27efef0e1966-g28',
            userId: 1,
            from: 1490778153399,
            to: 1490778155143,
        }];

        mockedFetch.registerRequest(`${AppConfig.LOG_ENDPOINT}/e7466173-b1f5-40c6-a60d-2af73b77ee0f`, {
            method: 'DELETE',
        }).reply(response);

        const getState = {};
        const expectedActions = [
            {
                type: actionTypes.DELETE_LOG_REQUEST_TRIGGERED,
                projectId: 'b823cd29-423f-4c45-90ab-27efef0e1966-g28',
            },
            {
                type: actionTypes.DELETE_LOG_REQUEST_SUCCESS,
                response,
                projectId: 'b823cd29-423f-4c45-90ab-27efef0e1966-g28',
            },
        ];

        const store = mockStore(getState, expectedActions, done);
        store.dispatch(actions.deleteLog('e7466173-b1f5-40c6-a60d-2af73b77ee0f', 'b823cd29-423f-4c45-90ab-27efef0e1966-g28'));
    });
});
