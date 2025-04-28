import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/CognitoService';
import SuccessBanner from '../components/SuccessBanner';
import BeamBorder from '../components/BeamBorder';
import { Link } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[^A-Za-z0-9]/.test(password),
    };
  };

  const passwordValidation = validatePassword(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(username.trim(), password.trim(), { email: email.trim() });
      setSignupSuccess(true);
      setTimeout(() => {
        navigate('/confirm');
      }, 2000);
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed: ' + error.message);
    }
  };

  return (
    //<h1 className="text-4xl font-bold text-[#9c40ff] mb-6">Sign Up</h1>
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7F4F4]">


      <div className="relative w-full max-w-sm bg-white p-6 rounded shadow-md overflow-hidden">
        <BeamBorder size={100} />
        <BeamBorder
          delay={3}
          size={200}
        />

{!signupSuccess ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-[#9c40ff]">Create Account</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#9c40ff]"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#9c40ff]"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#9c40ff]"
            required
          />

          {/* Password Requirements */}
          <div className="text-sm mt-2 space-y-1">
            <p className={passwordValidation.length ? "text-green-600" : "text-gray-500"}>
              {passwordValidation.length ? "✓" : "•"} At least 8 characters
            </p>
            <p className={passwordValidation.uppercase ? "text-green-600" : "text-gray-500"}>
              {passwordValidation.uppercase ? "✓" : "•"} At least one uppercase letter
            </p>
            <p className={passwordValidation.number ? "text-green-600" : "text-gray-500"}>
              {passwordValidation.number ? "✓" : "•"} At least one number
            </p>
            <p className={passwordValidation.specialChar ? "text-green-600" : "text-gray-500"}>
              {passwordValidation.specialChar ? "✓" : "•"} At least one special character
            </p>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-[#9c40ff] text-white py-2 rounded hover:bg-[#F7F4F4] hover:text-[#9c40ff] transition-colors"
          >
            Sign Up
          </button>
          {/* Link back to Sign In */}
          <div className="text-center mt-4">
            <Link to="/signin" className="text-[#9c40ff] hover:underline">
              Already have an account? Sign In
            </Link>
          </div>
        </form>
      ) : (
        <SuccessBanner
          title="Account created successfully!"
          message="Redirecting to confirmation page..."
        />
      )}
    </div>
    </div>

  );
}

export default SignUp;
