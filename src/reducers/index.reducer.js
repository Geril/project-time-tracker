import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import user from './user.reducer';
import projects from './projects.reducer';
import logs from './logs.reducer';
import appState from './appState.reducer';

const mainReducer = combineReducers({
    user,
    projects,
    logs,
    appState,
    form: reduxFormReducer,
});

export default mainReducer;
