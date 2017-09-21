/**
 * Created by jeffreydoyle on 2017-09-21.
 */
/**
 * Created by jeffreydoyle on 2017-09-21.
 */
// ------------------------------------
// Constants
// ------------------------------------
export const GET_USERS = 'GET_ADDRESSES';

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
    doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
    [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
