import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { App } from './components/App';
import rootReducer from './reducers';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
      <App appName="Instagram Likes" />
    </Provider>,
    document.getElementById('app'),
);
