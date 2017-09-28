import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise';
import axios from 'axios';
import { browserHistory } from 'react-router'
import makeRootReducer from './reducers'
import { updateLocation } from './location'
import Cookies from 'universal-cookie';


let _applicationStore = null;

const createStore = (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, promise];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  let composeEnhancers = compose

  if (__DEV__) {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  // Add token to storeState if it exists.
  const cookies = new Cookies();
  let storeState = initialState;
  const token = cookies.get('whoshere_token');
  if (token) {
      storeState = {
          auth: {
              token
          }
      };
  } else {
      storeState = {
          auth: {
              token: null
          }
      };
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createReduxStore(
    makeRootReducer(),
    storeState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }



  const URL = 'http://localhost:8082/'; // LOCAL SERVER
  axios.defaults.baseURL = URL;
  function listener() {
      const state = store.getState();
      // console.log('listener ', cookies.get('vrify_webapp_token'), (!cookies.get('vrify_webapp_token') && axios.defaults.headers.common.token !== null && axios.defaults.headers.common.token !== undefined ));
      // Token has been removed, also remove it from axios and the store.
      if (!cookies.get('whoshere_token') && axios.defaults.headers.common.token !== null && axios.defaults.headers.common.token !== undefined) {
          axios.defaults.headers.common.token = null;
          // store.dispatch({ type: 'REMOVE_TOKEN' });
      } else if (state.auth && state.auth.token) {
          axios.defaults.headers.common.token = state.auth.token;
      }

      // Set to true to override.
      if (false) {
          // Override with a token.
          axios.defaults.headers.common.token = '';
      }
  }
  store.subscribe(listener);

  if (token) {
      console.log('adding token to axios', token);
      axios.defaults.headers.common.token = token;
  }

  if (_applicationStore === null) {
      _applicationStore = store;
      return store;
  }

  return store
}

export default createStore
