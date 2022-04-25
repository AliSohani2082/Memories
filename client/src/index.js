import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Auth0Provider } from '@auth0/auth0-react'
import { reducers } from './reducers';
import App from './App';
import './index.css'

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>,
  document.getElementById('root'),
);