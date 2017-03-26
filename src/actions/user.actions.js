import AppConfig from 'config/appConfig';
import * as actionTypes from 'actions/actionTypes';
import fetch from 'httpService';

export function fetchUsersInfo() {
    const promise = fetch(`${AppConfig.USER_BASIC_INFO_ENDPOINT}`);
    return {
        onRequest: actionTypes.FETCH_USER_BASIC_INFO_REQUEST_TRIGGERED,
        onSuccess: actionTypes.FETCH_USER_BASIC_INFO_REQUEST_SUCCESS,
        onFailure: actionTypes.FETCH_USER_BASIC_INFO_REQUEST_FAILURE,
        promise,
    };
}
