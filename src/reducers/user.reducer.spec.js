/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actionTypes from 'actions/actionTypes';
import userReducer from './user.reducer';

describe('User reducer', () => {
    // Fetch Basic Info about User
    it('It should set basic info about user', () => {
        const initialState = {
            id: null,
            nickName: '',
        };

        const expectedState = {
            id: 1,
            nickName: 'JohnDoe',
        };

        const resultState = userReducer(deepFreeze(initialState), {
            type: actionTypes.FETCH_USER_BASIC_INFO_REQUEST_SUCCESS,
            response: {
                id: 1,
                nickName: 'JohnDoe',
            },

        });

        assert.deepEqual(resultState, expectedState);
    });
});
