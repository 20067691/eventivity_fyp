// import { useAuth } from 'react-oidc-context';

// export default function Login() {
//   const auth = useAuth();

//   const signOutRedirect = () => {
//     const clientId = "2617dljqu24q3r5vttdfnmpce9"; 
//     const logoutUri = "http://localhost:5173"; 
//     const cognitoDomain = "https://eu-west-1nzqc27yt8.auth.eu-west-1.amazoncognito.com";

//     // clear local user info first
//     auth.removeUser();

//     // Redirect to Cognito logout endpoint
//     window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
//   };

//   if (auth.isLoading) return <p>Loading...</p>;
//   if (auth.error) return <p>Auth error: {auth.error.message}</p>;

//   if (auth.isAuthenticated) {
//     return (
//       <div>
//         <p>Welcome, {auth.user?.profile?.email}</p>
//         <button onClick={signOutRedirect}>Sign out</button>
//       </div>
//     );
//   }

//   return <button onClick={() => auth.signinRedirect()}>Sign in</button>;
// }

// This component handles user authentication using the react-oidc-context library.
// It checks if the user is authenticated, loading, or if there's an error. 
// If the user is authenticated, it displays a welcome message and a sign-out button.
// If the user is not authenticated, it displays a sign-in button.
// The sign-out button redirects the user to the Cognito logout endpoint, clearing local user info first.
// The component uses the useAuth hook to access authentication state and methods.