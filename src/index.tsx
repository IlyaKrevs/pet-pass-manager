import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { reduxStore } from './redux/redux';
import { Provider } from 'react-redux';
import { FluentProvider, webDarkTheme } from '@fluentui/react-components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    <FluentProvider theme={webDarkTheme}>
      <Provider store={reduxStore}>
        <App />
      </Provider>
    </FluentProvider>

  </React.StrictMode>
);



