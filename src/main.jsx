import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'
// import { AuthProvider } from 'react-oidc-context';
// import {cognitoAuthConfig} from './auth/cognitoConfig.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
// // This code is the entry point for a React application.
// It uses React's StrictMode for highlighting potential problems in an application.
// The createRoot function from 'react-dom/client' is used to render the App component into the DOM.
// The App component is imported from './App.jsx'.
// The index.css file is imported for global styles.
// The createRoot function is called with the root element (with id 'root') to render the application.
// The StrictMode component is used to wrap the App component, which helps in identifying potential problems in the application.
// This is a standard setup for a React application, ensuring that the app is rendered correctly and efficiently.
// The use of StrictMode is optional but recommended for development to help catch potential issues early.
