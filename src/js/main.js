import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/app';

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(
    <App/>,
    root
  );
}
