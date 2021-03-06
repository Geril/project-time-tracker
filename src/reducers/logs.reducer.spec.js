/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import moment from 'moment';
import assert from 'assert';
import deepFreeze from 'deep-freeze';
import AppConfig from 'config/appConfig';

import * as actionTypes from 'actions/actionTypes';
import logsReducer from './logs.reducer';

describe('Logs reducer', () => {
    // Fetch all logs for given project and format them
    it('It should create and format logs array for given project', () => {
        const initialState = {
            currentProjectLogs: [],
            currentProjectTotal: '',
        };

        const expectedState = {
            currentProjectLogs: [{
                id: '7a061161-a282-4cce-9c95-b08bd2e017ff',
                projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
                userId: 1,
                from: moment(1490558498339).format(AppConfig.DATE_TIME_FORMAT),
                to: moment(1490558738339).format(AppConfig.DATE_TIME_FORMAT),
                duration: 240000,
                humanDuration: '00:04:00.000',
            }, {
                id: '03dc0e53-6c31-44d4-9f36-7ffb53733606',
                projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
                userId: 1,
                from: moment(1490557178338).format(AppConfig.DATE_TIME_FORMAT),
                to: moment(1490557358338).format(AppConfig.DATE_TIME_FORMAT),
                duration: 180000,
                humanDuration: '00:03:00.000',
            }, {
                id: '51ac6088-3565-47b0-8c7c-399f5c0cd14d',
                projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
                userId: 1,
                from: moment(1490553578339).format(AppConfig.DATE_TIME_FORMAT),
                to: moment(1490558378339).format(AppConfig.DATE_TIME_FORMAT),
                duration: 4800000,
                humanDuration: '01:20:00.000',
            }],
            currentProjectTotal: '01:27:00.000',
            currentProjectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
        };

        const resultState = logsReducer(deepFreeze(initialState), {
            type: actionTypes.FETCH_PROJECT_LOGS_REQUEST_SUCCESS,
            response: [{
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
            }],
            projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
        });

        assert.deepEqual(resultState, expectedState);
    });

    // Update all logs for given project and format them after log deletion
    it('It should update and format logs array for given project after log deletion', () => {
        const initialState = {
            currentProjectLogs: [],
            currentProjectTotal: '',
        };

        const expectedState = {
            currentProjectLogs: [{
                id: '7a061161-a282-4cce-9c95-b08bd2e017ff',
                projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
                userId: 1,
                from: moment(1490558498339).format(AppConfig.DATE_TIME_FORMAT),
                to: moment(1490558738339).format(AppConfig.DATE_TIME_FORMAT),
                duration: 240000,
                humanDuration: '00:04:00.000',
            }, {
                id: '03dc0e53-6c31-44d4-9f36-7ffb53733606',
                projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
                userId: 1,
                from: moment(1490557178338).format(AppConfig.DATE_TIME_FORMAT),
                to: moment(1490557358338).format(AppConfig.DATE_TIME_FORMAT),
                duration: 180000,
                humanDuration: '00:03:00.000',
            }, {
                id: '51ac6088-3565-47b0-8c7c-399f5c0cd14d',
                projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
                userId: 1,
                from: moment(1490553578339).format(AppConfig.DATE_TIME_FORMAT),
                to: moment(1490558378339).format(AppConfig.DATE_TIME_FORMAT),
                duration: 4800000,
                humanDuration: '01:20:00.000',
            }],
            currentProjectTotal: '01:27:00.000',
            currentProjectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
        };

        const resultState = logsReducer(deepFreeze(initialState), {
            type: actionTypes.DELETE_LOG_REQUEST_SUCCESS,
            response: [{
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
            }, {
                id: '22fab2a0-ea1c-4511-8f91-d0a054229c14',
                projectId: 'b823cd29-423f-4c45-90ab-27efef0e1966-g28',
                userId: 1,
                from: 1490792524889,
                to: 1490794504889,
            }, {
                id: '43f43eae-f456-4e5b-9a23-2d3f4764b31c',
                projectId: '734742af-9a5e-42ce-8300-39b94eb8d157-g28',
                userId: 1,
                from: 1490791624889,
                to: 1490792044889,
            }],
            projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
        });

        assert.deepEqual(resultState, expectedState);
    });

    // Clear Current Project
    it('It should set all current project logs to initial values', () => {
        const initialState = {
            currentProjectLogs: [{
                id: '7a061161-a282-4cce-9c95-b08bd2e017ff',
                projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
                userId: 1,
                from: '26.03.2017 - 22:01:38',
                to: '26.03.2017 - 22:05:38',
                duration: 240000,
                humanDuration: '00:04:00.000',
            }, {
                id: '03dc0e53-6c31-44d4-9f36-7ffb53733606',
                projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
                userId: 1,
                from: '26.03.2017 - 21:39:38',
                to: '26.03.2017 - 21:42:38',
                duration: 180000,
                humanDuration: '00:03:00.000',
            }, {
                id: '51ac6088-3565-47b0-8c7c-399f5c0cd14d',
                projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
                userId: 1,
                from: '26.03.2017 - 20:39:38',
                to: '26.03.2017 - 21:59:38',
                duration: 4800000,
                humanDuration: '01:20:00.000',
            }],
            currentProjectTotal: '01:27:00.000',
            currentProjectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
        };

        const expectedState = {
            currentProjectLogs: [],
            currentProjectTotal: '',
            currentProjectId: '',
        };

        const resultState = logsReducer(deepFreeze(initialState), {
            type: actionTypes.CLEAR_CURRENT_PROEJCT,
        });

        assert.deepEqual(resultState, expectedState);
    });

    // Fetch running log
    it('It should set running log', () => {
        const initialState = {
            activeLog: {},
        };

        const expectedState = {
            activeLog: {
                id: '3f6f90b5-d97a-4d55-bbde-abab50c7e702',
                projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
                userId: 1,
                from: '1490564900767',
                to: 'running',
            },
        };

        const resultState = logsReducer(deepFreeze(initialState), {
            type: actionTypes.FETCH_CURRENT_LOG_REQUEST_SUCCESS,
            response: {
                id: '3f6f90b5-d97a-4d55-bbde-abab50c7e702',
                projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
                userId: 1,
                from: '1490564900767',
                to: 'running',
            },
        });

        const resultState2 = logsReducer(deepFreeze(initialState), {
            type: actionTypes.START_LOG_REQUEST_SUCCESS,
            response: {
                id: '3f6f90b5-d97a-4d55-bbde-abab50c7e702',
                projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
                userId: 1,
                from: '1490564900767',
                to: 'running',
            },
        });

        assert.deepEqual(resultState, expectedState);
        assert.deepEqual(resultState2, expectedState);
    });

    // Stop log
    it('It should set current active log to initial value', () => {
        const initialState = {
            activeLog: {
                id: '3f6f90b5-d97a-4d55-bbde-abab50c7e702',
                projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
                userId: 1,
                from: '1490564900767',
                to: 'running',
            },
            currentProjectLogs: [],
            currentProjectTotal: '',
        };

        const expectedState = {
            activeLog: {},
            currentProjectLogs: [],
            currentProjectTotal: '',
        };

        const resultState = logsReducer(deepFreeze(initialState), {
            type: actionTypes.STOP_LOG_REQUEST_SUCCESS,
            response: {
                id: '3f6f90b5-d97a-4d55-bbde-abab50c7e702',
                projectId: '00b1be66-02a8-41c9-bb81-240eca7beac8-g28',
                userId: 1,
                from: '1490564900767',
                to: '1490564900767',
            },
        });

        assert.deepEqual(resultState, expectedState);
    });
});
