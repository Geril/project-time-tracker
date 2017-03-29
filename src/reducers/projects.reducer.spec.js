/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */

import assert from 'assert';
import deepFreeze from 'deep-freeze';

import * as actionTypes from 'actions/actionTypes';
import projectsReducer from './projects.reducer';

describe('Project reducer', () => {
    // Fetch all projects
    it('It should create projects array', () => {
        const initialState = {
            projects: [],
        };

        const expectedState = {
            projects: [{
                id: '3c945a89-0a7e-42a6-8238-ffe3933aaf9f',
                name: 'Quisquam eaque',
                description: 'Quisquam eaque consequuntur maxime deleniti',
                author: 1,
                created: 1490533661915,
            }, {
                id: '43a0be11-90cf-45fb-9651-7f38ee11bea5',
                name: 'Laboriosam, voluptas',
                description: 'Laboriosam, voluptas id, adipisci consequuntur',
                author: 1,
                created: 1490533661915,
            }],
        };

        const resultState = projectsReducer(deepFreeze(initialState), {
            type: actionTypes.FETCH_ALL_PROJECTS_REQUEST_SUCCESS,
            response: [{
                id: '3c945a89-0a7e-42a6-8238-ffe3933aaf9f',
                name: 'Quisquam eaque',
                description: 'Quisquam eaque consequuntur maxime deleniti',
                author: 1,
                created: 1490533661915,
            }, {
                id: '43a0be11-90cf-45fb-9651-7f38ee11bea5',
                name: 'Laboriosam, voluptas',
                description: 'Laboriosam, voluptas id, adipisci consequuntur',
                author: 1,
                created: 1490533661915,
            }],
        });

        assert.deepEqual(resultState, expectedState);
    });
    // Fetch all projects after deletion
    it('It should create projects array', () => {
        const initialState = {
            projects: [],
        };

        const expectedState = {
            projects: [{
                id: '3c945a89-0a7e-42a6-8238-ffe3933aaf9f',
                name: 'Quisquam eaque',
                description: 'Quisquam eaque consequuntur maxime deleniti',
                author: 1,
                created: 1490533661915,
            }, {
                id: '43a0be11-90cf-45fb-9651-7f38ee11bea5',
                name: 'Laboriosam, voluptas',
                description: 'Laboriosam, voluptas id, adipisci consequuntur',
                author: 1,
                created: 1490533661915,
            }],
        };

        const resultState = projectsReducer(deepFreeze(initialState), {
            type: actionTypes.DELETE_PROJECT_REQUEST_SUCCESS,
            response: [{
                id: '3c945a89-0a7e-42a6-8238-ffe3933aaf9f',
                name: 'Quisquam eaque',
                description: 'Quisquam eaque consequuntur maxime deleniti',
                author: 1,
                created: 1490533661915,
            }, {
                id: '43a0be11-90cf-45fb-9651-7f38ee11bea5',
                name: 'Laboriosam, voluptas',
                description: 'Laboriosam, voluptas id, adipisci consequuntur',
                author: 1,
                created: 1490533661915,
            }],
        });

        assert.deepEqual(resultState, expectedState);
    });

    // Create Project
    it('It should add newly created project into array as first element', () => {
        const initialState = {
            projects: [{
                id: '43a0be11-90cf-45fb-9651-7f38ee11bea5',
                name: 'Laboriosam, voluptas',
                description: 'Laboriosam, voluptas id, adipisci consequuntur',
                author: 1,
                created: 1490533661915,
            }],
        };

        const expectedState = {
            projects: [{
                id: '3c945a89-0a7e-42a6-8238-ffe3933aaf9f',
                name: 'Quisquam eaque',
                description: 'Quisquam eaque consequuntur maxime deleniti',
                author: 1,
                created: 1490533661915,
            }, {
                id: '43a0be11-90cf-45fb-9651-7f38ee11bea5',
                name: 'Laboriosam, voluptas',
                description: 'Laboriosam, voluptas id, adipisci consequuntur',
                author: 1,
                created: 1490533661915,
            }],
        };

        const resultState = projectsReducer(deepFreeze(initialState), {
            type: actionTypes.CREATE_PROJECT_REQUEST_SUCCESS,
            response: {
                id: '3c945a89-0a7e-42a6-8238-ffe3933aaf9f',
                name: 'Quisquam eaque',
                description: 'Quisquam eaque consequuntur maxime deleniti',
                author: 1,
                created: 1490533661915,
            },
        });

        assert.deepEqual(resultState, expectedState);
    });
});
