/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actionTypes from 'actions/actionTypes';
import appStateReducer from './appState.reducer';

describe('AppState reducer', () => {
    // Fetch Basic Info about User
    it('It should set "isFetchingUsersInfo" to true when request to users basic info endpoint is made', () => {
        const initialState = {
            isFetchingUsersInfo: false,
        };

        const expectedState = {
            isFetchingUsersInfo: true,
        };

        const resultState = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.FETCH_USER_BASIC_INFO_REQUEST_TRIGGERED,
        });

        assert.deepEqual(resultState, expectedState);
    });

    it('It should set "isFetchingUsersInfo" to false when request to users basic info endpoint is finished', () => {
        const initialState = {
            isFetchingUsersInfo: true,
            hasUserInfo: false,
        };

        const expectedState = {
            hasUserInfo: true,
            isFetchingUsersInfo: false,
        };

        const expectedState2 = {
            hasUserInfo: false,
            isFetchingUsersInfo: false,
        };

        const resultState1 = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.FETCH_USER_BASIC_INFO_REQUEST_SUCCESS,
        });

        const resultState2 = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.FETCH_USER_BASIC_INFO_REQUEST_FAILURE,
        });

        assert.deepEqual(resultState1, expectedState);
        assert.deepEqual(resultState2, expectedState2);
    });

    // Fetch Projects
    it('It should set "isFetchingProjects" to true when request to projects endpoint is made', () => {
        const initialState = {
            isFetchingProjects: false,
        };

        const expectedState = {
            isFetchingProjects: true,
        };

        const resultState = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.FETCH_ALL_PROJECTS_REQUEST_TRIGGERED,
        });

        assert.deepEqual(resultState, expectedState);
    });

    it('It should set "isFetchingProjects" to false when request to projects endpoint is finished', () => {
        const initialState = {
            isFetchingProjects: true,
        };

        const expectedState = {
            isFetchingProjects: false,
        };

        const resultState1 = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.FETCH_ALL_PROJECTS_REQUEST_SUCCESS,
        });

        const resultState2 = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.FETCH_ALL_PROJECTS_REQUEST_FAILURE,
        });

        assert.deepEqual(resultState1, expectedState);
        assert.deepEqual(resultState2, expectedState);
    });

    // Create Project
    it('It should set "isCreatingProject" to true when request to project endpoint with POST method is made', () => {
        const initialState = {
            isCreatingProject: false,
        };

        const expectedState = {
            isCreatingProject: true,
        };

        const resultState = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.CREATE_PROJECT_REQUEST_TRIGGERED,
        });

        assert.deepEqual(resultState, expectedState);
    });

    it('It should set "isCreatingProject" to false when request to project endpoint with POST method is finished', () => {
        const initialState = {
            isCreatingProject: true,
        };

        const expectedState = {
            isCreatingProject: false,
        };

        const resultState1 = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.CREATE_PROJECT_REQUEST_SUCCESS,
        });

        const resultState2 = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.CREATE_PROJECT_REQUEST_FAILURE,
        });

        assert.deepEqual(resultState1, expectedState);
        assert.deepEqual(resultState2, expectedState);
    });

    // Fetch Project Logs
    it('It should set "isFetchingProjectLogs" to true when request to fetch project logs is made', () => {
        const initialState = {
            isFetchingProjectLogs: false,
        };

        const expectedState = {
            isFetchingProjectLogs: true,
        };

        const resultState = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.FETCH_PROJECT_LOGS_REQUEST_TRIGGERED,
        });

        assert.deepEqual(resultState, expectedState);
    });

    it('It should set "isFetchingProjectLogs" to false when request to fetch project logs is finished', () => {
        const initialState = {
            isFetchingProjectLogs: true,
        };

        const expectedState = {
            isFetchingProjectLogs: false,
        };

        const resultState1 = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.FETCH_PROJECT_LOGS_REQUEST_SUCCESS,
        });

        const resultState2 = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.FETCH_PROJECT_LOGS_REQUEST_FAILURE,
        });

        assert.deepEqual(resultState1, expectedState);
        assert.deepEqual(resultState2, expectedState);
    });

    // Start log
    it('It should set "isStartingLog" to true when request to start logger logs is made', () => {
        const initialState = {
            isStartingLog: false,
        };

        const expectedState = {
            isStartingLog: true,
        };

        const resultState = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.START_LOG_REQUEST_TRIGGERED,
        });

        assert.deepEqual(resultState, expectedState);
    });

    it('It should set "isStartingLog" to false when request to start logger logs is finished', () => {
        const initialState = {
            isStartingLog: true,
        };

        const expectedState = {
            isStartingLog: false,
        };

        const resultState1 = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.START_LOG_REQUEST_SUCCESS,
        });

        const resultState2 = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.START_LOG_REQUEST_FAILURE,
        });

        assert.deepEqual(resultState1, expectedState);
        assert.deepEqual(resultState2, expectedState);
    });

    // Stop log
    it('It should set "isStoppingLog" to true when request to stop logger logs is made', () => {
        const initialState = {
            isStoppingLog: false,
        };

        const expectedState = {
            isStoppingLog: true,
        };

        const resultState = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.STOP_LOG_REQUEST_TRIGGERED,
        });

        assert.deepEqual(resultState, expectedState);
    });

    it('It should set "isStoppingLog" to false when request to stop logger logs is finished', () => {
        const initialState = {
            isStoppingLog: true,
        };

        const expectedState = {
            isStoppingLog: false,
        };

        const resultState1 = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.STOP_LOG_REQUEST_SUCCESS,
        });

        const resultState2 = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.STOP_LOG_REQUEST_FAILURE,
        });

        assert.deepEqual(resultState1, expectedState);
        assert.deepEqual(resultState2, expectedState);
    });

    // Fetch current log
    it('It should set "isFetchingCurrentLog" to true when request to fetch running log is made', () => {
        const initialState = {
            isFetchingCurrentLog: false,
        };

        const expectedState = {
            isFetchingCurrentLog: true,
        };

        const resultState = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.FETCH_CURRENT_LOG_REQUEST_TRIGGERED,
        });

        assert.deepEqual(resultState, expectedState);
    });

    it('It should set "isFetchingCurrentLog" to false when request to fetch running log is finished', () => {
        const initialState = {
            isFetchingCurrentLog: true,
        };

        const expectedState = {
            isFetchingCurrentLog: false,
        };

        const resultState1 = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.FETCH_CURRENT_LOG_REQUEST_SUCCESS,
        });

        const resultState2 = appStateReducer(deepFreeze(initialState), {
            type: actionTypes.FETCH_CURRENT_LOG_REQUEST_FAILURE,
        });

        assert.deepEqual(resultState1, expectedState);
        assert.deepEqual(resultState2, expectedState);
    });
});
