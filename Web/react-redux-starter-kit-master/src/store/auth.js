/**
 * Created by jeffreydoyle on 2017-09-21.
 */
import Cookies from 'universal-cookie';

export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const ADD_TOKEN = 'ADD_TOKEN';

const initialState = { open: false, token: null };

export default (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_TOKEN:
            return {
                ...state,
                open: false,
                token: null
            }

        case ADD_TOKEN:

            const cookies = new Cookies();
            cookies.set('whoshere_token', action.token);

            return {
                ...state,
                open: false,
                token: action.token
            }

        default:
            return state;
    }
};
