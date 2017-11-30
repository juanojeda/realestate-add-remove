import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './store';

import App from './containers/app';

const StoreInstance = Store();

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(
    <Provider store={StoreInstance}>
      <App/>
    </Provider>,
    root
  );
}
