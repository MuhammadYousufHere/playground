import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './pages/Footer';
import Header from './pages/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      {/* <App /> */}
      <>
        <Header />
        <Footer />
      </>
    </ErrorBoundary>
  </React.StrictMode>
);
