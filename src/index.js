import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import Playground from './playground';
import { IntlProvider } from 'react-intl';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ErrorBoundary>
    <Playground />
  </ErrorBoundary>
  // {/* </React.StrictMode> */}
);
