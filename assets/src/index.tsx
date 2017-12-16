import 'rxjs';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import {
  routerForBrowser, initializeCurrentLocation,
} from 'redux-little-router';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { App } from './components/App';
import * as reducers from './ducks';
import { instagramAuthEpic }  from './ducks/instagramAuth/operations';

const rootReducer = combineReducers(reducers);

const routes = {
  '/': {
    title: 'itslit',
  },
};

const {
  reducer,
  middleware,
  enhancer,
} = routerForBrowser({
  // The configured routes. Required.
  routes,
});

const rootEpic = combineEpics(
  instagramAuthEpic,
);

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
  combineReducers({ root: rootReducer, router: reducer }),
  composeWithDevTools(
		enhancer,
		applyMiddleware(middleware, epicMiddleware),
		// other store enhancers if any
	),
);

const initialLocation = store.getState().router;
if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation));
}

ReactDOM.render(
    <Provider store={store}>
      <App appName="Instagram Likes" />
    </Provider>,
    document.getElementById('app'),
);
