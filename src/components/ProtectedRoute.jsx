import { useAuth } from '../context/AuthContext';
import { Navigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children;
}

// // This component serves as a private route wrapper for protecting routes that require authentication.
// It checks if the user is authenticated and redirects to the login page if not.
