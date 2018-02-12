import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

//web socket stuff
import { ActionCableProvider } from 'react-actioncable-provider'
import { API_WS_ROOT } from './constants';


ReactDOM.render(
  <ActionCableProvider url= {API_WS_ROOT}>
      <App />
  </ActionCableProvider>,
  document.getElementById('root'));
registerServiceWorker();
