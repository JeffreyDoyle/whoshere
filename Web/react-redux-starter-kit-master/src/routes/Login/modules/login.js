/**
 * Created by jeffreydoyle on 2017-09-21.
 */
import axios from 'axios';

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GET_ADDRESSES = 'GET_ADDRESSES';
export const LINK_ADDRESS = 'LINK_ADDRESS';
export const CREATE_PROFILE = 'CREATE_PROFILE';
export const GET_PROFILE = 'GET_PROFILE';

// ------------------------------------
// Actions
// ------------------------------------

export function createProfile(data) {
    let firstName = data.firstName;
    let lastName = data.lastName;
    let password = data.password;
    const request = axios.post('/auth/create', {
        firstName,
        lastName,
        password,
    });
    return {
        type: CREATE_PROFILE,
        payload: request
    };
}

export function login(data) {
    let address = data.address;
    let password = data.password;
    const request = axios.post('/auth/login', {
        address,
        password,
    });
    return {
        type: LOGIN,
        payload: request,
    }
}

export function getAddresses() {
    const request = axios.get('/addresses/getAll');
    return {
        type: GET_ADDRESSES,
        payload: request,
    }
}

export function linkAddress(address) {
    const request = axios.put('/addresses/link', {
        address,
    });
    return {
        type: LINK_ADDRESS,
        payload: request,
    }
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
    createProfile,
    createProfile,
    getAddresses,
    linkAddress,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [CREATE_PROFILE]       : (state, action) => ({
        profile: action.payload.data,
    }),
    [LINK_ADDRESS]         : (state, action) => ({
        address: action.payload.data,
    }),
    [GET_PROFILE]          : (state, action) => ({
        profile: action.payload.data,
    }),
    [LOGIN]                : (state, action) => ({
        profile: action.payload.data,
    }),
    [GET_ADDRESSES]        : (state, action) => ({
        addresses: action.payload.data,
    })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    profile: null,
    address: null,
    addresses: null,
}
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
