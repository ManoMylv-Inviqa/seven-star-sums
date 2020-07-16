import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { StatusProvider } from './context/StatusContext';
import App from './components/App/App';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <StatusProvider>
    <App />
  </StatusProvider>,
  document.getElementById('root')
);
// registerServiceWorker();
