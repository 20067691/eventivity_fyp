import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userPool } from '../config/cognitoConfig'; // We'll create this
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import {jwtDecode} from 'jwt-decode';

function SignIn() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState('');

    const from = location.state?.from?.pathname || '/';
  
    const handleSignIn = (e) => {
        e.preventDefault();
        setError('');
      
        const authenticationDetails = new AuthenticationDetails({
          Username: usernameInput.trim(),
          Password: passwordInput.trim(),
        });
      
        const cognitoUser = new CognitoUser({
          Username: usernameInput.trim(),
          Pool: userPool,
        });
      
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
            console.log('Login successful:', result);
      
            const idToken = result.getIdToken().getJwtToken();
            const decodedToken = jwtDecode(idToken);
      
            const userData = {
              username: decodedToken['cognito:username'],
              email: decodedToken.email || '',
            };
      
            localStorage.setItem('idToken', idToken);
            localStorage.setItem('accessToken', result.getAccessToken().getJwtToken());
      
            login(userData); // ✅ Save full user object
            navigate(from, { replace: true }); // Redirect back to intended page
          },
          onFailure: (err) => {
            console.error('Login error:', err);
            setError(err.message || 'Login failed');
          },
        });
      };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7F4F4]">
      <h1 className="text-4xl font-bold text-[#552834] mb-6">Sign In</h1>

      <form onSubmit={handleSignIn} className="w-full max-w-sm bg-white p-6 rounded shadow-md space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#552834]"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#552834]"
          required
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-[#552834] text-white py-2 rounded hover:bg-[#6a3b48] transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
