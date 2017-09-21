/**
 * Created by jeffreydoyle on 2017-09-21.
 */
import axios from 'axios';
import store from './createStore';

// const URL = 'http://54.190.36.136:8080/'; // DEV SERVER
const URL = 'http://localhost:8082/'; // LOCAL SERVER

axios.defaults.baseURL = URL;

function listener() {
    const state = store.getState();
    if (state.authentication && state.authentication.token) {
        axios.defaults.headers.common.token = state.authentication.token;
    }
    if (true) {
        // Override with a token.
        axios.defaults.headers.common.token = '';
    }
}

store.subscribe(listener);

export default axios;
