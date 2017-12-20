import 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import {
  RouterState, routerForBrowser, initializeCurrentLocation,
} from 'redux-little-router';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { App } from './components/App';
import * as reducers from './ducks';
import {
  instagramLikeStatsEpic, instagramAuthEpic,
} from './ducks/instagramAuth/operations';
import { InstagramAuthState } from './ducks/instagramAuth/reducers';
import {
  Actions as InstagramAuthActions,
} from './ducks/instagramAuth/actions';

const routes = {
  '/': {
    title: 'Instagram Likes',
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
  instagramLikeStatsEpic,
  instagramAuthEpic,
);

const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: {
    getJSON: ajax.getJSON,
  },
});

interface MainState {
  instagramAuth: InstagramAuthState;
}

export interface RootState {
  main: MainState;
  router: RouterState;
}

export type RootAction =
  | InstagramAuthActions;

export type Dispatch = (action: RootAction) => void;

/* { ...reducers } because: https://github.com/Microsoft/TypeScript/issues/17622 */
const mainReducer = combineReducers<MainState>({ ...reducers });

const rootReducer = combineReducers<RootState>({
  main: mainReducer,
  router: reducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
		enhancer,
		applyMiddleware(middleware, epicMiddleware),
		// other store enhancers if any
	),
);

const initialLocation = store.getState().router;
// tslint:disable-next-line:strict-boolean-expressions
if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation));
}

ReactDOM.render(
    <Provider store={store}>
      <App appName="Instagram Likes" />
    </Provider>,
    document.getElementById('app'),
);
