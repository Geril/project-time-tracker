import * as actionTypes from 'actions/actionTypes';

const initialState = {
    projects: [],
};

export default function projects(state = initialState, action) {
    switch (action.type) {
        // Fetch Basic Info about User
        case actionTypes.FETCH_ALL_PROJECTS_REQUEST_SUCCESS: {
            return {
                ...state,
                projects: action.response,
            };
        }
        case actionTypes.CREATE_PROJECT_REQUEST_SUCCESS: {
            const newProjects = state.projects.slice();
            newProjects.unshift(action.response);
            return {
                ...state,
                projects: newProjects,
            };
        }
        default: {
            return state;
        }
    }
}
