import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import store from './store/store'

import App from './App';

import { Provider } from 'react-redux'


import './index.scss';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);
