import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const auth = useAuth();

  if (auth.isLoading) {
    return <p>Loading authentication...</p>;
  }

  if (!auth.isAuthenticated) {
    // Redirect to Cognito login
    auth.signinRedirect();
    return null;
  }

  return children;
}
// // This component serves as a private route wrapper for protecting routes that require authentication.
// It checks if the user is authenticated and redirects to the login page if not.