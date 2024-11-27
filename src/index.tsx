import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { reduxStore } from './redux/redux';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    <Provider store={reduxStore}>
      <App />
    </Provider>
  </React.StrictMode>
);

