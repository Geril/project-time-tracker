import AppConfig from 'config/appConfig';
import * as actionTypes from 'actions/actionTypes';
import { browserHistory } from 'react-router';
import fetch from 'httpService';

export function fetchAllProjects() {
    const promise = fetch(`${AppConfig.PROJECTS_ENDPOINT}`);
    return {
        onRequest: actionTypes.FETCH_ALL_PROJECTS_REQUEST_TRIGGERED,
        onSuccess: actionTypes.FETCH_ALL_PROJECTS_REQUEST_SUCCESS,
        onFailure: actionTypes.FETCH_ALL_PROJECTS_REQUEST_FAILURE,
        promise,
    };
}

const handleCreateResponse = (response, dispatch) => {
    if (AppConfig.ENV !== 'testing') {
        browserHistory.push('/');
    }
    dispatch({
        type: actionTypes.CREATE_PROJECT_REQUEST_SUCCESS,
        response,
    });
};

export function createProject(name, description, userId) {
    const promise = fetch(`${AppConfig.PROJECT_ENDPOINT}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            description,
            author: userId,
        }),
    });
    return {
        onRequest: actionTypes.CREATE_PROJECT_REQUEST_TRIGGERED,
        onSuccess: handleCreateResponse,
        onFailure: actionTypes.CREATE_PROJECT_REQUEST_FAILURE,
        promise,
    };
}
