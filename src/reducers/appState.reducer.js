import * as actionTypes from 'actions/actionTypes';

const initialState = {
    isFetchingUsersInfo: false,
    hasUserInfo: false,
    isFetchingProjects: false,
    isCreatingProject: false,
    isFetchingProjectLogs: false,
    isStartingLog: false,
    isStoppingLog: false,
    isFetchingCurrentLog: false,
    isDeletingProject: false,
    isDeletingLog: false,
};

export default function appState(state = initialState, action) {
    switch (action.type) {
        // Fetch Basic Info about User
        case actionTypes.FETCH_USER_BASIC_INFO_REQUEST_TRIGGERED: {
            return {
                ...state,
                isFetchingUsersInfo: true,
            };
        }
        case actionTypes.FETCH_USER_BASIC_INFO_REQUEST_SUCCESS: {
            return {
                ...state,
                hasUserInfo: true,
                isFetchingUsersInfo: initialState.isFetchingUsersInfo,
            };
        }
        case actionTypes.FETCH_USER_BASIC_INFO_REQUEST_FAILURE: {
            return {
                ...state,
                isFetchingUsersInfo: initialState.isFetchingUsersInfo,
            };
        }
        // Fetch Projects
        case actionTypes.FETCH_ALL_PROJECTS_REQUEST_TRIGGERED: {
            return {
                ...state,
                isFetchingProjects: true,
            };
        }
        case actionTypes.FETCH_ALL_PROJECTS_REQUEST_SUCCESS:
        case actionTypes.FETCH_ALL_PROJECTS_REQUEST_FAILURE: {
            return {
                ...state,
                isFetchingProjects: initialState.isFetchingProjects,
            };
        }
        // Create project
        case actionTypes.CREATE_PROJECT_REQUEST_TRIGGERED: {
            return {
                ...state,
                isCreatingProject: true,
            };
        }
        case actionTypes.CREATE_PROJECT_REQUEST_SUCCESS:
        case actionTypes.CREATE_PROJECT_REQUEST_FAILURE: {
            return {
                ...state,
                isCreatingProject: initialState.isCreatingProject,
            };
        }
        // Fetch project logs
        case actionTypes.FETCH_PROJECT_LOGS_REQUEST_TRIGGERED: {
            return {
                ...state,
                isFetchingProjectLogs: true,
            };
        }
        case actionTypes.FETCH_PROJECT_LOGS_REQUEST_SUCCESS:
        case actionTypes.FETCH_PROJECT_LOGS_REQUEST_FAILURE: {
            return {
                ...state,
                isFetchingProjectLogs: initialState.isFetchingProjectLogs,
            };
        }
        // Start log
        case actionTypes.START_LOG_REQUEST_TRIGGERED: {
            return {
                ...state,
                isStartingLog: true,
            };
        }
        case actionTypes.START_LOG_REQUEST_SUCCESS:
        case actionTypes.START_LOG_REQUEST_FAILURE: {
            return {
                ...state,
                isStartingLog: initialState.isStartingLog,
            };
        }
        // Stop log
        case actionTypes.STOP_LOG_REQUEST_TRIGGERED: {
            return {
                ...state,
                isStoppingLog: true,
            };
        }
        case actionTypes.STOP_LOG_REQUEST_SUCCESS:
        case actionTypes.STOP_LOG_REQUEST_FAILURE: {
            return {
                ...state,
                isStoppingLog: initialState.isStoppingLog,
            };
        }
        // Fetch current log
        case actionTypes.FETCH_CURRENT_LOG_REQUEST_TRIGGERED: {
            return {
                ...state,
                isFetchingCurrentLog: true,
            };
        }
        case actionTypes.FETCH_CURRENT_LOG_REQUEST_SUCCESS:
        case actionTypes.FETCH_CURRENT_LOG_REQUEST_FAILURE: {
            return {
                ...state,
                isFetchingCurrentLog: initialState.isFetchingCurrentLog,
            };
        }
        // Delete project
        case actionTypes.DELETE_PROJECT_REQUEST_TRIGGERED: {
            return {
                ...state,
                isDeletingProject: true,
            };
        }
        case actionTypes.DELETE_PROJECT_REQUEST_SUCCESS:
        case actionTypes.DELETE_PROJECT_REQUEST_FAILURE: {
            return {
                ...state,
                isDeletingProject: initialState.isDeletingProject,
            };
        }
        // Delete log
        case actionTypes.DELETE_LOG_REQUEST_TRIGGERED: {
            return {
                ...state,
                isDeletingLog: true,
            };
        }
        case actionTypes.DELETE_LOG_REQUEST_SUCCESS:
        case actionTypes.DELETE_LOG_REQUEST_FAILURE: {
            return {
                ...state,
                isDeletingLog: initialState.isDeletingLog,
            };
        }
        default: {
            return state;
        }
    }
}
