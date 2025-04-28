import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userPool } from '../services/CognitoService';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import BeamBorder from '../components/BeamBorder';

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

        login(userData);
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
      <h1 className="text-4xl font-bold text-[#9c40ff] mb-6">Sign In</h1>

      <div className="relative w-full max-w-sm bg-white p-6 rounded shadow-md overflow-hidden">
        <BeamBorder
          size={100}

        />
        <BeamBorder

          delay={3}
          size={200}
        />
        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#9c40ff]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#9c40ff]"
            required
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#9c40ff] text-white py-2 rounded hover:bg-[#F7F4F4] hover:text-[#9c40ff] transition-colors"
            >
              Sign In
            </button>

            <button

              type="button"
              onClick={() => navigate('/signup')}
              className="flex-1 bg-[#9c40ff] text-white py-2 rounded hover:bg-[#F7F4F4] hover:text-[#9c40ff] transition-colors">
              Sign Up
            </button>

          </div>

          <Link to="/confirm" className="text-[#9c40ff] hover: underline text-center block">
            Confirm your account
          </Link>

          <Link to="/forgot-password" className="text-[#9c40ff] hover: underline text-center block">
          Forgot your password?
          </Link>

        </form>
      </div>
    </div>
  );
}

export default SignIn;
