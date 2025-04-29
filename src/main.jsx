import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { exchangeCodeForToken } from './services/AuthService'; 
import { EventProvider } from './context/EventContext.jsx';
import { CalendarProvider } from './context/CalendarContext.jsx';

function SessionManager() {
  const { login, logout } = useAuth();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Handle logout flow
    if (params.get('logout') === 'true') {
      logout();
    }

    // Handle login code exchange flow
    const code = params.get('code');
    if (code) {
      (async () => {
        try {
          const tokenResponse = await exchangeCodeForToken(code);
          const idToken = tokenResponse.id_token;
          const payload = parseJwt(idToken);
          login(payload['cognito:username']); // Save username to Context
        } catch (error) {
          console.error('Token exchange error:', error);
          logout();
        }
      })();
    }
  }, [login, logout]);

  return null;
}

// Helper function to decode a JWT
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Invalid JWT', error);
    return {};
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <EventProvider>
        <CalendarProvider>
       <SessionManager />
       <App />
        </CalendarProvider>
      </EventProvider>
    </AuthProvider>
  </React.StrictMode>
);
