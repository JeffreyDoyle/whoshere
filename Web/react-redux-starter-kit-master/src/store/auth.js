/**
 * Created by jeffreydoyle on 2017-09-21.
 */
import Cookies from 'universal-cookie';

export const REMOVE_TOKEN = 'REMOVE_TOKEN';

const initialState = { open: false, token: null };

export default (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_TOKEN:
            return {
                ...state,
                open: false,
                token: null
            }
        default:
            return state;
    }
};
