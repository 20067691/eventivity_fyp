import { useAuth } from 'react-oidc-context';

export default function Login() {
  const auth = useAuth();

  if (auth.isLoading) return <p>Loading...</p>;
  if (auth.error) return <p>Auth error: {auth.error.message}</p>;

  if (auth.isAuthenticated) {
    return (
      <div>
        <p>Welcome, {auth.user?.profile?.email}</p>
        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return <button onClick={() => auth.signinRedirect()}>Sign in</button>;
}
// This component handles user authentication using the react-oidc-context library.
// It checks if the user is authenticated, loading, or if there's an error.