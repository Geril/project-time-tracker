import AppConfig from 'config/appConfig';
import * as actionTypes from 'actions/actionTypes';
import { browserHistory } from 'react-router';
import fetch from 'httpService';

const processFailure = (response, dispatch) => {
    if (AppConfig.ENV !== 'testing') {
        browserHistory.push('/');
    }
    dispatch({
        type: actionTypes.FETCH_PROJECT_LOGS_REQUEST_FAILURE,
    });
};

export function fetchProjectLogs(projectId) {
    const promise = fetch(`${AppConfig.LOGS_ENDPOINT}/${projectId}`);
    return {
        onRequest: actionTypes.FETCH_PROJECT_LOGS_REQUEST_TRIGGERED,
        onSuccess: actionTypes.FETCH_PROJECT_LOGS_REQUEST_SUCCESS,
        onFailure: processFailure,
        promise,
        projectId,
    };
}

export function clearCurrentProject() {
    return {
        type: actionTypes.CLEAR_CURRENT_PROEJCT,
    };
}

export function fetchRunningLog(userId) {
    const promise = fetch(`${AppConfig.RUNNING_LOG_ENDPOINT}/${userId}`);
    return {
        onRequest: actionTypes.FETCH_CURRENT_LOG_REQUEST_TRIGGERED,
        onSuccess: actionTypes.FETCH_CURRENT_LOG_REQUEST_SUCCESS,
        onFailure: actionTypes.FETCH_CURRENT_LOG_REQUEST_FAILURE,
        promise,
    };
}

export function startLog(projectId, userId) {
    const promise = fetch(`${AppConfig.LOG_ENDPOINT}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            projectId,
            userId,
            from: Date.now(),
        }),
    });
    return {
        onRequest: actionTypes.START_LOG_REQUEST_TRIGGERED,
        onSuccess: actionTypes.START_LOG_REQUEST_SUCCESS,
        onFailure: actionTypes.START_LOG_REQUEST_FAILURE,
        promise,
    };
}

export function stopLog(obj) {
    const { id, userId, projectId, from } = obj;
    const promise = fetch(`${AppConfig.LOG_ENDPOINT}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
            userId,
            projectId,
            from: Number(from),
            to: Date.now(),
        }),
    });
    return {
        onRequest: actionTypes.STOP_LOG_REQUEST_TRIGGERED,
        onSuccess: actionTypes.STOP_LOG_REQUEST_SUCCESS,
        onFailure: actionTypes.STOP_LOG_REQUEST_FAILURE,
        promise,
    };
}

export function deleteLog(logId, projectId) {
    const promise = fetch(`${AppConfig.LOG_ENDPOINT}/${logId}`, {
        method: 'DELETE',
    });
    return {
        onRequest: actionTypes.DELETE_LOG_REQUEST_TRIGGERED,
        onSuccess: actionTypes.DELETE_LOG_REQUEST_SUCCESS,
        onFailure: actionTypes.DELETE_LOG_REQUEST_FAILURE,
        promise,
        projectId,
    };
}
