import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

//web socket stuff
import {ApplicationCableProvider } from 'react-actioncable-provider'

ReactDOM.render(
  <ApplicationCableProvider >
      <App />,
  </ApplicationCableProvider>,
  document.getElementById('root'));
registerServiceWorker();
