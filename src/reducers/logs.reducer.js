import moment from 'moment';
import * as actionTypes from 'actions/actionTypes';
import AppConfig from 'config/appConfig';

const initialState = {
    currentProjectLogs: [],
    currentProjectTotal: '',
    currentProjectId: '',
    activeLog: {},
};

const makeHumanReadable = (item) => {
    const from = moment(item.from).format(AppConfig.DATE_TIME_FORMAT);
    const to = moment(item.to).format(AppConfig.DATE_TIME_FORMAT);
    const duration = item.to - item.from;
    const humanDuration = moment.utc(duration).format(AppConfig.LOG_TIME_FORMAT);
    return {
        id: item.id,
        projectId: item.projectId,
        userId: item.userId,
        from,
        to,
        duration,
        humanDuration,
    };
};

export default function logs(state = initialState, action) {
    switch (action.type) {
        // Fetch logs for current project
        // Update logs after successful log item deletion
        case actionTypes.FETCH_PROJECT_LOGS_REQUEST_SUCCESS:
        case actionTypes.DELETE_LOG_REQUEST_SUCCESS: {
            const formatedLogs = action.response.filter(item => item.to !== 'running' && item.projectId === action.projectId).map(makeHumanReadable);
            const total = formatedLogs.reduce((acc, val) => acc + val.duration, 0);
            const humanTotal = (moment.utc(total).format(AppConfig.LOG_TIME_FORMAT));
            return {
                ...state,
                currentProjectLogs: formatedLogs,
                currentProjectTotal: humanTotal,
                currentProjectId: action.projectId,
            };
        }
        case actionTypes.CLEAR_CURRENT_PROEJCT: {
            return {
                ...state,
                currentProjectLogs: initialState.currentProjectLogs,
                currentProjectTotal: initialState.currentProjectTotal,
                currentProjectId: initialState.currentProjectId,
            };
        }
        case actionTypes.START_LOG_REQUEST_SUCCESS:
        case actionTypes.FETCH_CURRENT_LOG_REQUEST_SUCCESS: {
            return {
                ...state,
                activeLog: action.response,
            };
        }
        case actionTypes.STOP_LOG_REQUEST_SUCCESS: {
            const projectId = action.response.projectId;
            const newCurrentProjectLogs = state.currentProjectLogs.slice();
            let humanTotal = state.currentProjectTotal;
            if (projectId === state.currentProjectId) {
                const newLogItem = [action.response];
                const updated = newLogItem.filter(item => item.to !== 'running').map(makeHumanReadable);
                newCurrentProjectLogs.unshift(updated[0]);
                const total = newCurrentProjectLogs.reduce((acc, val) => acc + val.duration, 0);
                humanTotal = (moment.utc(total).format(AppConfig.LOG_TIME_FORMAT));
            }
            return {
                ...state,
                activeLog: initialState.activeLog,
                currentProjectLogs: newCurrentProjectLogs,
                currentProjectTotal: humanTotal,

            };
        }
        default: {
            return state;
        }
    }
}
