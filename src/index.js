import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

//web socket stuff, NEED TO NPM INSTALL REACT ACTIONCABLE PROVIDER
import {ApplicationCableProvider } from 'react-actioncable-provider'

ReactDOM.render(
  //NEED TO NPM INSTALL FIRST
  // <ApplicationCableProvider >
      <App />,
  // </ApplicationCableProvider>,
  document.getElementById('root'));
registerServiceWorker();
