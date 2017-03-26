import * as actionTypes from 'actions/actionTypes';

const initialState = {
    id: null,
    nickName: '',
};

export default function user(state = initialState, action) {
    switch (action.type) {
        // Fetch Basic Info about User
        case actionTypes.FETCH_USER_BASIC_INFO_REQUEST_SUCCESS: {
            return {
                ...state,
                id: action.response.id,
                nickName: action.response.nickName,
            };
        }
        default: {
            return state;
        }
    }
}
