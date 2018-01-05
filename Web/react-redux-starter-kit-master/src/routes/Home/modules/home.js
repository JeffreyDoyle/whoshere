/**
 * Created by jeffreydoyle on 2017-09-21.
 */
/**
 * Created by jeffreydoyle on 2017-09-21.
 */
// ------------------------------------
// Constants
// ------------------------------------
import axios from 'axios';
import { browserHistory } from 'react-router';

export const GET_USERS = 'GET_ADDRESSES';
export const GET_USER = 'GET_USER';
export const GET_ONLINE = 'GET_ONLINE';

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
    return {
        type    : COUNTER_INCREMENT,
        payload : value
    }
}

export function login (data) {
    const request = axios.post('/auth/login', {
        firstName: data.firstName,
        lastName: data.lastName,
    });
    return {
        type: GET_ALL_SITES,
        payload: request
    };
}

export function getUser () {
    const request = axios.get('/users/me');
    return {
        type: GET_USER,
        payload: request
    };
}

export function getOnline () {
    const request = axios.get('/users/online');
    return {
        type: GET_ONLINE,
        payload: request
    };
}


/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () => {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                dispatch({
                    type    : COUNTER_DOUBLE_ASYNC,
                    payload : getState().counter
                })
                resolve()
            }, 200)
        })
    }
}

export const actions = {
    login,
    doubleAsync,
    getUser,
    getOnline
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [GET_USER]    : (state, action) => ({
        ...state,
        user: {
            firstName: action.payload.data.firstName,
            lastName: action.payload.data.firstName,
            address: action.payload.data.firstName,
        }
    }),
    [GET_ONLINE]    : (state, action) => ({
        ...state,
        online: action.payload.data.users
    }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    user: null,
    online: [],
}
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
