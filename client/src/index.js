import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';
import authStore from './stores/authStore';

const Root = (
  <Provider authStore={authStore}>
    <App />
  </Provider>
);
ReactDOM.render(Root, document.getElementById('root'));
registerServiceWorker();
